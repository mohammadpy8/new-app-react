import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const BookmarkContextProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState([]);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  const getBookmark = async (id) => {
      setIsLoadingCurrentBookmark(true);
      setCurrentBookmark([]);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (err) {
      toast.error(err?.message);
      setIsLoadingCurrentBookmark(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        isLoadingCurrentBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
