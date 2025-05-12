// components/VectorMap.jsx
'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled.js';

function SyncZoom({ zoom }) {
  const map = useMap();
  useEffect(() => {
    if (map.getZoom() !== zoom) {
      map.setZoom(zoom);
    }
  }, [zoom, map]);
  return null;
}

function SyncCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    const [lat, lng] = center;
    const cur = map.getCenter();
    if (cur.lat !== lat || cur.lng !== lng) {
      map.setView(center, map.getZoom(), { animate: false });
    }
  }, [center, map]);
  return null;
}

function CaptureZoom({ onZoomEnd }) {
  useMapEvents({
    zoomend: e => onZoomEnd(e.target.getZoom())
  });
  return null;
}

function CaptureMove({ onMoveEnd }) {
  useMapEvents({
    moveend: e => {
      const { lat, lng } = e.target.getCenter();
      onMoveEnd([lat, lng]);
    }
  });
  return null;
}

function VectorTileLayer({ url }) {
  const map = useMap();
  const getColorByScore = score => {
    const t = Math.max(0, Math.min(1, (score + 1) / 2));
    const r = Math.round((1 - t) * 255);
    const g = Math.round(t * 255);
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}00`;
  };

  useEffect(() => {
    const vectorLayer = new L.VectorGrid.Protobuf(url, {
      rendererFactory: L.canvas.tile,
      interactive: true,
      vectorTileLayerStyles: {}
    });

    vectorLayer.once('load', () => {
      const layers = vectorLayer.getDataLayerNames();
      const styles = {};
      layers.forEach(name => {
        styles[name] = props => ({
          fill: true,
          color: props.outlineColor || '#000',
          weight: props.weight || 1,
          fillColor:
            props.score != null
              ? getColorByScore(props.score)
              : props.color || '#3388ff',
          fillOpacity: props.opacity ?? 0.7,
          radius: props.radius || 8
        });
      });
      vectorLayer.options.vectorTileLayerStyles = styles;
      vectorLayer.redraw();
    });

    vectorLayer.addTo(map);
    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, url]);

  return null;
}

export default function VectorMap({
  url,
  center = [9.145, 40.489673],
  zoom = 5,
  onZoomEnd = () => {},
  onMoveEnd = () => {}
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
      preferCanvas
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <VectorTileLayer url={url} />
      <SyncZoom zoom={zoom} />
      <SyncCenter center={center} />
      <CaptureZoom onZoomEnd={onZoomEnd} />
      <CaptureMove onMoveEnd={onMoveEnd} />
    </MapContainer>
  );
}
