import { useMemo } from "react";
import { getWeatherCondition } from "@/utils/weatherBackgrounds";

// Import weather images
import sunImage from "@/assets/weather/sun.png";
import cloudsImage from "@/assets/weather/clouds.png";
import rainCloudImage from "@/assets/weather/rain-cloud.png";
import snowCloudImage from "@/assets/weather/snow-cloud.png";
import thunderImage from "@/assets/weather/thunder.png";
import mistImage from "@/assets/weather/mist.png";

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
            {/* Real sun image with glow effect */}
            <div className="absolute top-10 right-10 md:top-16 md:right-20 animate-[pulse_4s_ease-in-out_infinite]">
              <div className="relative">
                <div className="absolute inset-0 w-40 h-40 md:w-56 md:h-56 bg-yellow-400/40 rounded-full blur-3xl" />
                <img 
                  src={sunImage} 
                  alt="Sun" 
                  className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl animate-[float_8s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        );

      case "clouds":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multiple real cloud images */}
            <img 
              src={cloudsImage} 
              alt="Clouds" 
              className="absolute top-16 left-[5%] w-48 h-32 md:w-64 md:h-44 object-contain opacity-70 animate-[float_12s_ease-in-out_infinite]"
            />
            <img 
              src={cloudsImage} 
              alt="Clouds" 
              className="absolute top-24 right-[10%] w-40 h-28 md:w-56 md:h-40 object-contain opacity-60 animate-[float_15s_ease-in-out_infinite_2s]"
            />
            <img 
              src={cloudsImage} 
              alt="Clouds" 
              className="absolute bottom-[40%] left-[30%] w-36 h-24 md:w-48 md:h-32 object-contain opacity-50 animate-[float_10s_ease-in-out_infinite_1s]"
            />
          </div>
        );

      case "rain":
      case "drizzle":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Rain cloud image */}
            <img 
              src={rainCloudImage} 
              alt="Rain clouds" 
              className="absolute top-0 left-0 w-full h-64 md:h-80 object-cover opacity-60 animate-[float_20s_ease-in-out_infinite]"
            />
            {/* Animated rain drops */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-300/50 to-transparent rounded-full animate-[rain_1s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 30}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${0.8 + Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "thunderstorm":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Thunder image with lightning */}
            <img 
              src={thunderImage} 
              alt="Thunderstorm" 
              className="absolute top-0 left-0 w-full h-72 md:h-96 object-cover opacity-70"
            />
            {/* Lightning flash effect */}
            <div className="absolute inset-0 bg-white/10 animate-[flash_4s_ease-in-out_infinite]" />
            {/* Heavy rain */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-12 bg-gradient-to-b from-blue-400/60 to-transparent rounded-full animate-[rain_0.6s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 0.6}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "snow":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Snow cloud image */}
            <img 
              src={snowCloudImage} 
              alt="Snow clouds" 
              className="absolute top-0 left-0 w-full h-64 md:h-80 object-cover opacity-70 animate-[float_25s_ease-in-out_infinite]"
            />
            {/* Snowflakes */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/80 rounded-full animate-[snow_4s_linear_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-5%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "mist":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Mist/fog image */}
            <img 
              src={mistImage} 
              alt="Mist" 
              className="absolute bottom-0 left-0 w-full h-full object-cover opacity-50 animate-[float_30s_ease-in-out_infinite]"
            />
            {/* Additional fog layers */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/30 via-white/15 to-transparent animate-pulse" />
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img 
              src={cloudsImage} 
              alt="Clouds" 
              className="absolute top-20 right-[15%] w-40 h-28 object-contain opacity-40 animate-[float_12s_ease-in-out_infinite]"
            />
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 transition-opacity duration-[3000ms] ease-in-out">
      {renderWeatherElements()}
    </div>
  );
};

export default WeatherBackground;