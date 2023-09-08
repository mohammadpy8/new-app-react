import React from "react";
import { useHotels } from "../../context/HotelsContextProvider";

const Map = () => {

    const { isLoading, hotels } = useHotels();

  return <div className="mapContainer">map</div>;
};

export default Map;
