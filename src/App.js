import React from "react";

import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import HotelsContextProvider from "./context/HotelsContextProvider";
import BookmarkContextProvider from "./context/BookmarkContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <BookmarkContextProvider>
        <HotelsContextProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookMarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelsContextProvider>
      </BookmarkContextProvider>
    </AuthContextProvider>
  );
}

export default App;
