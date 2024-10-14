import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate, weatherData]);

  const fetchWeatherData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const data = await weatherDate(token);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const generateCalendarDays = (date: Date) => {
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
      days.push({ date: currentDate, weather: weather ? weather.icon : null });
    }
    setCalendarDays(days);
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
      <img
        src={`http://openweathermap.org/img/wn/${weather}.png`}
        alt="Weather Icon"
        width="100"
        height="100"
      />
    );
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Button onClick={handlePrevMonth}>이전</Button>
        <MonthYear>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </MonthYear>
        <Button onClick={handleNextMonth}>다음</Button>
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
          >
            {day.date && (
              <>
                <div>{day.date.getDate()}</div>
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
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const MonthYear = styled.h2`
  margin: 0;
  font-size: 1.5rem;
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
  background-color: #f8f8f8;
`;

const DayCell = styled.div<{ isCurrentMonth: boolean }>`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => (props.isCurrentMonth ? "white" : "#f0f0f0")};
  cursor: ${(props) => (props.isCurrentMonth ? "pointer" : "default")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.isCurrentMonth ? "#e6f2ff" : "#f0f0f0"};
  }
`;

const WeatherIcon = styled.div`
  margin-top: 5px;
`;
