import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "@/hooks/useWeather";

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
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
