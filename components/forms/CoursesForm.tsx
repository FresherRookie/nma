'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChromePicker } from 'react-color';

import { useEffect, useState } from 'react';

import { z } from 'zod';
import { useSession } from 'next-auth/react';
const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  createdDate: z.date(),
  instrument: z.string().min(1, 'Instrument is required'),
  sessionsPerWeek: z.preprocess(
    (value) => Number(value),
    z.number().min(1, 'At least 1 session per week is required')
  ),
  grade: z.string().min(1, 'Grade is required'),
  description: z.string().optional(),
  userId: z.string().min(1, 'Creator ID is required'),
  backgroundColor: z.string().optional(),
});
export type TCourseData = z.infer<typeof courseSchema>;
type courseFormProps = {
  onSubmit: SubmitHandler<TCourseData>;
  initialData?: TCourseData | null;
};

type Instrument = {
  _id: string;
  name: string;
};
export default function CourseForm({ onSubmit, initialData }: courseFormProps) {
  const { data: session } = useSession();
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  const {
    register,
    handleSubmit,
    watch,

    setValue,

    formState: { errors, isSubmitting },
  } = useForm<TCourseData>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      name: '',
      createdDate: new Date(),
      instrument: '',
      sessionsPerWeek: 1,
      grade: '',
      description: '',
      userId: '',
      backgroundColor: '#ffffff',
    },
  });
  const backgroundColor = watch('backgroundColor', '#ffffff');
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await fetch('/api/instruments');
        const data = await response.json();
        setInstruments(data);
      } catch (error) {
        console.error('Failed to fetch instruments', error);
      }
    };
    fetchInstruments();
  }, []);
  useEffect(() => {
    if (session?.user) {
      setValue('userId', session.user.id);
      if (!initialData) {
        setValue('createdDate', new Date());
      }
    }
  }, [session, setValue, initialData]);

  const handleFormSubmit: SubmitHandler<TCourseData> = (data) => {
    console.log('Passing for to Parent Component', data);
    onSubmit(data); // Pass the data to the parent's onSubmit handler
  };

  const renderErrorMessage = (error: any) => {
    if (error && typeof error.message === 'string') {
      return <span>{error.message}</span>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Course Name
        </label>
        <input
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instrument
        </label>{' '}
        <select
          {...register('instrument')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {instruments.map((instrument) => (
            <option key={instrument._id} value={instrument._id}>
              {instrument.name}
            </option>
          ))}
        </select>
        {errors.instrument && (
          <span className="text-red-500 text-sm">
            {errors.instrument.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sessions Per Week
        </label>
        <select
          {...register('sessionsPerWeek')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="1">1</option> <option value="2">2</option>
        </select>
        {errors.sessionsPerWeek && (
          <span className="text-red-500 text-sm">
            {errors.sessionsPerWeek.message}
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          {...register('grade')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.grade && (
          <span className="text-red-500 text-sm">{errors.grade.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Background Color
        </label>
        <ChromePicker
          color={backgroundColor}
          onChangeComplete={(color) => setValue('backgroundColor', color.hex)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Course' : 'Add Course'}
      </button>
    </form>
  );
}
