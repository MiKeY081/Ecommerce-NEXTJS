const BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const searchProducts = async (
  query: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};

export const fetchProductsByCategory = async (
  category: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};
