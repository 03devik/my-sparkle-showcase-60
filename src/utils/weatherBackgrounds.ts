// Weather condition to background gradient mapping
// Uses CSS gradients that match the weather mood

export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'default';

export const getWeatherCondition = (description: string, icon: string): WeatherCondition => {
  const desc = description.toLowerCase();
  const isNight = icon.endsWith('n');
  
  if (desc.includes('thunder') || desc.includes('storm')) return 'thunderstorm';
  if (desc.includes('snow') || desc.includes('sleet')) return 'snow';
  if (desc.includes('rain') || desc.includes('shower')) return 'rain';
  if (desc.includes('drizzle')) return 'drizzle';
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return 'mist';
  if (desc.includes('cloud') || desc.includes('overcast')) return 'clouds';
  if (desc.includes('clear') || desc.includes('sunny')) return 'clear';
  
  // Fallback based on icon code
  if (icon.startsWith('01')) return 'clear';
  if (icon.startsWith('02') || icon.startsWith('03') || icon.startsWith('04')) return 'clouds';
  if (icon.startsWith('09')) return 'drizzle';
  if (icon.startsWith('10')) return 'rain';
  if (icon.startsWith('11')) return 'thunderstorm';
  if (icon.startsWith('13')) return 'snow';
  if (icon.startsWith('50')) return 'mist';
  
  return 'default';
};

export const weatherBackgrounds: Record<WeatherCondition, { gradient: string; overlay: string }> = {
  clear: {
    gradient: 'linear-gradient(180deg, #1e90ff 0%, #87ceeb 30%, #ffd700 80%, #ff8c00 100%)',
    overlay: 'rgba(0, 0, 0, 0.2)',
  },
  clouds: {
    gradient: 'linear-gradient(180deg, #4a5568 0%, #718096 40%, #a0aec0 80%, #cbd5e0 100%)',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },
  rain: {
    gradient: 'linear-gradient(180deg, #2d3748 0%, #4a5568 30%, #5a6b7c 60%, #718096 100%)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  drizzle: {
    gradient: 'linear-gradient(180deg, #4a5568 0%, #667eea 40%, #764ba2 80%, #a0aec0 100%)',
    overlay: 'rgba(0, 0, 0, 0.35)',
  },
  thunderstorm: {
    gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  snow: {
    gradient: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e0 30%, #a0aec0 60%, #718096 100%)',
    overlay: 'rgba(0, 0, 0, 0.15)',
  },
  mist: {
    gradient: 'linear-gradient(180deg, #718096 0%, #a0aec0 40%, #cbd5e0 80%, #e2e8f0 100%)',
    overlay: 'rgba(0, 0, 0, 0.25)',
  },
  default: {
    gradient: 'linear-gradient(180deg, #2d1b4e 0%, #4a2c6a 30%, #6b4d8a 60%, #8b6ea8 100%)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
};

export const getBackgroundStyle = (description: string, icon: string) => {
  const condition = getWeatherCondition(description, icon);
  const bg = weatherBackgrounds[condition];
  
  return {
    background: bg.gradient,
    overlayColor: bg.overlay,
  };
};
