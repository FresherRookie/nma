import Image from 'next/image';
import React from 'react';
import { Playfair_Display } from '@next/font/google';
import { GiDrumKit, GiGrandPiano, GiGuitar, GiViolin } from 'react-icons/gi';
import { PiMicrophoneStageFill } from 'react-icons/pi';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function InstrumentCategories() {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full items-center justify-center mt-4 pt-4">
        <div className=" min-w-[35vw] md:max-w-[45vw] max-w-[90vw] p-6">
          <h1 className="text-4xl mb-4 font-light text-brown">
            Musical Instruments
          </h1>
          <div>
            <div className="mt-4">
              <GiGuitar className="text-brown text-7xl" />
              <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
                Guitar
              </h3>
              <p className="tracking-wide">
                The soulful storyteller, strumming or riffing with endless
                possibilities.
              </p>
            </div>
            <div className="mt-4">
              <GiGrandPiano className="text-brown text-7xl" />
              <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
                Guitar
              </h3>
              <p className="tracking-wide">
                The versatile giant of music, spanning from whispers to powerful
                crescendos.
              </p>
            </div>
            <div className="mt-4">
              <GiViolin className="text-brown text-7xl" />
              <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
                Violin
              </h3>
              <p className="tracking-wide">
                The expressive soprano, singing sweet or fiery melodies with
                elegance.
              </p>
            </div>
            <div className="mt-4">
              <GiDrumKit className="text-brown text-7xl" />
              <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
                Drums
              </h3>
              <p className="tracking-wide">
                The heartbeat of the band, driving rhythm and energy through
                beats.
              </p>
            </div>
            <div className="mt-4">
              <PiMicrophoneStageFill className="text-brown text-7xl" />
              <h3 className={`${playfair.className} pb-1 font-light mt-6`}>
                Vocals
              </h3>
              <p className="tracking-wide">
                The original instrument, conveying emotions directly from the
                soul. With infinite versatility, vocals can express every nuance
                of human feeling, from joy to sorrow, making each performance
                uniquely personal.
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full md:max-w-[40vw] h-screen">
          <Image src="/drumkit.jpg" fill={true} alt="piano" />

          <div className="bg-white bg-opacity-30 absolute bottom-0 w-full p-4">
            <h1 className="text-brown font-light text-3xl py-2 mb-2">
              Let&lsquo;s Begin
            </h1>
            <h3 className={`${playfair.className} pb-3 font-light`}>
              Explore Instruments
            </h3>

            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-4">
              Choose Your Instrument
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
