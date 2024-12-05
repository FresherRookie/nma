import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';

type CardProps = {
  title: string;
  content: string;
  imgUrl: string;
  createdDate: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  imgUrl,
  createdDate,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 max-w-md">
      <img className="w-full h-48 object-cover" src={imgUrl} alt={title} />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-4">{content}</p>
        <p className="text-gray-500 text-sm">
          Posted on: {new Date(createdDate).toLocaleDateString()}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            <span className="flex flex-row items-center gap-1">
              Edit <CiEdit />
            </span>
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            <span className="flex flex-row items-center gap-1">
              DELETE POST <RiDeleteBin6Line />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
