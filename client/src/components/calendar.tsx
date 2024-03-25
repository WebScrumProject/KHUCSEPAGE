import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import selectArrow from "../assets/SelectArrow.svg";
import moment from "moment"; 
import P_Calendar_styles from "../styles/calendar.module.css"

import background from "../components/calendar_icon.jpg"

const CustomCalendar = ({ onChange , value } : {onChange:any; value:any}) => {
  const [nowDate, setNowDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (selectedDate:any) => {
    const selectedDateFormat = moment(selectedDate).format("YYYY/MM/DD");
    const currentDate = moment().format("YYYY/MM/DD");

  if (moment(selectedDateFormat).isBefore(currentDate)) {
 
    alert("이전 날짜를 선택할 수 없습니다.");
  } else {

    onChange(selectedDate);
    setIsOpen(false);
    setNowDate(selectedDateFormat);
  }
    
  };

  return (
    <div className={P_Calendar_styles.CalendarContainer}>
      <div className={P_Calendar_styles.custom_button}  onClick={handleToggleCalendar}>
        <img style={{height:60, width:60}} src={background}></img>
      </div>
      <div className={P_Calendar_styles.CalendarWrapper }style={{display: isOpen ? "block" : "none" }}  >
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </div>
    </div>

    
  );
};

export default CustomCalendar;