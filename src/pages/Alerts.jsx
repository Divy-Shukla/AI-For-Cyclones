import React, { useState } from 'react';
import { Bell, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import { motion } from 'framer-motion';

const Alerts = () => {
  const [preferences, setPreferences] = useState({
    highWind: true,
    landfall: true,
    heavyRain: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const alertHistory = [
    { date: 'Oct 24, 08:00 AM', msg: 'Severe wind warning issued for coastal areas.', type: 'critical' },
    { date: 'Oct 23, 14:30 PM', msg: 'System upgraded from depression to cyclonic storm.', type: 'warning' },
    { date: 'Oct 22, 09:15 AM', msg: 'New low-pressure area detected in bay.', type: 'info' }
  ];

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full flex-grow flex flex-col mb-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center space-x-3">
          <Bell className="text-accent-blue w-8 h-8" />
          <span>Early Warning <span className="text-gradient">Alert System</span></span>
        </h1>
        <p className="text-gray-400 mt-2">Configure personalized geo-spatial SMS and Email notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Form */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center"><ShieldCheck className="mr-2 text-accent-teal w-5 h-5"/> Alert Configuration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" required className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-bg-navy/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors sm:text-sm" placeholder="Email Address" />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input type="tel" className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-bg-navy/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors sm:text-sm" placeholder="Phone Number (SMS)" />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-[#0a101e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-colors sm:text-sm appearance-none">
                  <option value="">Select Region...</option>
                  <option value="odisha">Odisha Coast</option>
                  <option value="andhra">Andhra Pradesh</option>
                  <option value="west_bengal">West Bengal</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="maharashtra">Maharashtra</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Notification Triggers</h3>
              <ToggleSwitch 
                label="High Wind Warnings" 
                description="Alerts when projected wind speeds exceed 90km/h."
                enabled={preferences.highWind} onChange={(val) => setPreferences(prev => ({...prev, highWind: val}))} 
              />
              <ToggleSwitch 
                label="Landfall Predictions" 
                description="Crucial timeline updates on projected coastal impacts."
                enabled={preferences.landfall} onChange={(val) => setPreferences(prev => ({...prev, landfall: val}))} 
              />
              <ToggleSwitch 
                label="Heavy Rainfall" 
                description="Flood and precipitation warnings."
                enabled={preferences.heavyRain} onChange={(val) => setPreferences(prev => ({...prev, heavyRain: val}))} 
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-bg-navy bg-accent-blue hover:bg-accent-teal focus-ring transition-colors"
            >
              {isSubmitted ? (
                <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center">
                  Saved Configurations <ShieldCheck className="ml-2 w-4 h-4"/>
                </motion.span>
              ) : "Save Alert Preferences"}
            </button>
          </form>
        </div>

        {/* Alert History Panel */}
        <div className="glass-card p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Recent Broadcasts</h2>
          <div className="space-y-4">
            {alertHistory.map((alert, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${alert.type === 'critical' ? 'bg-accent-red animate-pulse' : alert.type === 'warning' ? 'bg-yellow-400' : 'bg-accent-blue'}`} />
                <div>
                  <p className="text-xs text-gray-400 mb-1">{alert.date}</p>
                  <p className="text-sm text-gray-200">{alert.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 border border-white/20 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors">
            View Full Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
