'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NoAccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
      <p className="text-gray-700 mb-8">
        You do not have permission to view this page.
      </p>
      <button
        onClick={() => router.push('/auth/signin')}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Sign In
      </button>
    </div>
  );
};

export default NoAccess;
