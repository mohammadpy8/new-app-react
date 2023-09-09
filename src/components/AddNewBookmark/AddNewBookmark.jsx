import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const getFlagEmojy = (countryCode) => {
  const codePoint = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoint);
};

const AddNewBookmark = () => {
  const navigate = useNavigate();

  const handelBack = () => navigate(-1);
  const submitHandel = (e) => e.preventDefault();

  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (!lat || !lng) return;
    const fetchLocationData = async () => {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not city please click on somewhere else."
          );
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setCountryCode(getFlagEmojy(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };
    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return toast.error(geoCodingError);

  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={submitHandel}>
        <div className="formControl">
          <label htmlFor="cityName">City Name:</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">Country Name:</label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <span className="flag">{countryCode}</span>
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
