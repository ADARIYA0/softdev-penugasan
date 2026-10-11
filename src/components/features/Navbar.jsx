'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { getTotalQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = getTotalQuantity();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors whitespace-nowrap">
              SimpleStore
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <SearchBar />
            </div>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Keranjang belanja"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {isMounted && totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 min-w-[20px] h-5">
                  {totalItems}
                </Badge>
              )}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
