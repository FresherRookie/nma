import Image from 'next/image';
import React from 'react';

import { Playfair_Display } from '@next/font/google';
import {
  FaFacebook,
  FaInstagram,
  FaPhoneVolume,
  FaYoutube,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { topContactItems, topSocialList } from '@/data';
import Link from 'next/link';

import ExampleForm from '@/components/forms/ExampleForm';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});
export default function Contact() {
  return (
    <div
      className={`flex flex-col justify-center items-center relative ${playfair.className}`}
    >
      <div className="w-full h-[70vh] relative">
        <Image src="/violin.jpg" fill={true} alt="violin" />{' '}
        <div className="absolute font-light bg-gray-900 bg-opacity-50  w-full h-full flex items-center justify-center">
          <div>
            <h1 className="text-white text-4xl lg:text-5xl font-light pb-2">
              Contact US
            </h1>
            {topContactItems.map((item) => (
              <div
                className="text-white-ivory flex flex-row items-center gap-1 px-1"
                key={item.address}
              >
                {item.contactType === 'email' && (
                  <div className="flex flex-row gap-2">
                    <span>email:</span>
                    <a
                      href="mailto:thejasilimetha93@gmail.com"
                      className="flex flex-row items-center justify-center gap-1"
                    >
                      <MdEmail />
                      {item.address}
                    </a>
                  </div>
                )}
                {item.contactType === 'phone' && (
                  <div className="flex flex-row gap-2">
                    <span>Phone:</span>
                    <a
                      href="tel:+918787515363"
                      className="flex flex-row items-center justify-center gap-1"
                    >
                      <FaPhoneVolume />
                      {item.address}
                    </a>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center">
              <ul className="flex items-center justify-around gap-3 py-4 px-2 sm:p-4">
                {topSocialList.map((item) => (
                  <li key={item.platform}>
                    <Link key={item.platform} href={item.link}>
                      {item.platform === 'facebook' && (
                        <FaFacebook className="text-white-ivory" />
                      )}
                      {item.platform === 'youtube' && (
                        <FaYoutube className="text-white-ivory" />
                      )}
                      {item.platform === 'instagram' && (
                        <FaInstagram className="text-white-ivory" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 mb-2">
        <ExampleForm />
      </div>
    </div>
  );
}
