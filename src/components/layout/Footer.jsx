import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t-0 border-b-0 border-x-0 border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400 max-w-md">
            <strong className="text-white">Disclaimer:</strong> This system provides AI-based predictions. Refer to official meteorological departments for confirmed alerts.
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-accent-blue transition-colors focus-ring rounded-full p-1">
            <span className="sr-only">Twitter</span>
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors focus-ring rounded-full p-1">
            <span className="sr-only">GitHub</span>
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-accent-teal transition-colors focus-ring rounded-full p-1">
            <span className="sr-only">Email</span>
            <Mail className="w-5 h-5" />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
