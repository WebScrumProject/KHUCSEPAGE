import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import selectArrow from "../assets/SelectArrow.svg";
import moment from "moment"; 
import P_Calendar_styles from "../styles/calendar.module.css"

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
    <div className={P_Calendar_styles.CalendarContainer}>
      <div className={P_Calendar_styles.DropdownButton} onClick={handleToggleCalendar}>{nowDate}</div>
      <div className={P_Calendar_styles.CalendarWrapper }style={{display: isOpen ? "block" : "none" }}  >
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </div>
    </div>
  );
};

export default CustomCalendar;