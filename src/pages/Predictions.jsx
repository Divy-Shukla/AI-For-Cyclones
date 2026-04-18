import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Clock } from 'lucide-react';
import ChartCard from '../components/ui/ChartCard';

const generateMockData = (hours) => {
  const data = [];
  let currentWind = 120;
  let currentPressure = 980;
  
  for (let i = 0; i <= hours; i += 6) {
    // Introduce trend based on time: strengthening then weakening
    if (i < 36) {
      currentWind += Math.random() * 15;
      currentPressure -= Math.random() * 8;
    } else {
      currentWind -= Math.random() * 20;
      currentPressure += Math.random() * 10;
    }
    
    data.push({
      time: `+${i}h`,
      windSpeed: Math.round(currentWind),
      pressure: Math.round(currentPressure),
      gusts: Math.round(currentWind * 1.3)
    });
  }
  return data;
};

const Predictions = () => {
  const [predictionWindow, setPredictionWindow] = useState(48); // default 48h
  const data = useMemo(() => generateMockData(predictionWindow), [predictionWindow]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a101e]/90 text-white p-3 border border-white/20 shadow-xl rounded-md backdrop-blur-md">
          <p className="font-bold border-b border-white/10 pb-1 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm font-medium drop-shadow-md">
              {entry.name}: {entry.value} {entry.name === 'Pressure' ? 'hPa' : 'km/h'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full flex-grow flex flex-col mb-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center space-x-3">
            <Activity className="text-accent-blue w-8 h-8" />
            <span>AI Trend <span className="text-gradient">Predictions</span></span>
          </h1>
          <p className="text-gray-400 mt-2">Deep learning forecast models for wind speed and central pressure.</p>
        </div>
        
        {/* Time Slider */}
        <div className="glass px-6 py-3 rounded-xl w-full md:w-auto flex flex-col space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="flex items-center space-x-1 text-gray-300"><Clock className="w-4 h-4"/> <span>Forecast Window</span></span>
            <span className="text-accent-teal">{predictionWindow} Hours</span>
          </div>
          <input 
            type="range" 
            min="24" 
            max="72" 
            step="12"
            value={predictionWindow} 
            onChange={(e) => setPredictionWindow(Number(e.target.value))}
            className="w-full md:w-64 accent-accent-teal cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 font-mono">
            <span>24h</span>
            <span>48h</span>
            <span>72h</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wind Speed Trend */}
        <ChartCard title="Wind Speed & Gusts Intensity" subtitle="Projected maximum sustained winds">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="windSpeed" name="Sustained Wind" stroke="#00f2fe" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8}} />
              <Line type="monotone" dataKey="gusts" name="Max Gusts" stroke="#ff3b3b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pressure Trend */}
        <ChartCard title="Central Pressure Drop" subtitle="Inversely correlated with storm severity (Lower = Stronger)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="rgba(255,255,255,0.5)" tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="pressure" name="Pressure" stroke="#00d2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorPressure)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Predictions;
