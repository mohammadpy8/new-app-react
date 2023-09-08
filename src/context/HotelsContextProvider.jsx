import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

const HotelsContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentHotel, setCurrentHotel] = useState([]);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false);

  const destination = searchParams.get("destination");
  const Room = JSON.parse(searchParams.get("option"))?.Room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${Room || 1}`
  );

  const getHotel = async (id) => {
    setIsLoadingCurrent(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrent(false);
    } catch (err) {
      toast.error(err?.message);
      setIsLoadingCurrent(false);
    }
  };

  return (
    <HotelsContext.Provider
      value={{ isLoading, hotels, getHotel, isLoadingCurrent, currentHotel }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsContextProvider;

export const useHotels = () => {
  return useContext(HotelsContext);
};
