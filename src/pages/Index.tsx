import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SortDropdown, SortOption } from '@/components/SortDropdown';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header onCartClick={() => setCartOpen(true)} />

          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Discover Amazing Products
              </h2>
              <p className="text-muted-foreground">
                Browse our collection of quality products at great prices
              </p>
            </motion.div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SearchBar onSearch={setSearchQuery} />
              <div className="flex flex-wrap gap-2">
                <CategoryFilter onCategoryChange={setCategory} />
                <SortDropdown onSortChange={setSortBy} />
              </div>
            </div>

            <ProductGrid
              searchQuery={searchQuery}
              category={category}
              sortBy={sortBy}
            />
          </main>

          <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default Index;
