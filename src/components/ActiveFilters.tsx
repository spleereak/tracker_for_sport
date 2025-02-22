import React from 'react';
import { X } from 'lucide-react';
import { IFilters } from './Filters';

interface ActiveFiltersProps {
  filters: IFilters;
  onFilterChange: (newFilters: IFilters) => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onFilterChange }) => {
  const hasActiveFilters = filters.difficulty.length > 0 || 
                          filters.equipment.length > 0 || 
                          filters.tags.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  const removeFilter = (type: keyof IFilters, value: string) => {
    const newFilters = {
      ...filters,
      [type]: filters[type].filter((item) => item !== value)
    };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      difficulty: [],
      equipment: [],
      tags: []
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="text-sm text-gray-500 mr-2">Активные фильтры:</div>
      
      {filters.difficulty.map((level) => (
        <span
          key={`difficulty-${level}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
        >
          {level}
          <button
            onClick={() => removeFilter('difficulty', level)}
            className="ml-2 hover:text-gray-900"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      {filters.equipment.map((item) => (
        <span
          key={`equipment-${item}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
        >
          {item}
          <button
            onClick={() => removeFilter('equipment', item)}
            className="ml-2 hover:text-blue-900"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      {filters.tags.map((tag) => (
        <span
          key={`tag-${tag}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
        >
          {tag}
          <button
            onClick={() => removeFilter('tags', tag)}
            className="ml-2 hover:text-gray-900"
          >
            <X size={14} />
          </button>
        </span>
      ))}

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-gray-700 ml-2"
        >
          Очистить все
        </button>
      )}
    </div>
  );
};