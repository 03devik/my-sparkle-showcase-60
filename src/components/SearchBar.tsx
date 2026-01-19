import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onGetLocation, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-card/50 backdrop-blur-sm border-border/50 h-12"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading || !query.trim()} className="h-12 px-6">
        Search
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onGetLocation}
        disabled={isLoading}
        className="h-12 px-4"
        title="Use my location"
      >
        <MapPin className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default SearchBar;
