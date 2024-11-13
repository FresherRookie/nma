import React from 'react';
import { FaSquareInstagram, FaTwitter } from 'react-icons/fa6';
import { IoLogoFacebook } from 'react-icons/io';

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">North Music Academy</h2>
          <p>
            Empowering students to achieve their musical dreams with
            professional education and innovative teaching methods.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/classes" className="hover:underline">
                Programs
              </a>
            </li>
            <li>
              <a href="/admission" className="hover:underline">
                Admissions
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <ul>
            <li>New Secretary Road, Kohima:Nagaland</li>
            <li>Email: info@musicacademy.com</li> <li>Phone: (123) 456-7890</li>
          </ul>
          <div className="mt-4 flex flex-row gap-5">
            <a href="https://www.facebook.com" className="hover:underline mr-2">
              <IoLogoFacebook />
            </a>
            <a href="https://www.twitter.com" className="hover:underline mr-2">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="hover:underline">
              <FaSquareInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Music Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}
