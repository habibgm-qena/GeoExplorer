'use client';

import React, { useState, useCallback } from 'react';
import VectorMap from './VectorMap';
import ColorScaleRuler from './colorRuler';

export default function MapGrid() {
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([9.145, 40.489673]);

  const maps = [
    { id: 0, title: '2023 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2024/{z}/{x}/{y}.pbf' },
    { id: 1, title: '2017 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2017/{z}/{x}/{y}.pbf' },
    { id: 2, title: '2018 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2018/{z}/{x}/{y}.pbf' },
    { id: 3, title: '2019 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2019/{z}/{x}/{y}.pbf' },
    { id: 4, title: '2020 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2020/{z}/{x}/{y}.pbf' },
    { id: 5, title: '2021 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2021/{z}/{x}/{y}.pbf' },
    { id: 6, title: '2022 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2022/{z}/{x}/{y}.pbf' },
    { id: 7, title: '2023 NDVI', url: 'https://nvdi-index-mtiles.onrender.com/data/2023/{z}/{x}/{y}.pbf' },
  ];

  const handleZoomEnd = useCallback(newZoom => {
    setZoom(prev => (prev === newZoom ? prev : newZoom));
  }, []);

  const handleMoveEnd = useCallback(newCenter => {
    setCenter(prev =>
      prev[0] === newCenter[0] && prev[1] === newCenter[1] ? prev : newCenter
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
            {/* your logo SVG */}
            <svg className="h-6 w-6 text-white" /* … */ />
          </div>
          <h1 className="ml-3 text-2xl font-bold text-gray-900">GeoExplorer</h1>
        </div>
      </header>

      <div className="px-10 py-4 flex flex-row">
        <div className="flex items-center space-x-4 mr-10 flex-1 ">
          <button
            aria-label="Zoom Out"
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-red-500"
            onClick={() => setZoom(z => Math.max(z - 1, 0))}
          >
            –
          </button>
          <span className="font-medium text-black">Zoom: {zoom}</span>
          <button
            aria-label="Zoom In"
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-green-600"
            onClick={() => setZoom(z => z + 1)}
          >
            ＋
          </button>
        </div>

        <ColorScaleRuler/>

      </div>

      <main className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {maps.map(map => (
            <div key={map.id} className="h-80 relative border rounded overflow-hidden">
              <VectorMap
                url={map.url}
                center={center}
                zoom={zoom}
                onZoomEnd={handleZoomEnd}
                onMoveEnd={handleMoveEnd}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
