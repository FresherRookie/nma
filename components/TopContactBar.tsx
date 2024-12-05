import React from 'react';
import { topContactItems, topSocialList } from '@/data';
import { MdEmail } from 'react-icons/md';
import AuthButtons from './AuthButtons';
import {
  FaFacebook,
  FaInstagram,
  FaPhoneVolume,
  FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
const TopContactBar = () => {
  return (
    <div className="bg-brown w-full ">
      <div className="flex flex-col md:flex-row md:justify-around justify-center items-center p-2 ">
        <div className="flex flex-wrap items-center justify-center gap-5 p-2">
          {topContactItems.map((item) => (
            <div
              className="text-white-ivory flex flex-row items-center gap-1 px-1"
              key={item.address}
            >
              {item.contactType === 'email' && (
                <a
                  href="mailto:thejasilimetha93@gmail.com"
                  className="flex flex-row items-center justify-center gap-1"
                >
                  <MdEmail />
                  {item.address}
                </a>
              )}
              {item.contactType === 'phone' && (
                <a
                  href="tel:+918787515363"
                  className="flex flex-row items-center justify-center gap-1"
                >
                  <FaPhoneVolume />
                  {item.address}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <ul className="flex flex-row items-center justify-between gap-3 py-1 sm:p-2">
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
        <div>
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;
