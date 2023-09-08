import React, { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';

const HotelsContext = createContext();

const HotelsContextProvider = ({ children }) => {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const destination = searchParams.get("destination");
    const Room = JSON.parse(searchParams.get("option"))?.Room;
  
    const { isLoading, data: hotels } = useFetch(
      "http://localhost:5000/hotels",
      `q=${destination || ""}&accommodates_gte=${Room || 1}`
    );

    return (
        <HotelsContext.Provider value={{isLoading, hotels}}>
            {children}
        </HotelsContext.Provider>
    );
};

export default HotelsContextProvider;

export const useHotels = () => {
    return useContext(HotelsContext)
};