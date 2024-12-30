import { NextResponse } from 'next/server';
import { config } from '@/app/config/env';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Get current weather
    const currentRes = await fetch(
      `${config.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${config.openWeatherApiKey}&units=metric`
    );

    if (!currentRes.ok) {
      const errorData = await currentRes.json();
      console.error('OpenWeather API error:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch weather data' },
        { status: currentRes.status }
      );
    }

    const currentData = await currentRes.json();

    // Get forecast
    const forecastRes = await fetch(
      `${config.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${config.openWeatherApiKey}&units=metric`
    );

    if (!forecastRes.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const forecastData = await forecastRes.json();

    const weatherData = {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
      },
      current: {
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        weather: {
          main: currentData.weather[0].main,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
        },
      },
      forecast: forecastData.list
        .filter((_: any, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((day: any) => ({
          dt: day.dt,
          temp: {
            min: day.main.temp_min,
            max: day.main.temp_max,
          },
          weather: {
            main: day.weather[0].main,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
          },
        })),
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
