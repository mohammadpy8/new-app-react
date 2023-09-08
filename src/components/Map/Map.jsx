import React, { useState } from "react";
import { useHotels } from "../../context/HotelsContextProvider";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  const { isLoading, hotels } = useHotels();

  const [mapPosition, setMapPosition] = useState([51, -3]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotels.map((item) => {
          return (
            <Marker position={[item.latitude, item.longitude]} key={item.id}>
              <Popup>
                {item.host_location}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
