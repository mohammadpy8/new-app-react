import React from "react";
import { useBookmark } from "../../context/BookmarkContextProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const BookMark = () => {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handelDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarks Location</p>;

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
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  <strong>{item.cityName}</strong>
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handelDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookMark;
