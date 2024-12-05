import Image from 'next/image';
import React from 'react';
import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function AboutHistory() {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4 relative">Our Story</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
        <div className={`${playfair.className}`}>
          <div className="p-4">
            <h1 className="font-bold text-lg pb-2">History: A New Beginning</h1>
            <p className="tracking-wide">
              Welcome to the grand unveiling of{' '}
              <span className="text-brown">North Music Academy</span>, a place
              where the vibrant rhythms of North Eastern traditions meet the
              dynamic harmonies of Western modern music. As we prepare to open
              our doors, we are thrilled to embark on this musical journey with
              you. Our academy is dedicated to providing an unparalleled musical
              education that bridges cultures and unites diverse musical
              traditions.
            </p>
          </div>
          <div className="p-4">
            <h1 className="font-bold text-lg pb-2">Our Story</h1>
            <p className="tracking-wide">
              In a world where music transcends boundaries,{' '}
              <span className="text-brown">North Music Academy</span>
              was born from a vision to create a unique institution that
              celebrates both the time-honored traditions of North Eastern music
              and the innovative techniques of Western modern music. Founded by
              passionate musicians and educators, our academy is set to become a
              haven for aspiring musicians who seek to explore and master a wide
              range of musical styles.
            </p>
          </div>
          <div className="p-4">
            <h1 className="font-bold text-lg pb-2">
              Milestones in Our Journey
            </h1>
            <p className="pb-1">
              <span className="text-brown font-semibold">Inception:</span>{' '}
              Conceived with a mission to nurture and develop musical talent,
              respecting both tradition and innovation.
            </p>
            <p className="pb-1">
              <span className="text-brown font-semibold">
                Curriculum Development:
              </span>{' '}
              Crafting a comprehensive curriculum that offers courses in Western
              modern music and traditional North Eastern music.
            </p>
            <p className="pb-1">
              <span className="text-brown font-semibold">Facility Setup:</span>{' '}
              Equipping our academy with adequate facilities and resources to
              provide the best learning environment.
            </p>
            <p className="pb-1">
              <span className="text-brown font-semibold">
                Community Engagement:
              </span>{' '}
              Building strong ties with the local community and musical
              fraternity to create a vibrant, supportive network.
            </p>
          </div>
        </div>

        <div className="relative min-h-[80vh] w-full flex justify-center bg-gray-800 bg-opacity-40">
          <Image
            src="/doorway3.jpg"
            alt="doorway"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full h-20 flex items-center justify-center bg-gray-400 bg-opacity-50">
            <h1
              className={`text-xl ${playfair.className} font-serif font-light`}
            >
              A New Melody Awaits
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
