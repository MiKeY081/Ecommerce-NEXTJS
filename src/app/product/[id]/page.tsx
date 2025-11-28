import { Metadata } from 'next';
import { fetchProductById } from '@/lib/api';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ProductDetailActions from '@/components/ProductDetailActions';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const id = Number(p.id);
  try {
    const product = await fetchProductById(id);
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductPage({ params }: Props) {
  const p = await params;
  const id = Number(p.id);

  if (Number.isNaN(id)) {
    return (
      <div className="container mx-auto px-4 py-8">Invalid product id</div>
    );
  }

  let product;
  try {
    product = await fetchProductById(id);
  } catch (err) {
    return (
      <div className="container mx-auto px-4 py-8">Product not found</div>
    );
  }

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-md bg-card p-4">
              <img src={product.thumbnail} alt={product.title} className="w-full rounded-md object-cover" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-muted-foreground mt-2">{product.category}</p>
              <div className="mt-4 text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
              <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
