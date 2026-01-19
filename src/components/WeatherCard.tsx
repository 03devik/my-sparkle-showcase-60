import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/50 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-foreground">
              {weather.city}, {weather.country}
            </h2>
            <p className="text-muted-foreground capitalize mt-1">
              {weather.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={getWeatherIcon(weather.icon)}
              alt={weather.description}
              className="w-24 h-24"
            />
            <span className="text-6xl font-bold text-foreground">
              {Math.round(weather.temp)}°C
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
            <Thermometer className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="text-lg font-semibold text-foreground">
                {Math.round(weather.feels_like)}°C
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
            <Droplets className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold text-foreground">
                {weather.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
            <Wind className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-lg font-semibold text-foreground">
                {weather.wind_speed} m/s
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
