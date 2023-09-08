import React, { useEffect, useState } from "react";
import { useHotels } from "../../context/HotelsContextProvider";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";

const Map = () => {
  const { isLoading, hotels } = useHotels();

  const [mapPosition, setMapPosition] = useState([51, 3]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

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
        <ChangeCenter position={mapPosition} />
        {hotels.map((item) => {
          return (
            <Marker position={[item.latitude, item.longitude]} key={item.id}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
