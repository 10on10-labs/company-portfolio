'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'Process',
    href: '/process',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Reviews',
    href: '/reviews',
  },
  {
    title: 'Blogs',
    href: '/blogs',
  },
  {
    title: 'Contact Us',
    href: '/contact-us',
  },
];

export const MainSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-secondary rounded-md"
        aria-label="Toggle main menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-40 ${isMenuOpen ? 'block' : 'hidden'} md:relative md:block md:inset-auto`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 md:hidden" onClick={closeMenu} />
        <div className="bg-primary h-screen md:w-90 w-full sticky top-0 flex flex-col overflow-y-auto hide-scrollbar">
          <div className="flex max-w-md">Logo</div>
          <div className="p-20 pt-10 pb-0 w-full">
            <ul className="text-secondary uppercase font-extrabold text-3xl">
              {menuItems.map(({ title, href }, key) => (
                <Link href={href} key={key}>
                  <li className="mb-6 cursor-pointer">
                    <p className="break-words">{title}</p>
                    <svg
                      viewBox="0 0 500 30"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full mt-2"
                    >
                      <line
                        x1="10"
                        y1="15"
                        x2="490"
                        y2="15"
                        style={{
                          fill: 'none',
                          stroke: '#F5F5EE',
                          strokeWidth: 4,
                          strokeDasharray: '10, 15',
                          strokeLinecap: 'round',
                          animation: 'drawLine 15s linear infinite',
                        }}
                      />
                    </svg>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
