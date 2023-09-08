import React from "react";
import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";

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
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div></div>} />
          <Route path=":id" element={<div></div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
