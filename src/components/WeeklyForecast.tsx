import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, CloudDrizzle } from "lucide-react";

export interface DailyForecast {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  icon: string;
  description: string;
}

interface WeeklyForecastProps {
  forecast: DailyForecast[];
}

const getWeatherIcon = (icon: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "01d": <Sun className="w-8 h-8 text-yellow-400" />,
    "01n": <Sun className="w-8 h-8 text-yellow-300" />,
    "02d": <Cloud className="w-8 h-8 text-gray-300" />,
    "02n": <Cloud className="w-8 h-8 text-gray-400" />,
    "03d": <Cloud className="w-8 h-8 text-gray-400" />,
    "03n": <Cloud className="w-8 h-8 text-gray-500" />,
    "04d": <Cloud className="w-8 h-8 text-gray-500" />,
    "04n": <Cloud className="w-8 h-8 text-gray-600" />,
    "09d": <CloudDrizzle className="w-8 h-8 text-blue-400" />,
    "09n": <CloudDrizzle className="w-8 h-8 text-blue-500" />,
    "10d": <CloudRain className="w-8 h-8 text-blue-400" />,
    "10n": <CloudRain className="w-8 h-8 text-blue-500" />,
    "11d": <CloudLightning className="w-8 h-8 text-purple-400" />,
    "11n": <CloudLightning className="w-8 h-8 text-purple-500" />,
    "13d": <CloudSnow className="w-8 h-8 text-blue-200" />,
    "13n": <CloudSnow className="w-8 h-8 text-blue-300" />,
    "50d": <Wind className="w-8 h-8 text-gray-400" />,
    "50n": <Wind className="w-8 h-8 text-gray-500" />,
  };
  return iconMap[icon] || <Cloud className="w-8 h-8 text-gray-400" />;
};

const WeeklyForecast = ({ forecast }: WeeklyForecastProps) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-card/30 backdrop-blur-md rounded-2xl border border-border/50 p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-4 rounded-xl bg-background/20 hover:bg-background/30 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20">
                <p className="font-medium text-foreground">{day.day}</p>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
              {getWeatherIcon(day.icon)}
              <p className="text-sm text-muted-foreground capitalize hidden sm:block">
                {day.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">{day.tempHigh}°</span>
              <span className="text-muted-foreground">{day.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
