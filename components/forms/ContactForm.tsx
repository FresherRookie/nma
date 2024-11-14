import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be atleast 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

type TContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const onSubmit: SubmitHandler<TContactFormData> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <span>Name *</span>
            <input
              {...register('name')}
              type="text"
              required
              placeholder="Your Name"
            />
          </label>
        </div>
        <div>
          <label>
            <span>email *</span>
            <input
              {...register('email')}
              type="text"
              required
              placeholder="Your email"
            />
          </label>
        </div>
        <div>
          <label>
            <span>Subject (optional)</span>
            <input
              {...register('subject')}
              type="text"
              required
              placeholder="Subject"
            />
          </label>
        </div>
        <div>
          <label>
            <span>Message</span>
            <textarea {...register('message')} required placeholder="Subject" />
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Send
        </button>
        ;
      </form>
    </div>
  );
}
