import Image from 'next/image';
import React from 'react';

export default function AboutTeam() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/womanpiano.jpg"
              alt="Team Member Name"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">K.C. Angami</h3>
            <p className="text-gray-600">
              Intermediate and Advanced Piano Teacher
            </p>
          </div>
        </div>
        <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/handsguitar.jpg"
              alt="Team Member Name"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">John</h3>
            <p className="text-gray-600">
              Intermediate and Advanced Guitar Teacher
            </p>
          </div>
        </div>
        <div className="team-member bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="/womanviolin.jpg"
              alt="Team Member Name"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Grace</h3>
            <p className="text-gray-600">
              Intermediate and Advanced Violin Teacher
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
