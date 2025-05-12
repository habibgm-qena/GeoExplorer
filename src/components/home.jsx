"use client";

import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const NDVIVisualizer = () => {
  const [activeYear, setActiveYear] = useState(2017);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  
  // Auto-play functionality
  
  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveYear(prevYear => {
          if (prevYear === 2025) {
            setIsPlaying(false);
            return prevYear;
          }
          return prevYear + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  const handlePrevious = () => {
    if (activeYear > 2017) {
      setActiveYear(activeYear - 1);
    }
  };
  
  const handleNext = () => {
    if (activeYear < 2025) {
      setActiveYear(activeYear + 1);
    }
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-emerald-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">NDVI Greenness Index Visualizer</h1>
          <button 
            className="p-2 rounded-full hover:bg-emerald-600 transition duration-300"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={24} />
          </button>
        </div>
      </header>
      
      {showInfo && (
        <div className="bg-white mx-auto max-w-7xl mt-4 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">About NDVI</h2>
          <p className="text-gray-700">
            The Normalized Difference Vegetation Index (NDVI) is a simple graphical indicator that can be used to analyze remote sensing 
            measurements and assess whether the target being observed contains live green vegetation. This visualization shows the progression 
            of greenness in the region from 2017 to 2025, highlighting environmental changes over time.
          </p>
          <button 
            className="mt-4 text-emerald-700 hover:text-emerald-900"
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        <div className="mb-8 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 relative">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              Greenness Index {activeYear}
            </h2>
            
            {/* Placeholder for the map component */}
            <div className="aspect-video bg-emerald-100 rounded-lg flex items-center justify-center border-2 border-emerald-300">
              <div className="text-center text-emerald-800">
                <p className="text-xl font-semibold">Map Component: {activeYear}</p>
                <p className="text-gray-600 mt-2">Your NDVI visualization will appear here</p>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button 
                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                onClick={handlePrevious}
                disabled={activeYear === 2017}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition duration-300"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button 
                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                onClick={handleNext}
                disabled={activeYear === 2025}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-6">
            <div className="relative">
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max mx-auto w-fit">
                  {years.map(year => (
                    <button
                      key={year}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeYear === year 
                          ? 'bg-emerald-600 text-white font-medium scale-110' 
                          : 'bg-white border border-gray-300 hover:border-emerald-500'
                      }`}
                      onClick={() => setActiveYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {years.map(year => (
            <div 
              key={year}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeYear === year ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
              onClick={() => setActiveYear(year)}
            >
              <div className="aspect-video bg-emerald-100 relative overflow-hidden">
                {/* Thumbnail placeholder for each year */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-medium text-emerald-800">{year}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">NDVI {year}</h3>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-emerald-500"
                    style={{ 
                      width: `${Math.min(100, 30 + (year - 2017) * 10)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-emerald-100 p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center">NDVI Greenness Index Visualizer &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default NDVIVisualizer;