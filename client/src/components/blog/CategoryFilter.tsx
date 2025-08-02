import { BlogCategory } from '../../lib/blogUtils';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showAsButtons?: boolean;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  showAsButtons = false 
}: CategoryFilterProps) => {
  
  if (showAsButtons) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('')}
          className="flex items-center gap-2"
        >
          <i className="fas fa-th-large"></i>
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.slug)}
            className="flex items-center gap-2"
          >
            <i className={`fas fa-${category.icon} ${category.iconColor}`}></i>
            {category.name}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full sm:w-auto min-w-[200px]">
      <Select
        value={selectedCategory}
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">
            <div className="flex items-center gap-2">
              <i className="fas fa-th-large text-gray-500"></i>
              <span>All Categories</span>
            </div>
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              <div className="flex items-center gap-2">
                <i className={`fas fa-${category.icon} ${category.iconColor}`}></i>
                <span>{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;