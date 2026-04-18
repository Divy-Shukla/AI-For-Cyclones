import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertBanner = ({ message, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-accent-red text-white px-4 py-3 flex items-center justify-between shadow-lg z-50 absolute top-0 left-0 w-full"
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 animate-pulse" />
        <span className="font-semibold text-sm md:text-base tracking-wide">{message}</span>
      </div>
      <button 
        onClick={onClose} 
        className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
        aria-label="Close alert"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default AlertBanner;
