'use client';
import React, { useState } from 'react';
import { navItems } from '@/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PlaceholdersAndVanishInput } from './ui/PlaceholderAndVanishInput';
import { FaSearch } from 'react-icons/fa';

const NavBar = () => {
  const pathname = usePathname();
  const [menuToggle, setMenuToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };
  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
    //handle the searchfunction here.
  };
  const searchToggle = () => {
    setToggleSearch(!toggleSearch);
  };

  const placeholders = ['Search'];
  return (
    <div>
      <nav className="flex flex-row items-center justify-around my-4 sm:m-auto">
        <div>
          <Link href="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <div>
          <ul className=" hidden sm:flex flex-row justify-center items-center gap-3 h-full p-8">
            {navItems.map((item) => {
              const isActive =
                item.link === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.link);

              return (
                <li
                  key={item.name}
                  className={`relative ${
                    isActive ? 'text-brown font-bold' : 'text-black'
                  } flex flex-col justify-around`}
                >
                  <Link
                    href={item.link}
                    className="hover:text-brown relative text-nowrap"
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-7 left-0 w-full h-1 bg-brown transition-transform duration-300 ${
                        isActive
                          ? 'transform scale-x-100'
                          : 'transform scale-x-0'
                      } origin-left`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sm:hidden flex gap-2">
            <GiHamburgerMenu onClick={toggleMenu} />

            <FaSearch onClick={searchToggle} />
          </div>
        </div>
        <div className="hidden sm:flex">
          <PlaceholdersAndVanishInput
            onChange={HandleSearch}
            onSubmit={onSubmit}
            placeholders={placeholders}
          />
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full bg-white-ivory shadow-lg w-58 ${
          menuToggle ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-black"
        >
          ✕
        </button>

        <ul className="flex flex-col justify-start items-center gap-3 h-full p-8 sm:hidden  ">
          {navItems.map((item) => {
            const isActive =
              item.link === '/'
                ? pathname === '/'
                : pathname.startsWith(item.link);

            return (
              <li
                key={item.name}
                className={`relative ${
                  isActive ? 'text-brown font-bold' : 'text-black'
                } flex flex-col justify-around`}
              >
                <Link href={item.link} className="hover:text-brown relative">
                  {item.name}
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-1 bg-brown transition-transform duration-300 ${
                      isActive ? 'transform scale-x-100' : 'transform scale-x-0'
                    } origin-left`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-white-ivory bg-opacity-70 shadow-lg w-full ${
          toggleSearch ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="flex flex-col items-center mt-5">
          <div className="flex items-center top-10">
            <button
              onClick={searchToggle}
              className="absolute top-4 right-4 text-black"
            >
              ✕
            </button>
            <div>
              <PlaceholdersAndVanishInput
                onChange={HandleSearch}
                onSubmit={onSubmit}
                placeholders={placeholders}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
