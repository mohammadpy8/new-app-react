import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import Loader from "../Loader/Loader";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const Room = JSON.parse(searchParams.get("option"))?.Room;

  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${Room || 1}`
  );

  if (isLoading) <Loader />;

  return (
    <div className="searchList">
      <h2>Search Result ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  $ {item.price}
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Hotels;
