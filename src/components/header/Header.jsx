import React, { useState, useRef } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

import useOutsideClick from "../../hooks/useOutSideClick";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    Adult: 1,
    Children: 0,
    Room: 0,
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const handelOptions = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "increment" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go..."
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option.Adult} adult &bull; {option.Children} children &bull;{" "}
            {option.Room} room
          </div>
          {openOption && (
            <GuestOptionList
              option={option}
              handelOptions={handelOptions}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

const GuestOptionList = ({ option, handelOptions, setOpenOption }) => {
  const optionRef = useRef();

  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));

  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        type="Adult"
        option={option}
        minLimit={1}
        handelOptions={handelOptions}
      />
      <OptionItem
        type="Children"
        option={option}
        minLimit={0}
        handelOptions={handelOptions}
      />
      <OptionItem
        type="Room"
        option={option}
        minLimit={1}
        handelOptions={handelOptions}
      />
    </div>
  );
};

const OptionItem = ({ option, type, minLimit, handelOptions }) => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handelOptions(type, "decerement")}
          className="optionCounterBtn"
          disabled={option[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{option[type]}</span>
        <button
          onClick={() => handelOptions(type, "increment")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
};