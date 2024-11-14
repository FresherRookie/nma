// components/ContactForm.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, TContactFormData } from '@/schemas/contactForm';
import { TiTick } from 'react-icons/ti';

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState<boolean>(false);
  const onSubmit: SubmitHandler<TContactFormData> = async (
    data: TContactFormData
  ) => {
    console.log(data);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    if (!response.ok) {
      alert('Form submission failed');
      return;
    }
    if (responseData.errors) {
      const errors = responseData.console.errors;
      if (errors.email) {
        setError('email', { type: 'server', message: errors.email });
      } else if (errors.name) {
        setError('name', { type: 'server', message: errors.name });
      } else if (errors.message) {
        setError('message', { type: 'server', message: errors.message });
      } else if (errors.subject) {
        setError('subject', { type: 'server', message: errors.subject });
      } else {
        alert('Something went wrong!');
      }
    }
    setServerMessage(responseData.message);
    setMessageClass(true);
    setTimeout(() => {
      setMessageClass(false);
    }, 5000);
    console.log(serverMessage);

    reset();
  };

  useEffect(() => {
    if (!messageClass) {
      const timer = setTimeout(() => {
        setServerMessage(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [messageClass]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-[90vw] sm:w-[30vw] h-auto"
    >
      <div>
        <label className="block">
          <span className="text-gray-900">Name</span>
          <input
            {...register('name')}
            type="text"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-brown-LightSalmon focus:border-brown sm:text-sm`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>
      </div>

      <div>
        <label className="block">
          <span className="text-gray-900">Email</span>
          <input
            {...register('email')}
            type="email"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-brown-LightSalmon focus:border-brown  sm:text-sm`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
      </div>

      <div>
        <label className="block">
          <span className="text-gray-900">Subject</span>
          <input
            {...register('subject')}
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-LightSalmon focus:border-brown  sm:text-sm"
          />
        </label>
      </div>

      <div className="block">
        <label className="block">
          <span className="text-gray-900">Message</span>
          <textarea
            {...register('message')}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-brown-LightSalmon focus:border-brown  sm:text-sm`}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </label>
      </div>

      <div className="flex flex-start justify-start gap-3">
        <button
          type="submit"
          className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium ${
            isSubmitting ? 'text-slate-500 cursor-wait' : 'text-white'
          } transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 `}
          disabled={isSubmitting}
        >
          Send
        </button>
        {serverMessage !== null && (
          <span
            className={`text-black bg-green-500 bg-opacity-50 p-3 rounded-lg flex flex-row gap-2 transition-opacity ease-in-out duration-500 items-center ${
              messageClass ? 'opacity-1' : 'opacity-0'
            }`}
          >
            {serverMessage} <TiTick className="text-green-800 text-2xl" />
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
