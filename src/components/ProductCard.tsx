"use client";

import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="group overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute right-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="line-clamp-1 font-semibold text-card-foreground">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground capitalize">
              {product.category}
            </p>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">
              ({product.stock} in stock)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-xs text-muted-foreground line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </div>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
