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
    if (href === '/') {
      // Clear active section when Home is clicked
      setActiveSection('');
    } else if (isSection && href.startsWith('/#')) {
      const sectionId = href.substring(2);
      setActiveSection(sectionId);
    }
  };

  // Handle scroll to section on page load and set active section from URL hash
  useEffect(() => {
    const scrollToSection = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        // Set the active section immediately based on URL hash
        setActiveSection(sectionId);
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

  return (
    <header className="fixed top-2 left-0 right-0  z-50">
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-center">
          <nav className="flex items-center h-full w-full justify-center">
            {/* Enhanced navbar with footer's dark color and backdrop blur */}
            <div className="relative bg-primary/50 backdrop-blur-sm rounded-full h-full shadow-2xl shadow-black/20 px-1 border border-white/20">
              <ul className="relative flex items-center h-full lg:px-2 xl:px-3 lg:py-1.5 xl:py-2 text-black lg:gap-0.5 xl:gap-0">
                {/* Logo as first item inside navbar */}
                <li className="mr-1">
                  <Link
                    href="/"
                    className="flex items-center lg:px-2 xl:px-3 py-1 hover:bg-white/30 rounded-full transition-all duration-200 group"
                  >
                    <div className="lg:w-7 xl:w-9 lg:h-7 xl:h-9 relative flex items-center justify-center">
                      {/* White background circle precisely for the 10/10 part */}
                      <div className="absolute lg:w-[28px] xl:w-[35px] lg:h-[28px] xl:h-[35px] bg-white rounded-md"></div>
                      <Image
                        src="/logo.png"
                        width={36}
                        height={36}
                        alt="10on10labs logo"
                        className="lg:w-7 xl:w-9 lg:h-7 xl:h-9 relative z-10"
                        priority
                      />
                    </div>
                    <span className="lg:ml-2 xl:ml-2.5 font-semibold text-black lg:text-xs xl:text-sm lg:tracking-tight xl:tracking-wide">
                      10on10labs
                    </span>
                  </Link>
                </li>

                {/* Vertical separator with gradient */}
                <li className="lg:h-5 xl:h-6 w-px bg-gradient-to-b from-transparent via-black/30 to-transparent lg:mx-2 xl:mx-3"></li>

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
                        className="relative group"
                      >
                        {/* Glow effect for active item */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse"></span>
                        )}

                        {/* Main button */}
                        <span
                          className={`relative flex items-center lg:py-1.5 xl:py-2 lg:px-3 xl:px-4 rounded-full font-medium lg:text-xs xl:text-[13px] transition-all duration-300 ${
                            isActive
                              ? 'bg-white text-black shadow-lg shadow-black/20 border border-white/50'
                              : 'text-black/90 hover:text-black hover:bg-white/50'
                          }`}
                        >
                          {/* Active indicator dot */}
                          {isActive && (
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-lg shadow-primary/50"></span>
                          )}
                          {title}
                        </span>
                      </Link>
                    </li>
                  );
                })}

                {/* Contact Button with gradient */}
                <li className="lg:pl-1 xl:pl-2">
                  <Link
                    href="/contact-us"
                    className="relative lg:px-4 xl:px-5 lg:py-1.5 xl:py-2 rounded-full font-medium lg:text-xs xl:text-[13px] bg-gradient-to-r from-primary to-primary/80 text-white hover:from-white hover:to-gray-100 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl group overflow-hidden"
                  >
                    <span className="relative z-10 lg:inline xl:inline">
                      <span className="lg:hidden xl:inline">Contact Us</span>
                      <span className="lg:inline xl:hidden">Contact</span>
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
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
