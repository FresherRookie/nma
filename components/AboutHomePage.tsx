import Image from 'next/image';
import React from 'react';
import { Playfair_Display } from '@next/font/google';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function AboutHomePage() {
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-around mt-4 pt-4">
      <div className=" min-w-[35vw] md:max-w-[35vw] max-w-[90vw] p-6">
        <h1 className="text-4xl mb-4 font-light text-brown">
          About North Music Academy
        </h1>
        <p className="tracking-wide">
          At North Music Academy, we pride ourselves on delivering top-tier
          music education through a professional approach and ongoing
          development. Our commitment has established us as the premier provider
          of music education. We blend innovative, engaging, and fun teaching
          methods to inspire our students and help them reach their full musical
          potential. Our lessons span from beginner to advanced levels, catering
          to children, teens, and adults. Music Academy is the best choice for
          anyone looking to learn music. We have a program suited for every
          need, making us the only professional music academy offering lessons
          to children, adults, and seniors alike.
        </p>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4">
          Classes
        </button>
      </div>
      <div className="relative w-full md:max-w-[40vw] h-screen">
        <Image src="/piano.jpg" fill={true} alt="piano" />

        <div className="bg-white bg-opacity-30 absolute bottom-0 w-full p-4">
          <h1 className="text-brown font-light text-3xl py-2 mb-2">
            Let&lsquo;s Begin
          </h1>
          <h3 className={`${playfair.className} pb-3 font-light`}>
            Explore Courses
          </h3>
          <p>
            Browse our variety of classes to begin you musical and magical
            journey
          </p>
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4">
            Classes
          </button>
        </div>
      </div>
    </div>
  );
}
