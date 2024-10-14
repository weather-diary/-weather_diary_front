export interface WeatherData {
  date: string;
  icon: string;
}

export interface CalendarDay {
  date: Date | null;
  weather: string | null;
}

export interface CalendarProps {
  onDateClick: (date: Date) => void;
  weatherData: WeatherData[];
}
