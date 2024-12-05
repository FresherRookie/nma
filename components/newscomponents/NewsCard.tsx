import React from 'react';

type CardProps = {
  title: string;
  content: string;
  imgUrl: string;
  createdDate: string;
};

const Card: React.FC<CardProps> = ({ title, content, imgUrl, createdDate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 md:w-[60vw] md:h-auto max-w-[80vw]">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <img
        className="w-full h-auto object-cover rounded-md"
        src={imgUrl}
        alt={title}
      />
      <div className="p-4">
        <p className="text-gray-700 text-base mb-4">{content}</p>
        <p className="text-gray-500 text-sm">
          Posted on: {new Date(createdDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Card;
