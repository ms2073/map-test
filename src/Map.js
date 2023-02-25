import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css'; // Import the CSS style file

function Map() {
  const [location, setLocation] = useState(null);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function renderMap() {
    if (location) {
      const { lat, lng } = location;
      return (
        <MapContainer center={[lat, lng]} zoom={15} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <Popup>Your location</Popup>
          </Marker>
        </MapContainer>
      );
    } else {
      return <p>Please click the button to get your current location.</p>;
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container">
      <button onClick={getCurrentLocation}>Get current location</button>
      {renderMap()}
    </div>
  );
}

export default Map;
