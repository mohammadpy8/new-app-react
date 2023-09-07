import React, { useState } from "react";

import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({
    Adult: 1,
    Children: 0,
    Room: 2,
  });

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
            1 adult &bull; 2 children &bull; 1 room
          </div>
          {openOption && <GuestOptionList option={option} />}
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

const GuestOptionList = () => {
  return (
    <div className="guestOptions">
      <OptionItem />
      <OptionItem />
      <OptionItem />
    </div>
  );
};

const OptionItem = () => {
  return (
    <div className="guestOptionItem">
      <span className="optionText">Adult</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">2</span>
        <button className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
};
