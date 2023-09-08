import React from "react";
import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";

import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </div>
  );
}

export default App;
