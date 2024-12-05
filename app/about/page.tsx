import AboutIntro from '@/components/aboutcomponents/AboutIntro';
import React from 'react';
import { Playfair_Display } from "next/font/google";
import AboutHistory from '@/components/aboutcomponents/AboutHistory';
import AboutTeamCarousel from '@/components/aboutcomponents/AboutTeamCarousel';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function About() {
  return (
    <div className="flex flex-col w-full">
      <AboutIntro />
      <AboutHistory />
      <AboutTeamCarousel />
    </div>
  );
}
