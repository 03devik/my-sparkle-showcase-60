import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

interface HourlyForecastData {
  time: string;
  temp: number;
  icon: string;
  description: string;
}

interface HourlyForecastProps {
  forecast: HourlyForecastData[];
}

const HourlyForecast = ({ forecast }: HourlyForecastProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-primary" />
          24-Hour Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {forecast.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 p-3 bg-background/30 backdrop-blur-md rounded-xl min-w-[80px] border border-border/20"
              >
                <span className="text-sm text-muted-foreground">{hour.time}</span>
                <img
                  src={getWeatherIcon(hour.icon)}
                  alt={hour.description}
                  className="w-10 h-10"
                />
                <span className="text-lg font-semibold text-foreground">
                  {hour.temp}°
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
