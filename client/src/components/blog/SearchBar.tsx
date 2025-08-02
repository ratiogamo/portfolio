import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  value, 
  placeholder = "Search articles...",
  className = ""
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localValue.trim());
  };

  const handleClear = () => {
    setLocalValue('');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${className}`}>
      <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}>
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-4 h-4" />
        </div>

        {/* Input Field */}
        <Input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-20 py-2 w-full border-gray-300 focus:border-primary focus:ring-primary"
        />

        {/* Clear Button */}
        {localValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="w-3 h-3" />
          </Button>
        )}

        {/* Search Button */}
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3"
        >
          <Search className="w-3 h-3" />
        </Button>
      </div>

      {/* Search Suggestions/Help Text */}
      {isFocused && !localValue && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-3">
          <div className="text-sm text-gray-600">
            <div className="font-medium mb-2">Search tips:</div>
            <ul className="space-y-1 text-xs">
              <li>• Search by title, content, or tags</li>
              <li>• Use quotes for exact phrases</li>
              <li>• Try keywords like "automation", "legal", "AI"</li>
            </ul>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;