"use client";

import { Button } from '@/components/ui/button';

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
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange(cat)}
        >
          {cat === 'all' ? 'All' : cat}
        </Button>
      ))}
    </div>
  );
};
