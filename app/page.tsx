import AboutHomePage from '@/components/AboutHomePage';
import AgeCategories from '@/components/AgeCategories';
import Hero from '@/components/Hero';
import InstrumentCategories from '@/components/InstrumentCategories';
import { Roboto } from '@next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-center mx-auto relative ${roboto.className}`}
    >
      <div className="w-full">
        <Hero />
        <AboutHomePage />
        <AgeCategories />
        <InstrumentCategories />
      </div>
    </main>
  );
}
