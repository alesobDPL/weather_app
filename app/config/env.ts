export const config = {
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  baseUrl: 'https://api.openweathermap.org/data/2.5'
} as const;

// Validation
if (!config.openWeatherApiKey) {
  throw new Error('OPENWEATHER_API_KEY is not defined in environment variables');
}