import React from "react";
import { useBookmark } from "../../context/BookmarkContextProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

const BookMark = () => {
  const { isLoading, bookmarks, currentBookmark } = useBookmark();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-hotel" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                <strong>{item.cityName}</strong>
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookMark;
