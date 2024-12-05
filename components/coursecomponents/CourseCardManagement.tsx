import React from 'react';
import { CiEdit } from 'react-icons/ci';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { BackgroundGradient } from '../ui/BackgroundGradient';

type CardProps = {
  name: string;
  description: string;
  instrument: { _id: string; name: string; description: string };
  createdDate: string;
  sessionsPerWeek: number;
  grade: string;
  id: string;
  backgroundColor: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({
  name,
  instrument,
  description,
  createdDate,
  sessionsPerWeek,
  grade,

  backgroundColor,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="max-w-md rounded-lg overflow-hidden  m-4">
      <BackgroundGradient backgroundColor={backgroundColor}>
        <div className="p-6  rounded-lg relative">
          <h2 className="font-bold text-2xl mb-3 text-center text-indigo-600">
            {name}
          </h2>
          <p className="text-gray-700 text-center mb-4 italic">
            {instrument.name}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Description:</span> {description}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Sessions per week:</span>
            {sessionsPerWeek}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Grades:</span> {grade}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            <span className="font-semibold">Created on:</span>
            {new Date(createdDate).toLocaleDateString()}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={onEdit}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <CiEdit className="mr-1" /> Edit
            </button>

            <button
              onClick={onDelete}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <RiDeleteBin6Line className="mr-1" /> Delete
            </button>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default Card;
