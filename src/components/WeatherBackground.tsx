import { useMemo } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle } from "lucide-react";
import { WeatherCondition, getWeatherCondition } from "@/utils/weatherBackgrounds";

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
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large glowing sun */}
            <div className="absolute top-20 right-20 animate-pulse">
              <div className="relative">
                <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
                <Sun className="w-32 h-32 md:w-48 md:h-48 text-yellow-400 drop-shadow-2xl" strokeWidth={1} />
              </div>
            </div>
            {/* Sun rays effect */}
            <div className="absolute top-16 right-16 w-40 h-40 md:w-56 md:h-56">
              <div className="w-full h-full bg-gradient-radial from-yellow-300/20 via-orange-200/10 to-transparent rounded-full animate-pulse" />
            </div>
          </div>
        );

      case "clouds":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multiple floating clouds */}
            <Cloud className="absolute top-24 left-[10%] w-24 h-24 text-white/30 animate-[float_8s_ease-in-out_infinite]" strokeWidth={1} />
            <Cloud className="absolute top-16 right-[20%] w-32 h-32 text-white/25 animate-[float_10s_ease-in-out_infinite_1s]" strokeWidth={1} />
            <Cloud className="absolute top-36 left-[40%] w-20 h-20 text-white/35 animate-[float_7s_ease-in-out_infinite_2s]" strokeWidth={1} />
            <Cloud className="absolute bottom-[30%] right-[5%] w-28 h-28 text-white/20 animate-[float_9s_ease-in-out_infinite_0.5s]" strokeWidth={1} />
          </div>
        );

      case "rain":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Rain cloud */}
            <CloudRain className="absolute top-20 right-[15%] w-40 h-40 text-slate-400/40 animate-[float_6s_ease-in-out_infinite]" strokeWidth={1} />
            {/* Rain drops */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/30 to-transparent rounded-full animate-[rain_1s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "drizzle":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CloudDrizzle className="absolute top-20 right-[20%] w-36 h-36 text-slate-300/40 animate-[float_7s_ease-in-out_infinite]" strokeWidth={1} />
            {/* Light drizzle drops */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-300/20 to-transparent rounded-full animate-[rain_1.5s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "thunderstorm":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CloudLightning className="absolute top-16 right-[15%] w-44 h-44 text-purple-400/40 animate-[float_5s_ease-in-out_infinite]" strokeWidth={1} />
            {/* Lightning flash effect */}
            <div className="absolute inset-0 bg-white/5 animate-[flash_4s_ease-in-out_infinite]" />
            {/* Rain drops */}
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-10 bg-gradient-to-b from-blue-400/40 to-transparent rounded-full animate-[rain_0.8s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 40}%`,
                    animationDelay: `${Math.random() * 0.8}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "snow":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CloudSnow className="absolute top-20 right-[20%] w-36 h-36 text-white/50 animate-[float_8s_ease-in-out_infinite]" strokeWidth={1} />
            {/* Snowflakes */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full animate-[snow_3s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "mist":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CloudFog className="absolute top-24 right-[15%] w-40 h-40 text-gray-300/40 animate-[float_10s_ease-in-out_infinite]" strokeWidth={1} />
            {/* Fog layers */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white/20 via-white/10 to-transparent animate-pulse" />
            <div className="absolute top-1/3 left-0 right-0 h-32 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[float_12s_ease-in-out_infinite]" />
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Cloud className="absolute top-24 right-[20%] w-28 h-28 text-white/20 animate-[float_9s_ease-in-out_infinite]" strokeWidth={1} />
          </div>
        );
    }
  };

  return renderWeatherElements();
};

export default WeatherBackground;