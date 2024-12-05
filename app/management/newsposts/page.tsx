'use client';
import { useSession } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import Modal from '@/components/Modal';
import NewsPostForm from '@/components/forms/NewsPostForm';
import { formatDate } from '@/helpers/helpers';
import { toast } from 'react-toastify';
import Card from '@/components/ui/NewsPostCard';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';

const newsSubmissionSchema = z.object({
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
type TnewsSubmissionSchema = z.infer<typeof newsSubmissionSchema>;

type NewsPosts = {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdDate: string;
  imgUrl: string;
};

export default function Newsposts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<NewsPosts[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPosts | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/getNewsPosts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch news posts', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };
  const { data: session } = useSession();

  const handleEditClick = (post: NewsPosts) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleFormSubmit: SubmitHandler<TnewsSubmissionSchema> = async (
    data
  ) => {
    if (!session || !session.user) {
      console.error('User is not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image);
    }
    formData.append('userId', data.userId);
    formData.append(
      'createdDate',
      selectedPost ? selectedPost.createdDate : data.createdDate.toISOString()
    );
    if (selectedPost) {
      formData.append('id', selectedPost._id);
    }

    try {
      console.log('Submitting form data to API...');
      let response;
      if (selectedPost) {
        response = await fetch(`/api/uploads`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('/api/uploads', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submission successful:', result);
      toast.success('News post saved successfully');
      closeModal();
      fetchPosts();
      // Navigate to a different page or show a success message if needed
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to Submit Form');
    }
  };
  const handleDeleteClick = async (postId: string) => {
    try {
      const response = await fetch(`/api/uploads?id=${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      toast.success('News post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">News Posts</h1>
        <button
          onClick={openModal}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Add New Post
        </button>
      </div>
      <div>
        {posts.map((post) => (
          <Card
            key={post._id}
            title={post.title}
            content={post.content}
            imgUrl={post.imgUrl}
            createdDate={formatDate(post.createdDate)}
            onEdit={() => handleEditClick(post)}
            onDelete={() => handleDeleteClick(post._id)}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NewsPostForm
            onSubmit={handleFormSubmit}
            initialData={
              selectedPost ? { ...selectedPost, createdDate: new Date() } : null
            }
          />
        </Modal>
      )}
    </div>
  );
}
