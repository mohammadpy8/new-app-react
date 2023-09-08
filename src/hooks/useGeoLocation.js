import { useState } from "react";

const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const getPosition = () => {
    if (!navigator.geolocation)
      return setError("Your Browser does not GeoLocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, error, position, getPosition };
};

export default useGeoLocation;
