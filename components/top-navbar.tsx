'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'motion/react';

// Define menu items outside component
const menuItems = [
  { title: 'Home', href: '/', isSection: false },
  { title: 'Services', href: '/#services', isSection: true },
  { title: 'Pricing', href: '/pricing', isSection: false },
  { title: 'Case Studies', href: '/#case-studies', isSection: true },
  { title: 'Process', href: '/#process', isSection: true },
  { title: 'About', href: '/about', isSection: false },
  { title: 'Reviews', href: '/#reviews', isSection: true },
  { title: 'Insights', href: '/#insights', isSection: true },
];

export const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Animation variants
  const sidebarVariants: Variants = {
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

  const menuItemVariants: Variants = {
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
  const buttonVariants: Variants = {
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
  const activeTabClass = 'bg-secondary text-black';
  return (
    <header className="fixed top-2 left-0 right-0  z-50">
      <div className="container mx-auto px-4">
        <div className="hidden  lg:flex items-center justify-center">
          <div>
            <Link href="/">
              <Image src="/logo.png" width={50} height={50} alt="logo" />
            </Link>
          </div>
          <nav className="flex items-center h-full w-full justify-center ">
            <div className="bg-primary rounded-2xl opacity-90 h-full shadow-md  shadow-primary px-2 py-1 border-4 border-white">
              <ul className="flex items-center h-full px-4 py-3 text-white">
                {menuItems.map(({ title, href }, index) => (
                  <li key={index} className="">
                    <Link
                      href={href}
                      // onClick={() => setActiveTab(href)}
                      className={`relative py-2 px-4 rounded-[10px] font-medium text-sm transition-all duration-300 ${pathname == href ? activeTabClass : ''}`}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
                <li className="pl-4">
                  <Link
                    href="/contact-us"
                    className="bg-black text-white  px-6 py-2 rounded-[10px] font-medium text-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-sm"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex-shrink-0">
            <div className="bg-white rounded-lg">
              <Image src="/logo.png" width={40} height={40} alt="logo" />
            </div>
          </Link>

          <motion.button
            onClick={toggleMenu}
            className="flex-shrink-0 bg-primary p-2 text-secondary rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
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
        </div>
      </div>

      {/* Overlay - only on mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black z-40 lg:hidden backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed inset-y-0 left-0 z-40 lg:hidden w-full"
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <div className="bg-primary h-screen w-full flex flex-col overflow-y-auto hide-scrollbar shadow-xl">
          <nav className="p-20 pt-10 mt-10 pb-0 w-full">
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
    </header>
  );
};
