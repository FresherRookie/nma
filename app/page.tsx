import AboutHomePage from '@/components/AboutHomePage';
import AgeCategories from '@/components/AgeCategories';
import Hero from '@/components/Hero';
import InstrumentCategories from '@/components/InstrumentCategories';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutHomePage />
      <AgeCategories />
      <InstrumentCategories />
    </div>
  );
}
