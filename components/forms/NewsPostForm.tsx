import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useState, useEffect } from 'react';

import { z } from 'zod';
import { useSession } from 'next-auth/react';
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  createdDate: z.date(),
  userId: z.string().min(1, 'Creator ID is required'),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Max image size is 5MB')
    .optional(),
  imgUrl: z.string().optional(),
});
export type TnewsData = z.infer<typeof newsSchema>;
type NewsPostFormProps = {
  onSubmit: SubmitHandler<TnewsData>;
  initialData?: TnewsData | null;
};

export default function NewsPostForm({
  onSubmit,
  initialData,
}: NewsPostFormProps) {
  const { data: session } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TnewsData>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      createdDate: new Date(),
      userId: '',
      image: undefined,
      imgUrl: '',
    },
  });
  useEffect(() => {
    if (session?.user) {
      setValue('userId', session.user.id);
      if (!initialData) {
        setValue('createdDate', new Date());
      }
    }
  }, [session, setValue, initialData]);

  const image = watch('image');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(initialData?.imgUrl || null);
    }
  }, [image, initialData]);

  const validateImage = (file: File) => {
    if (file) {
      return true;
    } else {
      setError('image', { type: 'manual', message: 'Image is required' });
      return false;
    }
  };

  const handleFormSubmit: SubmitHandler<TnewsData> = (data) => {
    if (!data.image && !data.imgUrl) {
      setError('image', { type: 'manual', message: 'Image is required' });
      return;
    }

    // data.createdDate = new Date();
    // data.userId = '12345';

    onSubmit(data); // Pass the data to the parent's onSubmit handler
  };

  const renderErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      if (error && typeof error.message === 'string') {
        return <span>{error.message}</span>;
      }
      return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 justify-center"
    >
      <div>
        <label className="flex flex-row items-center gap-2">
          <span>Title</span>
          <input
            {...register('title', { required: true })}
            type="text"
            placeholder="Title"
          />
          {errors.title && <span>{errors.title?.message}</span>}
        </label>
      </div>
      <div>
        <label className="flex flex-row items-center gap-2 w-full">
          <span>Content</span>
          <textarea
            {...register('content', { required: true })}
            placeholder="News Content"
          />
          {errors.content && <span>{errors.content?.message}</span>}
        </label>
      </div>
      <div>
        <label className="flex flex-row items-center gap-2 w-full">
          <span>Image</span>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    field.onChange(e.target.files[0]);
                    validateImage(e.target.files[0]);
                  } else {
                    setError('image', {
                      type: 'manual',
                      message: 'Image is required',
                    });
                  }
                }}
                accept="image/*"
              />
            )}
          />
          {renderErrorMessage(errors.image)}
        </label>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          {isSubmitting ? 'Creating Post...' : 'Submit'}
        </button>
      </div>
      {errors && <p>{errors.root?.message}</p>}
    </form>
  );
}
