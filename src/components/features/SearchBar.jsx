'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useState, Suspense } from 'react';

function SearchBarContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  // Initialize search value directly from searchParams
  const initialQuery = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(initialQuery);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    const trimmedValue = searchValue.trim();
    
    if (trimmedValue) {
      params.set('query', trimmedValue);
    } else {
      params.delete('query');
    }
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchValue('');
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    router.push(pathname);
  };

  return (
    <div className="w-full max-w-md">
      <Input
        type="search"
        placeholder="Cari produk... (tekan Enter)"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Cari produk"
      />
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md">
        <Input
          type="search"
          placeholder="Cari produk..."
          disabled
          aria-label="Cari produk"
        />
      </div>
    }>
      <SearchBarContent />
    </Suspense>
  );
}
