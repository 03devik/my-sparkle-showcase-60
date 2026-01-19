import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, Thermometer, Gauge, Sun, Sunrise, Sunset } from "lucide-react";

interface WeatherDetailsProps {
  humidity: number;
  wind_speed: number;
  temp: number;
  feels_like: number;
  pressure: number;
  uv_index: number;
  sunrise: string;
  sunset: string;
}

const WeatherDetails = ({
  humidity,
  wind_speed,
  temp,
  feels_like,
  pressure,
  uv_index,
  sunrise,
  sunset,
}: WeatherDetailsProps) => {
  const getUvLevel = (uv: number) => {
    if (uv <= 2) return { label: "Low", color: "text-green-500" };
    if (uv <= 5) return { label: "Moderate", color: "text-yellow-500" };
    if (uv <= 7) return { label: "High", color: "text-orange-500" };
    if (uv <= 10) return { label: "Very High", color: "text-red-500" };
    return { label: "Extreme", color: "text-purple-500" };
  };

  const uvInfo = getUvLevel(uv_index);

  const details = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${Math.round(temp)}°C`,
      subValue: `Feels like ${Math.round(feels_like)}°C`,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${humidity}%`,
      subValue: humidity > 70 ? "High" : humidity > 40 ? "Moderate" : "Low",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${wind_speed} m/s`,
      subValue: wind_speed > 10 ? "Strong" : wind_speed > 5 ? "Moderate" : "Light",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${pressure} hPa`,
      subValue: pressure > 1015 ? "High" : pressure > 1005 ? "Normal" : "Low",
    },
    {
      icon: Sun,
      label: "UV Index",
      value: uv_index.toString(),
      subValue: uvInfo.label,
      subValueColor: uvInfo.color,
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: sunrise,
      subValue: "Morning",
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: sunset,
      subValue: "Evening",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-background/30 backdrop-blur-md rounded-xl border border-border/20"
            >
              <detail.icon className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground truncate">{detail.label}</p>
                <p className="text-xl font-semibold text-foreground">{detail.value}</p>
                <p className={`text-xs ${detail.subValueColor || "text-muted-foreground"}`}>
                  {detail.subValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
