/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CultivationOverview from './pages/CultivationOverview';
import PlantMap from './pages/PlantMap';
import MetrcSim from './pages/MetrcSim';
import { Bell, Search, User, RefreshCw, Power } from 'lucide-react';
import { useAgDataSimulation } from './hooks/useAgDataSimulation';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const { plants, manifests, lastUpdate, isLive, toggleLive, triggerSnapshot } = useAgDataSimulation();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <CultivationOverview plants={plants} />;
      case 'map': return <PlantMap plants={plants} />;
      case 'compliance': return <MetrcSim manifests={manifests} />;
      default: return <CultivationOverview plants={plants} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1 max-w-3xl">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-full border border-neutral-100">
                <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-neutral-300'}`}></div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">Sync:</span>
                <span className="text-[10px] font-mono text-neutral-600 font-bold">{lastUpdate}</span>
              </div>

              <div className="flex items-center gap-2 bg-neutral-50 p-1 rounded-xl border border-neutral-200">
                <button 
                  onClick={toggleLive}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    isLive ? 'bg-green-600 text-white shadow-sm' : 'text-neutral-500 hover:bg-neutral-100'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  {isLive ? 'Live' : 'Paused'}
                </button>
                <button 
                  onClick={triggerSnapshot}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase text-neutral-600 hover:bg-neutral-100 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  Snapshot
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-neutral-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-neutral-900">Ryan B. McC</p>
                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Head Cultivator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 overflow-hidden">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

