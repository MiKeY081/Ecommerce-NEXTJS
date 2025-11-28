"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    'all',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
  ];

  return (
    <div className="flex flex-wrap gap-2">
      <Select onValueChange={(value) => onCategoryChange(value)}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat === 'all' ? 'All' : cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
