"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { Product, fetchProducts, searchProducts, fetchProductsByCategory } from '@/lib/api';
import { SortOption } from './SortDropdown';

interface ProductGridProps {
  searchQuery: string;
  category: string;
  sortBy: SortOption;
}

export const ProductGrid = ({ searchQuery, category, sortBy }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement>(null);

  const LIMIT = 20;

  const sortProducts = (products: Product[]): Product[] => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const loadProducts = async (reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true);
        setSkip(0);
      } else {
        setLoadingMore(true);
      }

      const currentSkip = reset ? 0 : skip;
      let data;

      if (searchQuery) {
        data = await searchProducts(searchQuery, LIMIT, currentSkip);
      } else if (category && category !== 'all') {
        data = await fetchProductsByCategory(category, LIMIT, currentSkip);
      } else {
        data = await fetchProducts(LIMIT, currentSkip);
      }

      const newProducts = reset ? data.products : [...products, ...data.products];
      setProducts(sortProducts(newProducts));
      setHasMore(currentSkip + LIMIT < data.total);
      setSkip(currentSkip + LIMIT);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, [searchQuery, category]);

  useEffect(() => {
    if (products.length > 0) {
      setProducts(sortProducts(products));
    }
  }, [sortBy]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        loadProducts(false);
      }
    },
    [hasMore, loadingMore, loading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);

    if (lastProductRef.current) {
      observerRef.current.observe(lastProductRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {hasMore && (
        <div ref={lastProductRef} className="mt-8 flex justify-center">
          {loadingMore && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
