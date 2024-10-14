import React, { useState, useEffect } from "react";
import { WeatherData } from "../types/WeatherDataTypes";
import Calendar from "../components/Calendar";

const DiaryList: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    // API에서 날씨 데이터를 가져오는 로직을 여기에 구현하세요
    // 예: fetchWeatherData().then(data => setWeatherData(data));
  }, []);

  const handleDateClick = (date: Date) => {
    // 작성 페이지로 이동하는 로직을 여기에 구현하세요
    console.log("선택된 날짜:", date);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">날씨 일기</h1>
      <Calendar onDateClick={handleDateClick} weatherData={weatherData} />
    </div>
  );
};

export default DiaryList;
