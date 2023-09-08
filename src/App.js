import React from "react";
import Header from "./components/header/Header";
import LocationList from "./components/LocationList/LocationList";

import { Toaster } from 'react-hot-toast';

import "./App.css";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
