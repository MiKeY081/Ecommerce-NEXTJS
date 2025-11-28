"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/api';
import { toast } from 'sonner';

interface Props {
  product: Product;
}

export const ProductDetailActions = ({ product }: Props) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    try {
      toast.success(`${product.title} added to cart!`);
    } catch {
      // toast may be a stub in some environments — ignore
    }
  };

  return (
    <div className="mt-4 flex items-center gap-4">
      <Button onClick={handleAdd} className="bg-gradient-to-r from-primary to-accent">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductDetailActions;
