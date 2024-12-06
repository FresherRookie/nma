'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ForgotPasswordInputs = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>();

  const [status, setStatus] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async ({ email }) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Failed to send reset password email');
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col item-center justify-center p-2 my-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label>
            <span>Email</span>
            <input
              {...register('email')}
              type="text"
              required
              placeholder="Your email"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Send reset password link'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
