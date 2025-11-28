import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

interface SortDropdownProps {
  onSortChange: (sort: SortOption) => void;
}

export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Select onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};
