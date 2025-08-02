import { BlogCategory } from '../../lib/blogUtils';
import { Button } from '../ui/button';

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
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;