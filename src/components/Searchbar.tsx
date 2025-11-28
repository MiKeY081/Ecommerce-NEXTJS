"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SearchbarProps {
  onSearch: (query: string) => void;
}

export const Searchbar = ({ onSearch }: SearchbarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-8">
      <input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-md border border-border bg-input px-3 py-2"
      />
      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
        Search
      </Button>
    </form>
  );
};
