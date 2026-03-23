import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Thermometer, 
  Droplets, 
  Zap, 
  Activity,
  Info,
  Tag
} from 'lucide-react';
import { generatePlantGrid } from '../constants/mockData';
import { PlantData, SimulatedPlant } from '../types';

interface PlantMapProps {
  plants: SimulatedPlant[];
}

const PlantMap: React.FC<PlantMapProps> = ({ plants }) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const gridData = useMemo(() => generatePlantGrid(10, 20), []);

  const selectedPlant = useMemo(() => {
    if (!selectedPlantId) return null;
    // Check if it's one of our simulated "live" plants first
    const livePlant = plants.find(p => p.id === selectedPlantId);
    if (livePlant) {
      return {
        id: livePlant.id,
        strain: livePlant.strain,
        rfid: livePlant.tag,
        health: 'optimal' as const,
        temp: livePlant.metrics.temperature,
        ec: livePlant.metrics.ec,
        ph: livePlant.metrics.ph,
        moisture: livePlant.metrics.soilMoisture,
        humidity: livePlant.metrics.humidity
      };
    }
    return gridData.find(p => p.id === selectedPlantId) || null;
  }, [selectedPlantId, plants, gridData]);

  return (
    <div className="space-y-8 relative">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Digital Twin Map</h2>
          <p className="text-neutral-500">Grid-based visualization of Greenhouse A (Sector 1).</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-600"></div>
            <span>Optimal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-300"></div>
            <span>Attention</span>
          </div>
        </div>
      </header>

      {/* Grid Container */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-20 gap-2 min-w-[800px]">
          {gridData.map((plant) => (
            <button
              key={plant.id}
              onClick={() => setSelectedPlantId(plant.id)}
              className={`aspect-square rounded-sm transition-all duration-200 hover:scale-110 hover:z-10 shadow-sm ${
                plant.health === 'optimal' 
                  ? 'bg-green-600 hover:bg-green-500' 
                  : 'bg-green-300 hover:bg-green-200'
              }`}
              title={`${plant.strain} - ${plant.health}`}
            />
          ))}
        </div>
      </div>

      {/* Plant Details Modal/Panel */}
      <AnimatePresence>
        {selectedPlant && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlantId(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8 border-l border-neutral-200"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedPlant.health === 'optimal' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {selectedPlant.health}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">#{selectedPlant.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">{selectedPlant.strain}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPlantId(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex items-center gap-2 text-neutral-500 mb-3">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Metrc RFID Tag</span>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 font-mono text-sm text-neutral-700 break-all">
                    {selectedPlant.rfid}
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Temp</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={selectedPlant.temp}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-neutral-900"
                      >
                        {selectedPlant.temp.toFixed(1)}°F
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Moisture</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={selectedPlant.moisture}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-neutral-900"
                      >
                        {selectedPlant.moisture.toFixed(0)}%
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">EC</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={selectedPlant.ec}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-neutral-900"
                      >
                        {selectedPlant.ec.toFixed(2)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Activity className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">pH</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={selectedPlant.ph}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-neutral-900"
                      >
                        {selectedPlant.ph.toFixed(1)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </section>

                <section className="pt-6 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-neutral-500 mb-4">
                    <Info className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Cultivation Notes</span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Plant is currently in the late vegetative stage. Nutrient uptake is optimal. 
                    Scheduled for flower room transfer in 4 days.
                  </p>
                </section>

                <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                  Update Plant Status
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlantMap;
