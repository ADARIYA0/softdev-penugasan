import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <Link href={`/product/${product.id}`} className="block cursor-pointer">
        <div className="relative w-full aspect-square p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority={false}
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 p-4 pt-0">
        <Link href={`/product/${product.id}`} className="hover:text-slate-700 cursor-pointer">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <AddToCartButton product={product} className="mt-4" />
      </div>
    </Card>
  );
}
