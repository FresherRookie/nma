'use client';
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';

type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>();

  const [status, setStatus] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async ({
    password,
    confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      setStatus('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      setStatus(data.message);
      toast.success(data.message);

      if (response.status === 200) {
        router.push('/auth/signin');
        toast.success('redirecting to signin');
      }
    } catch (error) {
      setStatus('Failed to reset password');
      toast.error('Failed to reset password');
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
            <span>New Password</span>
            <input
              {...register('password')}
              type="password"
              required
              placeholder="New password"
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
              placeholder="Confirm password"
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
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordContent />
    </Suspense>
  );
};
export default ResetPasswordPage;
