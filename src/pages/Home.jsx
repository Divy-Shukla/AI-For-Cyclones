import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden pt-20">
      
      {/* Background Visualizations */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] border border-accent-blue/20 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] border border-accent-teal/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[400px] h-[400px] border border-accent-red/20 rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center space-x-2 glass px-4 py-1.5 rounded-full border-accent-blue/30"
        >
          <Activity className="w-4 h-4 text-accent-blue animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-gray-300">System Active - Monitoring 3 Threats</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI Cyclone Early <br/>
          <span className="text-gradient">Warning System</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Real-time tracking, AI-powered prediction, and instant alerts for severe cyclonic storms.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to="/map" 
            className="flex items-center justify-center space-x-2 bg-white text-bg-navy px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-ring"
          >
            <Globe className="w-5 h-5" />
            <span>View Live Map</span>
          </Link>
          <Link 
            to="/alerts" 
            className="flex items-center justify-center space-x-2 glass px-8 py-4 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-colors focus-ring"
          >
            <span>Get Alerts</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Home;
