import { useMemo } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle } from "lucide-react";
import { getWeatherCondition } from "@/utils/weatherBackgrounds";

interface WeatherBackgroundProps {
  description?: string;
  icon?: string;
}

const WeatherBackground = ({ description = "", icon = "" }: WeatherBackgroundProps) => {
  const condition = useMemo(() => {
    if (!description || !icon) return "default";
    return getWeatherCondition(description, icon);
  }, [description, icon]);

  const renderWeatherElements = () => {
    switch (condition) {
      case "clear":
        return (
          <>
            <div className="absolute top-16 right-16 md:top-20 md:right-24">
              <div className="relative">
                <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
                <Sun className="w-32 h-32 md:w-48 md:h-48 text-amber-400/60 drop-shadow-2xl animate-[float_10s_ease-in-out_infinite]" strokeWidth={1} />
              </div>
            </div>
          </>
        );

      case "clouds":
        return (
          <>
            <Cloud className="absolute top-20 left-[8%] w-24 h-24 text-foreground/20 animate-[float_14s_ease-in-out_infinite]" strokeWidth={1} />
            <Cloud className="absolute top-14 right-[15%] w-32 h-32 text-foreground/15 animate-[float_18s_ease-in-out_infinite_2s]" strokeWidth={1} />
            <Cloud className="absolute top-32 left-[35%] w-20 h-20 text-foreground/25 animate-[float_12s_ease-in-out_infinite_1s]" strokeWidth={1} />
            <Cloud className="absolute bottom-[35%] right-[8%] w-28 h-28 text-foreground/15 animate-[float_16s_ease-in-out_infinite_3s]" strokeWidth={1} />
          </>
        );

      case "rain":
        return (
          <>
            <CloudRain className="absolute top-16 right-[12%] w-40 h-40 text-foreground/30 animate-[float_10s_ease-in-out_infinite]" strokeWidth={1} />
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent rounded-full animate-[rain_1.2s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 40}%`,
                    animationDelay: `${Math.random() * 1.2}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case "drizzle":
        return (
          <>
            <CloudDrizzle className="absolute top-18 right-[18%] w-36 h-36 text-foreground/25 animate-[float_12s_ease-in-out_infinite]" strokeWidth={1} />
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-4 bg-gradient-to-b from-primary/20 to-transparent rounded-full animate-[rain_1.8s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 45}%`,
                    animationDelay: `${Math.random() * 1.8}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case "thunderstorm":
        return (
          <>
            <CloudLightning className="absolute top-14 right-[12%] w-44 h-44 text-foreground/35 animate-[float_8s_ease-in-out_infinite]" strokeWidth={1} />
            <div className="absolute inset-0 bg-foreground/5 animate-[flash_5s_ease-in-out_infinite]" />
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-10 bg-gradient-to-b from-primary/40 to-transparent rounded-full animate-[rain_0.8s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 35}%`,
                    animationDelay: `${Math.random() * 0.8}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case "snow":
        return (
          <>
            <CloudSnow className="absolute top-16 right-[15%] w-36 h-36 text-foreground/40 animate-[float_14s_ease-in-out_infinite]" strokeWidth={1} />
            <div className="absolute inset-0">
              {[...Array(35)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-foreground/50 rounded-full animate-[snow_5s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-5%`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case "mist":
        return (
          <>
            <CloudFog className="absolute top-20 right-[12%] w-40 h-40 text-foreground/30 animate-[float_16s_ease-in-out_infinite]" strokeWidth={1} />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-foreground/15 via-foreground/5 to-transparent animate-pulse" />
          </>
        );

      default:
        return (
          <Cloud className="absolute top-24 right-[18%] w-28 h-28 text-foreground/15 animate-[float_14s_ease-in-out_infinite]" strokeWidth={1} />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-[4000ms] ease-in-out">
      {renderWeatherElements()}
    </div>
  );
};

export default WeatherBackground;