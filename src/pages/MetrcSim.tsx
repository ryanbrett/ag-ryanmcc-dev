import React from 'react';
import { 
  FileCheck, 
  ExternalLink, 
  Search,
  Filter,
  Download,
  ShieldCheck
} from 'lucide-react';
import { TransferManifest } from '../types';

interface MetrcSimProps {
  manifests: TransferManifest[];
}

const MetrcSim: React.FC<MetrcSimProps> = ({ manifests }) => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold text-neutral-900">Metrc Compliance</h2>
          </div>
          <p className="text-neutral-500">Track-and-Trace synchronization and transfer manifests.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Sync Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-lg font-bold text-neutral-900">Connected to Metrc API</p>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Last sync: 2 minutes ago</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Pending Transfers</p>
          <p className="text-2xl font-bold text-neutral-900">{manifests.filter(m => m.status === 'Pending').length} Active</p>
          <p className="text-xs text-neutral-500 mt-2">Requires signature</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Compliance Score</p>
          <p className="text-2xl font-bold text-green-600">100%</p>
          <p className="text-xs text-neutral-500 mt-2">No active violations</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
          <h3 className="font-bold text-neutral-900">Recent Transfer Manifests</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search Manifest ID..." 
                className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
            <button className="p-2 border border-neutral-200 rounded-lg hover:bg-white transition-colors">
              <Filter className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Manifest ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Destination</th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Strain</th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {manifests.map((manifest) => (
                <tr key={manifest.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-mono font-medium text-neutral-700">{manifest.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-neutral-900">{manifest.destination}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-600">{manifest.strainName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      manifest.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      manifest.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {manifest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-500">{manifest.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-neutral-400 hover:text-green-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-neutral-50/50 border-t border-neutral-100 flex justify-center">
          <button className="text-xs font-bold text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-widest">
            Load More Manifests
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetrcSim;
