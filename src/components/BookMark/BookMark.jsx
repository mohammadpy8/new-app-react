import React from "react";
import Map from "../Map/Map";

const BookMark = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <div>bookmark</div>
      </div>
      <Map markerLocations={[]}/>
    </div>
  );
};

export default BookMark;
