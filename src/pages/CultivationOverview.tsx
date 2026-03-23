import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Leaf, 
  Home, 
  Calendar, 
  Droplets, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Activity
} from 'lucide-react';
import { MOCK_KPIS, MOCK_ALERTS, MOCK_CHART_DATA } from '../constants/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { SimulatedPlant } from '../types';

interface CultivationOverviewProps {
  plants: SimulatedPlant[];
}

const CultivationOverview: React.FC<CultivationOverviewProps> = ({ plants }) => {
  const avgTemp = plants.reduce((acc, p) => acc + p.metrics.temperature, 0) / plants.length;
  const avgHumidity = plants.reduce((acc, p) => acc + p.metrics.humidity, 0) / plants.length;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Leaf': return Leaf;
      case 'Home': return Home;
      case 'Calendar': return Calendar;
      case 'Droplets': return Droplets;
      default: return Leaf;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Cultivation Overview</h2>
          <p className="text-neutral-500">Real-time operational health and facility metrics.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-green-50 rounded-lg relative">
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase">Live Temp</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={avgTemp.toFixed(1)}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-bold text-neutral-900"
                >
                  {avgTemp.toFixed(1)}°F
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-blue-50 rounded-lg relative">
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase">Live Humidity</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={avgHumidity.toFixed(1)}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-bold text-neutral-900"
                >
                  {avgHumidity.toFixed(1)}%
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_KPIS.map((kpi, idx) => {
          const Icon = getIcon(kpi.icon);
          // Inject live data into relevant KPIs
          let displayValue = kpi.value;
          if (kpi.label === 'Avg. Humidity') displayValue = `${avgHumidity.toFixed(1)}%`;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={kpi.label}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-neutral-50 rounded-lg">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                {getTrendIcon(kpi.trend || 'neutral')}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">{kpi.label}</p>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={displayValue}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-bold text-neutral-900"
                    >
                      {displayValue}
                    </motion.h3>
                  </AnimatePresence>
                  {kpi.change && (
                    <span className={`text-xs font-semibold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-neutral-900">Operational Health</h3>
              <p className="text-sm text-neutral-500">Canopy Temp vs. Root Moisture (24h)</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Temp (°F)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Moisture (%)</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMoist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#737373' }}
                  interval={4}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorMoist)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Feed */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-neutral-900">Attention Required</h3>
            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {MOCK_ALERTS.length} Active
            </span>
          </div>
          <div className="space-y-4 flex-1">
            {MOCK_ALERTS.map((alert) => (
              <div key={alert.id} className="flex gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className={`p-2 rounded-lg h-fit ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                  alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-neutral-900">{alert.room}</h4>
                    <span className="text-[10px] text-neutral-400 font-medium">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-semibold text-neutral-600 hover:text-neutral-900 border-t border-neutral-100 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CultivationOverview;
