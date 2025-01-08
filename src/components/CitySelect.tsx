import React from 'react';
import { City } from '@/lib/api/types';

interface CitySelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: City) => void;
  suggestions: City[];
  placeholder: string;
  label?: string;
}

export const CitySelect: React.FC<CitySelectProps> = ({
  id,
  value,
  onChange,
  onSelect,
  suggestions,
  placeholder
}) => {
  console.log('🔍 CitySelect:', {
    id,
    value,
    hasSuggestions: suggestions.length > 0,
    suggestions
  });

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
      />
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((city) => (
            <li
              key={`${city.nom}-${city.gouvernorat}`}
              onClick={() => onSelect(city)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-medium">{city.nom}</div>
              <div className="text-sm text-gray-500">{city.gouvernorat}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 