import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

// Demo data for when no API key is configured
const DEMO_WEATHER: Record<string, WeatherData> = {
  london: {
    city: "London",
    country: "GB",
    temp: 12,
    feels_like: 10,
    humidity: 78,
    wind_speed: 4.5,
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
    description: "sunny",
    icon: "01d",
  },
};

const API_KEY = ""; // Add your OpenWeatherMap API key here

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
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
          setIsLoading(false);
        }, 500);
      } else {
        // Generate random weather for unknown cities
        setTimeout(() => {
          setWeather({
            city: city.charAt(0).toUpperCase() + city.slice(1),
            country: "??",
            temp: Math.floor(Math.random() * 30) + 5,
            feels_like: Math.floor(Math.random() * 30) + 5,
            humidity: Math.floor(Math.random() * 50) + 40,
            wind_speed: Math.round(Math.random() * 10 * 10) / 10,
            description: ["sunny", "cloudy", "rainy", "windy"][Math.floor(Math.random() * 4)],
            icon: ["01d", "02d", "03d", "04d", "10d"][Math.floor(Math.random() * 5)],
          });
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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
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
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch weather",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setIsLoading(true);

    // If no API key, use demo London data
    if (!API_KEY) {
      setTimeout(() => {
        setWeather({
          city: "Your Location",
          country: "??",
          temp: 18,
          feels_like: 17,
          humidity: 65,
          wind_speed: 3.5,
          description: "partly cloudy",
          icon: "02d",
        });
        setIsLoading(false);
        toast({
          title: "Demo Mode",
          description: "Add an OpenWeatherMap API key for real location data",
        });
      }, 500);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
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
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch weather",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weather,
    isLoading,
    fetchWeather,
    fetchWeatherByCoords,
  };
};
