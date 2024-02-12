import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import selectArrow from "../assets/SelectArrow.svg";
import moment from "moment";

const CustomCalendar = ({ onChange , value } : {onChange:any; value:any}) => {
  const [nowDate, setNowDate] = useState("날짜");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate:any) => {
    onChange(selectedDate);
    setIsOpen(false);
    setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
  };

  return (
    <div className='CalendarContainer'>
      <div className="DropdownButton" onClick={handleToggleCalendar}>{nowDate}</div>
      <div className="CalendarWrapper" style={{display: isOpen ? "block" : "none" }}  >
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </div>
    </div>
  );
};

export default CustomCalendar;