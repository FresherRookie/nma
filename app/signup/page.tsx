'use client';
import React from 'react';
import { signUpSchema, TSignUpSchema } from '@/schemas/signup';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type SignupFormInputs = z.infer<typeof signUpSchema>;

export default function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'user',
    },
  });
  const onSubmit: SubmitHandler<SignupFormInputs> = async (
    data: SignupFormInputs
  ) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Something went wrong');
      }
      router.push('/signin');
      reset();
    } catch (error: any) {
      console.log('Submission error:', error.message);
      setError('root', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <div className="flex item-center justify-center p-2 my-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label>
            <span>Name</span>
            <input
              {...register('name')}
              type="text"
              required
              placeholder="User Name"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
        </div>
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
        <div>
          <label>
            <span>Confirm Password</span>
            <input
              {...register('confirmPassword')}
              type="password"
              required
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
      {errors && <p>{errors.root?.message}</p>}
    </div>
  );
}
