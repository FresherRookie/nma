import Image from 'next/image';
import React from 'react';
import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function AboutIntro() {
  return (
    <div
      className={`flex flex-col justify-center items-center relative ${playfair.className}`}
    >
      <div className="w-full h-[90vh] relative">
        <Image
          src="/piano_rose.jpg"
          alt="violin"
          fill
          className="object-cover"
        />
        <div className="absolute font-light bg-gray-900 bg-opacity-50  w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1
              className="text-white-ivory  text-3xl sm:text-4xl lg:text-5xl font-semibold
             pb-2"
            >
              North Music Academy
            </h1>
            <h3 className="mt-2 ml-3 text-white-ivory text-xl tracking-tighter sm:tracking-wide">
              Cultivating Musical Excellence Across Cultures
            </h3>
            <div className="mt-20 mb-2 w-[80vw] sm:w-[50vw] flex flex-col items-center justify-center">
              <p className="tracking-wide text-xl text-white">
                Welcome to{' '}
                <span className="text-white font-bold">
                  North Music Academy
                </span>{' '}
                , where the harmonious blend of Western modern music and the
                rich, cultural heritage of traditional North Eastern music come
                together. Our dedicated faculty and vibrant community are
                passionate about nurturing talent and fostering creativity in
                our students. We strive to provide a holistic musical education
                that respects tradition while embracing innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
