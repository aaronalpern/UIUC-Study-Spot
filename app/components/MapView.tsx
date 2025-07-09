"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import studySpots from "../data/studySpots";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// Create custom modern markers with Illinois colors
const createCustomIcon = (crowdLevel: string) => {
  const colors = {
    "Quiet": "#10b981", // Green
    "Moderate": "#f59e0b", // Yellow
    "Crowded": "#ef4444", // Red
    "Loud": "#ef4444", // Red
  };
  
  const color = colors[crowdLevel as keyof typeof colors] || "#3b82f6";
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      background: ${color};
      border: 3px solid #E84A27;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: white;
      font-weight: bold;
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Map tile options
const mapTiles = {
  default: {
    name: "Clean Campus",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; CartoDB'
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; Esri'
  }
};

const MapView = () => {
  const center: [number, number] = [40.1090, -88.2270];
  const [currentTile, setCurrentTile] = useState("default");

  return (
    <div className="map-container">
      <div className="uiuc-header">
        <div className="uiuc-title">
          <span className="illinois-orange">Illinois</span> Study Spots
        </div>
        <div className="uiuc-subtitle">Find your perfect study space on campus</div>
        <div className="map-controls">
          <select 
            value={currentTile} 
            onChange={(e) => setCurrentTile(e.target.value)}
            className="map-style-selector"
          >
            {Object.entries(mapTiles).map(([key, tile]) => (
              <option key={key} value={key}>{tile.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <MapContainer 
          center={center} 
          zoom={15} 
          style={{ height: "calc(100vh - 120px)", width: "100%" }}
        >
          <TileLayer
            attribution={mapTiles[currentTile as keyof typeof mapTiles].attribution}
            url={mapTiles[currentTile as keyof typeof mapTiles].url}
          />
          {studySpots.map((spot) => (
            <Marker 
              key={spot.id} 
              position={[spot.lat, spot.lng]} 
              icon={createCustomIcon(spot.crowdLevel)}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  <strong style={{ color: "#E84A27" }}>{spot.name}</strong>
                  <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                    <span style={{ 
                      display: "inline-block", 
                      padding: "4px 8px", 
                      borderRadius: "6px", 
                      fontSize: "12px", 
                      fontWeight: "500",
                      backgroundColor: spot.crowdLevel === "Crowded" ? "#fef2f2" : 
                                     spot.crowdLevel === "Moderate" ? "#fffbeb" : "#f0fdf4",
                      color: spot.crowdLevel === "Crowded" ? "#dc2626" : 
                            spot.crowdLevel === "Moderate" ? "#d97706" : "#16a34a"
                    }}>
                      👥 {spot.crowdLevel}
                    </span>
                    <span style={{ 
                      display: "inline-block", 
                      padding: "4px 8px", 
                      borderRadius: "6px", 
                      fontSize: "12px", 
                      fontWeight: "500",
                      marginLeft: "8px",
                      backgroundColor: spot.noiseLevel === "Loud" ? "#fef2f2" : 
                                     spot.noiseLevel === "Moderate" ? "#fffbeb" : "#f0fdf4",
                      color: spot.noiseLevel === "Loud" ? "#dc2626" : 
                            spot.noiseLevel === "Moderate" ? "#d97706" : "#16a34a"
                    }}>
                      🔊 {spot.noiseLevel}
                    </span>
                  </div>
                  <small>Last updated: {spot.lastUpdated}</small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
