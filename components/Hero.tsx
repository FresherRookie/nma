import React from 'react';
import { Playfair_Display } from '@next/font/google';
import Link from 'next/link';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function Hero() {
  return (
    <div
      className=" flex flex-row items-center justify-start w-full  bg-cover bg-right h-[60vh]"
      style={{ backgroundImage: 'url("/HeroImage.jpg")' }}
    >
      <div className="absolute p-5 m-10 sm:ml-20 bg-white-ivory bg-opacity-30 sm:max-w-[60vw] lg:min-w-[40vw]max-w-[60vw]">
        <h1
          className={` text-white text-2xl sm:text-3xl md:text-6xl ${playfair.className} font-semibold`}
        >
          Welcome to{' '}
          <p>
            <span className="text-brown">North Music Academy</span>
          </p>
        </h1>
        <p className="mt-4 text-xl">
          Your journey to mastering music starts here.
        </p>

        <Link href="/contact">
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-2">
            Start Journey
          </button>
        </Link>
      </div>
    </div>
  );
}
