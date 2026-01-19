import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  pressure: number;
  uv_index: number;
  sunrise: string;
  sunset: string;
  description: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  description: string;
}

const generateHourlyForecast = (baseTemp: number): HourlyForecast[] => {
  const hours = [];
  const now = new Date();
  const icons = ["01d", "02d", "03d", "04d", "01n", "02n"];
  
  for (let i = 0; i < 24; i++) {
    const hour = new Date(now);
    hour.setHours(now.getHours() + i);
    const tempVariation = Math.sin((i / 24) * Math.PI * 2) * 5;
    hours.push({
      time: hour.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
      temp: Math.round(baseTemp + tempVariation + (Math.random() * 2 - 1)),
      icon: icons[Math.floor(Math.random() * icons.length)],
      description: ["Clear", "Cloudy", "Partly Cloudy", "Overcast"][Math.floor(Math.random() * 4)],
    });
  }
  return hours;
};

const formatTime = (offset: number): string => {
  const date = new Date();
  date.setHours(6 + offset, Math.floor(Math.random() * 60));
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

const DEMO_WEATHER: Record<string, WeatherData> = {
  london: {
    city: "London",
    country: "GB",
    temp: 12,
    feels_like: 10,
    humidity: 78,
    wind_speed: 4.5,
    pressure: 1015,
    uv_index: 3,
    sunrise: "6:45 AM",
    sunset: "8:20 PM",
    description: "overcast clouds",
    icon: "04d",
  },
  tokyo: {
    city: "Tokyo",
    country: "JP",
    temp: 22,
    feels_like: 24,
    humidity: 65,
    wind_speed: 3.2,
    pressure: 1018,
    uv_index: 6,
    sunrise: "5:30 AM",
    sunset: "6:45 PM",
    description: "clear sky",
    icon: "01d",
  },
  "new york": {
    city: "New York",
    country: "US",
    temp: 18,
    feels_like: 17,
    humidity: 55,
    wind_speed: 5.1,
    pressure: 1012,
    uv_index: 5,
    sunrise: "6:15 AM",
    sunset: "7:50 PM",
    description: "few clouds",
    icon: "02d",
  },
  paris: {
    city: "Paris",
    country: "FR",
    temp: 15,
    feels_like: 14,
    humidity: 70,
    wind_speed: 3.8,
    pressure: 1010,
    uv_index: 4,
    sunrise: "7:00 AM",
    sunset: "9:00 PM",
    description: "light rain",
    icon: "10d",
  },
  sydney: {
    city: "Sydney",
    country: "AU",
    temp: 25,
    feels_like: 26,
    humidity: 60,
    wind_speed: 4.0,
    pressure: 1020,
    uv_index: 8,
    sunrise: "5:45 AM",
    sunset: "7:30 PM",
    description: "sunny",
    icon: "01d",
  },
};

const API_KEY = ""; // Add your OpenWeatherMap API key here

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    
    // If no API key, use demo data
    if (!API_KEY) {
      const demoData = DEMO_WEATHER[city.toLowerCase()];
      if (demoData) {
        setTimeout(() => {
          setWeather(demoData);
          setHourlyForecast(generateHourlyForecast(demoData.temp));
          setIsLoading(false);
        }, 500);
      } else {
        // Generate random weather for unknown cities
        const temp = Math.floor(Math.random() * 30) + 5;
        setTimeout(() => {
          setWeather({
            city: city.charAt(0).toUpperCase() + city.slice(1),
            country: "??",
            temp,
            feels_like: Math.floor(Math.random() * 30) + 5,
            humidity: Math.floor(Math.random() * 50) + 40,
            wind_speed: Math.round(Math.random() * 10 * 10) / 10,
            pressure: Math.floor(Math.random() * 30) + 1000,
            uv_index: Math.floor(Math.random() * 11),
            sunrise: formatTime(0),
            sunset: formatTime(12),
            description: ["sunny", "cloudy", "rainy", "windy"][Math.floor(Math.random() * 4)],
            icon: ["01d", "02d", "03d", "04d", "10d"][Math.floor(Math.random() * 5)],
          });
          setHourlyForecast(generateHourlyForecast(temp));
          setIsLoading(false);
          toast({
            title: "Demo Mode",
            description: "Add an OpenWeatherMap API key for real data",
          });
        }, 500);
      }
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        uv_index: 5, // Would need separate UV API call
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setHourlyForecast(generateHourlyForecast(data.main.temp));
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setIsLoading(true);

    if (!API_KEY) {
      // Demo mode with coords
      const temp = Math.floor(Math.random() * 30) + 5;
      setTimeout(() => {
        setWeather({
          city: "Your Location",
          country: "📍",
          temp,
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 50) + 40,
          wind_speed: Math.round(Math.random() * 10 * 10) / 10,
          pressure: Math.floor(Math.random() * 30) + 1000,
          uv_index: Math.floor(Math.random() * 11),
          sunrise: formatTime(0),
          sunset: formatTime(12),
          description: "partly cloudy",
          icon: "02d",
        });
        setHourlyForecast(generateHourlyForecast(temp));
        setIsLoading(false);
        toast({
          title: "Demo Mode",
          description: "Add an OpenWeatherMap API key for real data",
        });
      }, 500);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();

      setWeather({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        uv_index: 5,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setHourlyForecast(generateHourlyForecast(data.main.temp));
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { weather, hourlyForecast, isLoading, fetchWeather, fetchWeatherByCoords };
};
