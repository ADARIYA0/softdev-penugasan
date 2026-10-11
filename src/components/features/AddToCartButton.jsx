'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AddToCartButton({ product, className = '' }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`w-full ${className}`}
      disabled={isAdded}
    >
      {isAdded ? '✓ Ditambahkan' : 'Tambah ke Keranjang'}
    </Button>
  );
}
