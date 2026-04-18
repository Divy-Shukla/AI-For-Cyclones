import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Live Map', path: '/map' },
    { name: 'Predictions', path: '/predictions' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'Risk Analysis', path: '/risk' },
  ];

  return (
    <nav className={clsx(
      'fixed w-full z-40 transition-all duration-300 top-0', 
      scrolled ? 'glass py-3 mt-0' : 'bg-transparent py-5 mt-10' // Offset mt-10 so it's below the alert banner initially
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group focus-ring rounded-lg">
            <div className="p-2 bg-accent-blue/10 rounded-full group-hover:bg-accent-blue/20 transition-colors">
              <Wind className="w-6 h-6 text-accent-blue" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Cyclone<span className="text-accent-teal">AI</span></span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => clsx(
                  'text-sm font-medium transition-colors hover:text-accent-blue focus-ring rounded-md px-2 py-1',
                  isActive ? 'text-accent-blue' : 'text-gray-300'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus-ring rounded-md p-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => clsx(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isActive ? 'bg-accent-blue/20 text-accent-blue' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
