'use client';

import { WeatherData } from '../types/weather';
import { Card } from '@/components/ui/card';

interface ForecastListProps {
  forecast: WeatherData['forecast'];
}

export default function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-4xl mt-6">
      {forecast.map((day) => (
        <Card
          key={day.dt}
          className="p-4 bg-white dark:bg-gray-800 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(day.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
            })}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
            alt={day.weather.description}
            className="w-12 h-12 mx-auto"
          />
          <div className="mt-2">
            <p className="text-sm font-semibold">
              {Math.round(day.temp.max)}°C
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                {Math.round(day.temp.min)}°C
              </span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 capitalize">
              {day.weather.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}