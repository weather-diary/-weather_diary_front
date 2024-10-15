import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { CalendarProps, CalendarDay } from "../types/WeatherDataTypes";
import { weatherDate } from "../api/Weather";

const Calendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const generateCalendarDays = useCallback(
    (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      const days: CalendarDay[] = [];
      for (let i = 0; i < firstDay; i++) {
        days.push({ date: null, weather: null });
      }
      for (let i = 1; i <= lastDate; i++) {
        const currentDate = new Date(year, month, i);
        const weather = weatherData.find((data) => {
          const dataDate = new Date(data.date);
          return (
            dataDate.getDate() === i &&
            dataDate.getMonth() === month &&
            dataDate.getFullYear() === year
          );
        });
        days.push({
          date: currentDate,
          weather: weather ? weather.icon : null,
        });
      }
      setCalendarDays(days);
    },
    [weatherData]
  );

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate, generateCalendarDays]);

  const fetchWeatherData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const data = await weatherDate(token);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderWeatherIcon = (weather: string | null) => {
    if (!weather) return null;
    return (
      <WeatherIconImg
        src={`http://openweathermap.org/img/wn/${weather}.png`}
        alt="Weather Icon"
      />
    );
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <ArrowButton onClick={handlePrevMonth}>▲</ArrowButton>
        <MonthYear>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </MonthYear>
        <ArrowButton onClick={handleNextMonth}>▼</ArrowButton>
      </CalendarHeader>
      <CalendarGrid>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {calendarDays.map((day, index) => (
          <DayCell
            key={index}
            isCurrentMonth={!!day.date}
            onClick={() => day.date && onDateClick(day.date)}
            isToday={day.date?.toDateString() === new Date().toDateString()}
          >
            {day.date && (
              <>
                <DayNumber>{day.date.getDate()}</DayNumber>
                <WeatherIcon>{renderWeatherIcon(day.weather)}</WeatherIcon>
              </>
            )}
          </DayCell>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const MonthYear = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e0e0e0;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
`;

const DayCell = styled.div<{ isCurrentMonth: boolean; isToday: boolean }>`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => (props.isCurrentMonth ? "white" : "#f0f0f0")};
  cursor: ${(props) => (props.isCurrentMonth ? "pointer" : "default")};
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${(props) =>
    props.isToday &&
    `
    border: 2px solid #4CAF50;
  `}
`;

const DayNumber = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const WeatherIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WeatherIconImg = styled.img`
  width: 30px;
  height: 30px;
`;
