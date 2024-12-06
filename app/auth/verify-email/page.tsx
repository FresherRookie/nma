'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/ui/Loading';

const VerificationContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (token) {
          const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();
          setStatus(data.message);
        }
      } catch (error) {
        setStatus('Verification failed');
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendToken = async () => {
    try {
      if (token) {
        const response = await fetch('/api/auth/resend-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to resend token');
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        {status === 'Email has been verified' ? (
          <div>
            <h1 className="text-2xl font-bold text-green-600">
              Email Verified
            </h1>
            <p className="mt-4">
              Your email has been successfully verified. Thank you!
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h1>
            <p className="mt-4">{status}</p>
            <button
              onClick={handleResendToken}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const VerificationPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerificationContent />
    </Suspense>
  );
};

export default VerificationPage;
