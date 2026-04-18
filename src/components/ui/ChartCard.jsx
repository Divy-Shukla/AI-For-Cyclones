import React from 'react';

const ChartCard = ({ title, children, subtitle }) => {
  return (
    <div className="glass-card p-6 border-t-2 border-t-accent-teal/50">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className="w-full h-72">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
