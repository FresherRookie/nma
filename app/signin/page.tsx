'use client';
import React, { useState } from 'react';
import { signInSchema, TSignInSchema } from '@/schemas/signin';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { signIn } from 'next-auth/react';

type SigninFormInputs = z.infer<typeof signInSchema>;

export default function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const [signInError, setSignInError] = useState<string | null>(null);
  const onSubmit: SubmitHandler<SigninFormInputs> = async (
    data: SigninFormInputs
  ) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
      console.log(result);
      if (result?.error) {
        console.log(result.error);
        setSignInError(result.error);
      } else {
        router.push(result?.url || '/');
      }
    } catch (error: any) {
      console.log('Submission error:', error.message);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col item-center justify-center p-2 my-4 ">
      {signInError && <div className="mb-4 text-red-500">{signInError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label>
            <span>email</span>
            <input
              {...register('email')}
              type="text"
              required
              placeholder="Your email"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
        </div>
        <div>
          <label>
            <span>Password </span>
            <input
              {...register('password')}
              type="password"
              required
              placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signin in...' : 'Sign In'}
        </button>
      </form>
      {errors && <p>{errors.root?.message}</p>}
    </div>
  );
}
