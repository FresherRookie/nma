'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-700 mb-8">
        Sorry, the page you are looking for does not exist or is under
        development.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
