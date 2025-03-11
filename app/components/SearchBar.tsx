'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { byIso } from 'country-code-lookup';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

interface CitySuggestion {
  name: string;
  country: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  useEffect(() => {
    if (city.trim()) {
      fetchCitySuggestions(city.trim());
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const fetchCitySuggestions = async (query: string) => {
    try {
      const response = await axios.get(
         `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
      );
      const formattedSuggestions = response.data.map((item: any) => {
        const countryInfo = byIso(item.country); // Convierte "AR" a "Argentina"
        return {
          name: item.name,
          country: countryInfo ? countryInfo.country : item.country, // "Argentina"
        };
      });
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleSuggestionClick = (suggestion: CitySuggestion) => {
    setCity(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]);
    onSearch(`${suggestion.name}, ${suggestion.country}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="default">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}, {suggestion.country} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}