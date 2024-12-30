'use client';

import { useEffect, useState } from 'react';
import { WeatherData } from './types/weather';
import SearchBar from '@/app/components/SearchBar';
import WeatherCard from '@/app/components/WeatherCard';
import ForecastList from '@/app/components/ForecastList';
import SidebarCities from '@/app/components/sidebarCities';
import { useToast } from '@/hooks/use-toast';
import { CloudRain } from 'lucide-react';

interface CityWeather {
  city: string;
  data: WeatherData | null;
  loading: boolean;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [sidebarCities, setSidebarCities] = useState<CityWeather[]>([
    { city: 'Concepción', data: null, loading: true },
    { city: 'Rio de Janeiro', data: null, loading: true },
    { city: 'Tokyo', data: null, loading: true },
    { city: 'Sydney', data: null, loading: true },
  ]);

  useEffect(() => {
    sidebarCities.forEach(async (city, index) => {
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(city.city)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch weather data');
        }

        setSidebarCities((prev) =>
          prev.map((item, idx) =>
            idx === index ? { ...item, data, loading: false } : item
          )
        );
      } catch (error) {
        console.error(`Error fetching weather for ${city.city}:`, error);
        toast({
          title: 'Error',
          description: `Failed to fetch weather for ${city.city}`,
          variant: 'destructive',
        });
        setSidebarCities((prev) =>
          prev.map((item, idx) =>
            idx === index ? { ...item, loading: false } : item
          )
        );
      }
    });
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to fetch weather data',
        variant: 'destructive',
      });
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 py-8 px-4 flex">
      {/* Sidebar Component */}
      <SidebarCities cities={sidebarCities} />

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center mb-8">
            <CloudRain className="w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Weather Forecast
            </h1>
          </div>

          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="mt-8 text-gray-600 dark:text-gray-300">Loading...</div>
          )}

          {weatherData && !loading && (
            <div className="mt-8 w-full flex flex-col items-center">
              <WeatherCard data={weatherData} />
              <ForecastList forecast={weatherData.forecast} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
