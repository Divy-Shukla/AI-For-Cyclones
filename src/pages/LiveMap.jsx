import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import { Navigation } from 'lucide-react';
import CycloneCard from '../components/ui/CycloneCard';

// Setup custom div icons for map markers
const createCustomIcon = (color) => {
  const iconHtml = `<div class="w-6 h-6 rounded-full border-2 border-white shadow-[0_0_15px_${color}] flex items-center justify-center animate-pulse" style="background-color: ${color};"><div class="w-2 h-2 bg-white rounded-full"></div></div>`;
  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const mapIcons = {
  Low: createCustomIcon('#4ade80'),      // green-400
  Moderate: createCustomIcon('#facc15'), // yellow-400
  Severe: createCustomIcon('#ff3b3b')    // accent-red
};

const mockCyclones = [
  { id: 1, name: 'Mocha', intensity: 'Severe', status: 'Active', speed: 185, pressure: 955, coords: [15.1, 89.2] },
  { id: 2, name: 'Biparjoy', intensity: 'Moderate', status: 'Weakening', speed: 110, pressure: 980, coords: [21.5, 68.3] },
  { id: 3, name: 'Tej', intensity: 'Low', status: 'Active', speed: 85, pressure: 998, coords: [9.8, 62.1] }
];

const LiveMap = () => {
  const [activeCyclone, setActiveCyclone] = useState(mockCyclones[0]);

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto w-full flex-grow flex flex-col mb-8 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold flex items-center space-x-3">
          <Navigation className="text-accent-teal w-8 h-8" />
          <span>Live Cyclone <span className="text-gradient">Tracking Map</span></span>
        </h1>
        <p className="text-gray-400 mt-2">Real-time telemetry and positional tracking for regional systems.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[70vh] min-h-[600px]">
        {/* Map Container */}
        <div className="flex-grow glass-card border border-accent-blue/20 overflow-hidden relative z-0">
          <MapContainer 
            center={[15.0, 80.0]} 
            zoom={5} 
            maxZoom={12}
            className="w-full h-full bg-bg-navy"
            zoomControl={false}
          >
            {/* Dark themed tile layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            {mockCyclones.map(cyclone => (
              <Marker 
                key={cyclone.id} 
                position={cyclone.coords} 
                icon={mapIcons[cyclone.intensity]}
                eventHandlers={{
                  click: () => setActiveCyclone(cyclone),
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-center font-sans tracking-wide">
                    <strong className="text-lg block text-accent-blue">{cyclone.name}</strong>
                    <span className="text-xs text-gray-300">{cyclone.status}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-xl font-bold border-b border-white/10 pb-2">Active Systems</h2>
          <div className="space-y-4">
            {mockCyclones.map(cyclone => (
              <div key={cyclone.id} onClick={() => setActiveCyclone(cyclone)}>
                <CycloneCard 
                  {...cyclone} 
                  active={activeCyclone.id === cyclone.id} 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-8 glass p-4 rounded-lg">
            <h3 className="font-semibold text-sm mb-3 text-gray-300 uppercase tracking-wider">Legend</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-green-400"></div><span>Low Risk ({"<"} 90 km/h)</span></li>
              <li className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span>Moderate Risk (90 - 150 km/h)</span></li>
              <li className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-accent-red animate-pulse"></div><span>Severe Risk ({">"} 150 km/h)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
