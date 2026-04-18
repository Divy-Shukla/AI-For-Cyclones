import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import clsx from 'clsx';

const mockRegions = [
  { name: "North Odisha Coast", risk: "High", score: 92 },
  { name: "South Odisha Coast", risk: "Medium", score: 65 },
  { name: "North Andhra Coast", risk: "High", score: 88 },
  { name: "South Andhra Coast", risk: "Low", score: 25 },
  { name: "West Bengal Coast", risk: "Medium", score: 55 },
  { name: "Gujarat Coast", risk: "Low", score: 12 },
  { name: "Maharashtra Coast", risk: "Low", score: 8 },
  { name: "Tamil Nadu Coast", risk: "Medium", score: 45 },
  { name: "Kerala Coast", risk: "Low", score: 18 }
];

const getRiskColor = (risk) => {
  switch(risk) {
    case 'High': return 'bg-accent-red/20 border-accent-red/50 text-accent-red';
    case 'Medium': return 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400';
    case 'Low': return 'bg-green-400/20 border-green-400/50 text-green-400';
    default: return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
  }
};

const getRiskBarColor = (risk) => {
  switch(risk) {
    case 'High': return 'bg-accent-red';
    case 'Medium': return 'bg-yellow-400';
    case 'Low': return 'bg-green-400';
    default: return 'bg-gray-500';
  }
};

const RiskAnalysis = () => {
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full flex-grow flex flex-col mb-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center space-x-3">
          <AlertTriangle className="text-accent-red w-8 h-8" />
          <span>Regional <span className="text-gradient">Risk Analysis</span></span>
        </h1>
        <p className="text-gray-400 mt-2">Comprehensive vulnerability assessment based on real-time neural models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Explanation Side Model */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center"><Info className="mr-2 text-accent-blue w-5 h-5"/> Risk Scoring Model</h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Our AI evaluates region vulnerability using a composite scoring algorithm (0-100). The score determines the region's overall threat level and is dynamically updated.
            </p>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <h3 className="font-semibold text-accent-blue text-sm mb-1">1. Wind Speed Index</h3>
                <p className="text-xs text-gray-400">Heavily weighted. Sustained winds over 120km/h drastically increase risk multipliers.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <h3 className="font-semibold text-accent-teal text-sm mb-1">2. Central Pressure</h3>
                <p className="text-xs text-gray-400">Inverse relationship. Sudden pressure drops (millibars) indicate rapid cyclogenesis.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <h3 className="font-semibold text-yellow-400 text-sm mb-1">3. Coastal Proximity</h3>
                <p className="text-xs text-gray-400">Tracks trajectory relative to populated shores, including angle of approach and speed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 h-full">
            <h2 className="text-xl font-bold mb-6">Regional Heatmap</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockRegions.sort((a,b) => b.score - a.score).map((region, idx) => (
                <div key={idx} className={clsx(
                  'p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]',
                  getRiskColor(region.risk)
                )}>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-white tracking-wide">{region.name}</h3>
                    <span className="text-xs font-bold px-2 py-1 bg-black/40 rounded uppercase">
                      {region.risk}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-1 text-gray-300">
                    <span>Risk Score</span>
                    <span className="font-mono text-white">{region.score}/100</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={clsx('h-1.5 rounded-full', getRiskBarColor(region.risk))} 
                      style={{ width: `${region.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiskAnalysis;
