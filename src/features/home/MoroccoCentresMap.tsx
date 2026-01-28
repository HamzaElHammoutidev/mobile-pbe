'use client';

import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MOROCCO_BOUNDS: L.LatLngBoundsExpression = [
  [22.8, -17.2],
  [36.0, -0.9],
];

export interface CentreMapItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
}

function createMarkerIcon() {
  return L.divIcon({
    className: 'pbe-marker-icon',
    html: `<div style="
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FFD200;
      border: 2px solid #fff;
      box-shadow: 0 0 0 2px rgba(255,210,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

interface MoroccoCentresMapProps {
  centres: CentreMapItem[];
  className?: string;
  style?: React.CSSProperties;
}

export default function MoroccoCentresMap({ centres, className, style }: MoroccoCentresMapProps) {
  const icon = useMemo(createMarkerIcon, []);

  return (
    <MapContainer
      bounds={MOROCCO_BOUNDS}
      boundsOptions={{ padding: [24, 24], maxZoom: 6 }}
      scrollWheelZoom={true}
      className={className ?? ''}
      style={{ height: '100%', width: '100%', ...style }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centres.map((c) => (
        <Marker key={c.id} position={[c.latitude, c.longitude]} icon={icon}>
          <Popup>
            <strong>{c.name}</strong>
            {c.city && <><br /><span style={{ fontSize: '12px', color: '#6B7280' }}>{c.city}</span></>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
