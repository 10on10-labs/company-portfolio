'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'motion/react';

// Define menu items matching homepage section order
const menuItems = [
  { title: 'Home', href: '/', isSection: false },
  { title: 'Case Studies', href: '/#case-studies', isSection: true },
  { title: 'Services', href: '/#services', isSection: true },
  { title: 'Pricing', href: '/#pricing', isSection: true },
  { title: 'Process', href: '/#process', isSection: true },
  { title: 'Insights', href: '/#insights', isSection: true },
  { title: 'Reviews', href: '/#reviews', isSection: true },
  { title: 'About', href: '/about', isSection: false },
];

export const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (href: string, isSection: boolean) => {
    if (isSection && href.startsWith('/#')) {
      const sectionId = href.substring(2);
      setActiveSection(sectionId);
    }
  };

  // Handle scroll to section on page load
  useEffect(() => {
    const scrollToSection = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    scrollToSection();
  }, [pathname]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') return;

      const sections = menuItems.filter(item => item.isSection).map(item => item.href.substring(2)); // Remove '/#' prefix

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex items-center h-full w-full justify-center">
            {/* Enhanced navbar with footer's dark color and backdrop blur */}
            <div className="relative bg-primary/60 backdrop-blur-md rounded-2xl h-full shadow-lg shadow-black/20 px-2 py-0.5 border border-white">
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

              <ul className="relative flex items-center h-full px-2 py-1.5 text-white">
                {/* Logo as first item inside navbar */}
                <li className="mr-1">
                  <Link
                    href="/"
                    className="flex items-center px-2 py-1 hover:bg-white/10 rounded-[10px] transition-all"
                  >
                    <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        width={36}
                        height={36}
                        alt="10on10labs logo"
                        className="w-9 h-9"
                        priority
                      />
                    </div>
                    <span className="ml-2 font-bold text-white text-sm">10on10labs</span>
                  </Link>
                </li>

                {/* Vertical separator */}
                <li className="h-8 w-px bg-white/25 mx-2"></li>

                {/* Menu Items */}
                {menuItems.map(({ title, href, isSection }, index) => {
                  let isActive = false;

                  if (href === '/') {
                    // Home is only active if we're on homepage with no section selected
                    isActive = pathname === '/' && !activeSection;
                  } else if (isSection) {
                    // Section items are active when their section is selected
                    isActive = pathname === '/' && `/#${activeSection}` === href;
                  } else {
                    // Other pages (like About) are active based on pathname
                    isActive = pathname === href;
                  }

                  return (
                    <li key={index}>
                      <Link
                        href={href}
                        onClick={() => handleNavClick(href, isSection)}
                        className={`relative py-1.5 px-3 rounded-[10px] font-medium text-sm transition-all duration-300 hover:bg-white/10 ${
                          isActive ? activeTabClass : ''
                        }`}
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}

                {/* Contact Button */}
                <li className="pl-3">
                  <Link
                    href="/contact-us"
                    className="bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-[10px] font-medium text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-sm border border-white/30"
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
