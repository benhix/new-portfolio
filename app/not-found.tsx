'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to home page
    router.replace('/');
  }, [router]);

  // Return null or minimal content since redirect happens immediately
  return null;
} 