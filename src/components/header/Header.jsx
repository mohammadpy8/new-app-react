import React, { useState } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    Adult: 1,
    Children: 0,
    Room: 0,
  });

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
          <div className="dateDropDown">2023/06/22</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>
            {option.Adult} adult &bull; {option.Children} children &bull; {option.Room} room
          </div>
          {openOption && (
            <GuestOptionList option={option} handelOptions={handelOptions} />
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

const GuestOptionList = ({ option, handelOptions }) => {
  return (
    <div className="guestOptions">
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
