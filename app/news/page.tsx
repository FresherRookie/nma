'use client';
import { formatDate } from '@/helpers/helpers';
import React, { useEffect, useState } from 'react';
import NewsCard from '@/components/newscomponents/NewsCard';
type NewsPosts = {
  _id: string;
  title: string;
  content: string;
  userId: string;
  createdDate: string;
  imgUrl: string;
};

export default function News() {
  const [posts, setPosts] = useState<NewsPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/getNewsPosts');
        const result = await response.json();
        setPosts(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching News posts', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <h1>News</h1>
      {posts.map((post) => (
        <NewsCard
          key={post._id}
          title={post.title}
          content={post.content}
          createdDate={formatDate(post.createdDate)}
          imgUrl={post.imgUrl}
        />
      ))}
    </div>
  );
}
