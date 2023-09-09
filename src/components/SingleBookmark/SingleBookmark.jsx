import React, { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const { getBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookmark();

  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;

  const handelBack = () => navigate(-1);

  return (
    <div>
      <button onClick={handelBack} className="btn btn--back">
        {" "}
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem" style={{marginTop: "10px"}}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        <strong>{currentBookmark.cityName}</strong>
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
