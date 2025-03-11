'use client';

import { WeatherData } from '../types/weather';
import { Card } from '@/components/ui/card';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { byIso } from 'country-code-lookup';

interface WeatherCardProps {
  data: WeatherData;
}


const formattedCountryName = (contryCode: string) => {
  const countryInfo  = byIso(contryCode); // Convierte "AR" a "Argentina"
  return countryInfo ? countryInfo.country : contryCode;
  
};



export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full max-w-md p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {data.location.name}, {formattedCountryName(data.location.country)}
        </h2>
        <div className="flex items-center justify-center mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.current.weather.icon}@2x.png`}
            alt={data.current.weather.description}
            className="w-20 h-20"
          />
          <div className="text-5xl font-bold text-gray-800 dark:text-white">
            {Math.round(data.current.temp)}°C
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 capitalize mt-2">
          {data.current.weather.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Thermometer className="w-5 h-5" />
          <span>Feels like: {Math.round(data.current.feels_like)}°C</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Wind className="w-5 h-5" />
          <span>Wind: {data.current.wind_speed} m/s</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Droplets className="w-5 h-5" />
          <span>Humidity: {data.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Cloud className="w-5 h-5" />
          <span>{data.current.weather.main}</span>
        </div>
      </div>
    </Card>
  );
}