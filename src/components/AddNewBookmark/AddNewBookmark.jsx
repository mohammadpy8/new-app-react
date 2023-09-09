import React from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

const AddNewBookmark = () => {
  const navigate = useNavigate();

  const handelBack = () => navigate(-1);
  const submitHandel = (e) => e.preventDefault();

  const { lat, lng } = useUrlLocation();

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={submitHandel}>
        <div className="formControl">
          <label htmlFor="cityName">City Name:</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">Country Name:</label>
          <input type="text" name="countryName" id="countryName" />
        </div>
        <div className="buttons">
          <button onClick={handelBack} className="btn btn--back">
            &larr; Back
          </button>
          <button className="btn btn--primary">Add New Bookmark</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBookmark;
