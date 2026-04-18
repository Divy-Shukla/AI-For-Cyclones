import React from 'react';
import { Wind, Navigation } from 'lucide-react';
import clsx from 'clsx';

const CycloneCard = ({ name, intensity, status, speed, pressure, coords, active }) => {
  const intensityColors = {
    Low: 'text-green-400 border-green-400/30',
    Moderate: 'text-yellow-400 border-yellow-400/30',
    Severe: 'text-accent-red border-accent-red/30'
  };

  const statusBg = {
    Active: 'bg-accent-red/20 text-accent-red',
    Weakening: 'bg-yellow-400/20 text-yellow-400',
    Landfall: 'bg-orange-500/20 text-orange-500'
  };

  return (
    <div className={clsx(
      'glass-card p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer',
      active && 'ring-1 ring-accent-blue bg-white/10'
    )}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-white">{name}</h3>
          <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', statusBg[status] || 'bg-gray-500/20 text-gray-300')}>
            {status}
          </span>
        </div>
        <div className={clsx('px-2 py-1 border rounded shadow-sm text-sm font-semibold', intensityColors[intensity])}>
          {intensity}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mt-4">
        <div className="flex items-center space-x-1.5">
          <Wind className="w-4 h-4 text-accent-teal" />
          <span>{speed} km/h</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-accent-blue text-[10px]">hPa</span>
          <span>{pressure}</span>
        </div>
        <div className="flex items-center space-x-1.5 col-span-2 mt-1 bg-white/5 p-1 rounded">
          <Navigation className="w-4 h-4 text-gray-400" />
          <span className="font-mono text-xs">{coords[0]}° N, {coords[1]}° E</span>
        </div>
      </div>
    </div>
  );
};

export default CycloneCard;
