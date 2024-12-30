import React from 'react';
import { WeatherData } from '../types/weather';

interface CityWeather {
  city: string;
  data: WeatherData | null;
  loading: boolean;
}

interface SidebarCitiesProps {
  cities: CityWeather[];
}

const SidebarCities: React.FC<SidebarCitiesProps> = ({ cities }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mr-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Weather Highlights
      </h2>
      {cities.map((cityWeather) => (
        <div
          key={cityWeather.city}
          className="mb-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg"
        >
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
            {cityWeather.city}
          </h3>
          {cityWeather.loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : cityWeather.data ? (
            <div>
              <p className="text-sm"> Temp: {cityWeather.data.current.temp.toFixed(1)}°C</p>
              <p className="text-sm">
                Weather: {cityWeather.data.current.weather.description}
              </p>
              <p className="text-sm">
                Humidity: {cityWeather.data.current.humidity}%
              </p>
            </div>
          ) : (
            <p className="text-sm text-red-500">Error fetching data</p>
          )}
        </div>
      ))}
    </aside>
  );
};

export default SidebarCities;
