import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ label, enabled, onChange, description }) => {
  return (
    <div className="flex items-center justify-between p-4 glass rounded-lg mb-3">
      <div className="flex flex-col pr-4">
        <span className="text-white font-medium">{label}</span>
        {description && <span className="text-xs text-gray-400 mt-1">{description}</span>}
      </div>
      <button
        type="button"
        className={clsx(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring',
          enabled ? 'bg-accent-teal' : 'bg-gray-600'
        )}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
      >
        <span className="sr-only">Use setting</span>
        <motion.span
          layout
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
