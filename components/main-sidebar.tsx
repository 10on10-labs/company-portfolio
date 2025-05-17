'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';

// Define menu items outside component
const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'Projects', href: '/projects' },
  { title: 'Process', href: '/process' },
  { title: 'About', href: '/about' },
  { title: 'Reviews', href: '/reviews' },
  { title: 'Blogs', href: '/blogs' },
  { title: 'Contact Us', href: '/contact-us' },
];

export const MainSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        when: 'beforeChildren',
        staggerChildren: 0.07,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 22,
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 22,
      },
    },
  };

  // Button variants
  const buttonVariants = {
    open: {
      rotate: 90,
      scale: 1,
      transition: { type: 'spring', stiffness: 500, damping: 30 },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 500, damping: 30 },
    },
    tap: {
      scale: 0.9,
      transition: { type: 'spring', stiffness: 500, damping: 10 },
    },
  };

  return (
    <>
      {/* Menu Toggle Button - only visible on mobile */}
      <motion.button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary text-secondary rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
        aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
        aria-expanded={isMenuOpen}
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
        whileTap="tap"
        variants={buttonVariants}
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
      </motion.button>

      {/* Overlay - only on mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-40 md:hidden backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed inset-y-0 left-0 z-40 md:hidden"
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <div className="bg-primary h-screen w-full flex flex-col overflow-y-auto hide-scrollbar shadow-xl">
          <div className="flex max-w-md p-6">Logo</div>

          <nav className="p-20 pt-10 pb-0 w-full">
            <ul className="text-secondary uppercase font-extrabold text-3xl">
              {menuItems.map(({ title, href }, index) => (
                <motion.li
                  key={index}
                  className="mb-6 cursor-pointer"
                  variants={menuItemVariants}
                  whileHover={{
                    x: 10,
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <Link href={href} onClick={closeMenu} className="block">
                    <p className="break-words">{title}</p>

                    {/* Dotted line SVG */}
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
                        stroke="#F5F5EE"
                        strokeWidth="4"
                        strokeDasharray="10, 15"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* Desktop Menu - No Animation */}
      <div className="hidden md:block relative">
        <div className="bg-primary h-screen md:w-90 sticky top-0 flex flex-col overflow-y-auto hide-scrollbar">
          {/* Logo */}
          <div className="flex max-w-md p-6">Logo</div>

          {/* Menu Items - Desktop */}
          <nav className="p-20 pt-5 pb-10 w-full">
            <ul className="text-secondary uppercase font-extrabold text-3xl">
              {menuItems.map(({ title, href }, index) => (
                <li
                  key={index}
                  className="mb-6 cursor-pointer hover:translate-x-2 transition-transform duration-300"
                >
                  <Link href={href} className="block">
                    <p className="break-words">{title}</p>

                    {/* Dotted line SVG */}
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
                        stroke="#F5F5EE"
                        strokeWidth="4"
                        strokeDasharray="10, 15"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
