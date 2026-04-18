import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import LiveMap from './pages/LiveMap';
import Predictions from './pages/Predictions';
import Alerts from './pages/Alerts';
import RiskAnalysis from './pages/RiskAnalysis';
import AlertBanner from './components/ui/AlertBanner';

function App() {
  const [showGlobalAlert, setShowGlobalAlert] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative font-sans">
        {showGlobalAlert && (
          <AlertBanner 
            message="ACTIVE CYCLONE WARNING: Severe Cyclonic Storm 'Mocha' intensifying in Bay of Bengal." 
            onClose={() => setShowGlobalAlert(false)} 
          />
        )}
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<LiveMap />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/risk" element={<RiskAnalysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
