import { Cloud } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { weather, isLoading, fetchWeather, fetchWeatherByCoords } = useWeather();
  const { toast } = useToast();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        toast({
          title: "Error",
          description: "Unable to get your location",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Weather App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-2xl space-y-8">
          {/* Search Section */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">
              Check the Weather
            </h2>
            <p className="text-muted-foreground text-center mb-4">
              Search for any city to get current weather conditions
            </p>
            <SearchBar
              onSearch={fetchWeather}
              onGetLocation={handleGetLocation}
              isLoading={isLoading}
            />
          </div>

          {/* Weather Display */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {!isLoading && weather && <WeatherCard weather={weather} />}

          {!isLoading && !weather && (
            <div className="text-center py-12">
              <Cloud className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Search for a city or use your location to see weather
              </p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Try: London, Tokyo, New York, Paris, Sydney
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by OpenWeatherMap API
        </p>
      </footer>
    </div>
  );
};

export default Index;
