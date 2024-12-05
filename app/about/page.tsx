import AboutIntro from '@/components/aboutcomponents/AboutIntro';
import React from 'react';

import AboutHistory from '@/components/aboutcomponents/AboutHistory';
import AboutTeamCarousel from '@/components/aboutcomponents/AboutTeamCarousel';

export default function About() {
  return (
    <div className="flex flex-col w-full">
      <AboutIntro />
      <AboutHistory />
      <AboutTeamCarousel />
    </div>
  );
}
