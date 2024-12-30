export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  };
  forecast: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    };
  }>;
}

export interface WeatherAlert {
  type: 'temperature' | 'storm' | 'wind';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: number;
}