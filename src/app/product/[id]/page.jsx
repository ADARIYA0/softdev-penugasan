import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/features/AddToCartButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    const text = await res.text();
    
    if (!text) {
      return null;
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetail({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="inline-block mb-6">
        <Button variant="outline" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>Kembali</span>
        </Button>
      </Link>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-slate-50 rounded-lg p-8">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-4">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-sm font-medium text-slate-900">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              ({product.rating.count} ulasan)
            </span>
          </div>

          <p className="text-4xl font-bold text-slate-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Deskripsi Produk
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <AddToCartButton product={product} className="w-full md:w-auto" />
        </div>
      </div>
    </div>
  );
}
