import Image from 'next/image';
import React from 'react';
import { Playfair_Display } from '@next/font/google';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function AgeCategories() {
  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-around mt-4 pt-4">
      <div className="relative w-full md:max-w-[50vw] h-[70vh]">
        <Image src="/Guitar.jpg" fill={true} alt="Guitar" />

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
      <div className=" min-w-[35vw] md:max-w-[35vw] max-w-[90vw] p-6">
        <h1 className="text-4xl mb-4 font-light text-brown">Our Age Groups</h1>

        <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
          Children (Ages 4-12)
        </h3>
        <p className="tracking-wide">
          Foster creativity and cognitive development. Build essential music
          theory and instrument skills. Engage through playful and interactive
          lessons. Promote teamwork and communication through group activities.
        </p>
        <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
          Teens (Ages 13-18)
        </h3>
        <p className="tracking-wide">
          Master complex musical pieces and techniques. Gain experience through
          recitals and events. Enhance self-discipline, responsibility, and
          confidence. Encourage composition and personal musical projects.
        </p>
        <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
          Adults (Ages 19-60)
        </h3>
        <p className="tracking-wide">
          Improve or learn new instruments and vocal techniques. Enjoy music as
          a therapeutic and relaxing activity. Connect with like-minded
          individuals through music. Continue personal development and pursue
          musical passions.
        </p>
        <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
          Seniors (Ages 60+)
        </h3>
        <p className="tracking-wide">
          Keep the mind active and engaged. Experience the joy of learning and
          playing music. Meet new friends and join community activities. Improve
          mental health and overall well-being through music.
        </p>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4">
          Classes
        </button>
      </div>
    </div>
  );
}
