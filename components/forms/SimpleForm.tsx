import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';

type FormData = {
  title: string;
  content: string;
  image: FileList;
};

export default function SimpleForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<FormData>;
}) {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const image = watch('image');

  useEffect(() => {
    if (image && image.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image[0]);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submit Triggered', data);
    onSubmit(data); // Pass the data to the parent's onSubmit handler
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Title</label>
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Title"
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          {...register('content', { required: true })}
          placeholder="Content"
        ></textarea>
      </div>
      <div>
        <label>Image</label>
        <input type="file" {...register('image')} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-full h-auto"
          />
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
