import Link from 'next/link';
import React from 'react';

import { MdArrowOutward, MdOutlineFormatAlignLeft } from 'react-icons/md';

import { BackgroundGradient } from '../ui/BackgroundGradient';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';

type CardProps = {
  name: string;
  description: string;
  instrument: { _id: string; name: string; description: string };
  createdDate: string;
  sessionsPerWeek: number;
  grade: string;

  backgroundColor: string;
};

const CourseCardVisitor: React.FC<CardProps> = ({
  name,
  instrument,
  description,
  createdDate,
  sessionsPerWeek,
  grade,

  backgroundColor,
}) => {
  return (
    <div className="max-w-md rounded-lg overflow-hidden m-4">
      <BackgroundGradient backgroundColor={backgroundColor}>
        <div className="p-6 rounded-lg relative">
          <h2 className="font-bold text-2xl mb-3 text-center text-ellipsis text-indigo-600">
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
          <Link href="/admission/apply">
            <span className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Apply for Course <MdArrowOutward className="ml-1" />
            </span>
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default CourseCardVisitor;
