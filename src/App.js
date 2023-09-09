import React from "react";

import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookMarkLayout from "./components/BookMarkLayout/BookMarkLayout";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import HotelsContextProvider from "./context/HotelsContextProvider";
import BookmarkContextProvider from "./context/BookmarkContextProvider";

import "./App.css";

function App() {
  return (
    <BookmarkContextProvider>
      <HotelsContextProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookMarkLayout />}>
            <Route index element={<Hotels />} />
            <Route path="add" element={<SingleHotel />} />
          </Route>
        </Routes>
      </HotelsContextProvider>
    </BookmarkContextProvider>
  );
}

export default App;
