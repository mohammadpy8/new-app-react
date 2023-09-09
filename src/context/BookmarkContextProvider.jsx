import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: [],
  error: null,
};

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
    case "bookmark/created":
    case "bookmark/deleted":
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unkown actions");
  }
};

const BookmarkContextProvider = ({ children }) => {
  // const [currentBookmark, setCurrentBookmark] = useState([]);
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    const fetchBookmarkList = async () => {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        toast.error(err?.message);
        dispatch({ type: "rejected", payload: err?.message });
      }
    };
    fetchBookmarkList();
  }, []);

  const getBookmark = async (id) => {
    dispatch({ type: "loading" });
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
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
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
