import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const BookmarkContextProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarkList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    };
    fetchBookmarkList();
  }, []);

  const getBookmark = async (id) => {
    setIsLoading(true);
    setCurrentBookmark([]);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoading(false);
    } catch (err) {
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const createBookmark = async (newBookmark) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
      toast.success("successfully");
    }
  };

  const deleteBookmark = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
      toast.success("successfully");
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
        deleteBookmark,
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
