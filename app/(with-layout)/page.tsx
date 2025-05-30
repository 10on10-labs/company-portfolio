'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';

const brands = [
  { name: 'Google', icon: 'google-icon' },
  { name: 'Amazon', icon: 'amazon-icon' },
  { name: 'Dribbble', icon: 'dribble-icon' },
  { name: 'Spotify', icon: 'spotify-icon' },
];

export default function HeroSection() {
  return (
    <section className="relative w-full  text-black overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center text-center max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent pb-2"
        >
          Design. Develop. Deliver.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-black"
        >
          We craft pixel-perfect websites with cutting-edge technology and world-class UI/UX — from
          concept to code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <Link href="/services">
            <Button className="hover:bg-primary rounded-full p-6 text-md md:text-md hover:opacity-85 cursor-pointer ease-in-out duration-300">
              Explore Services
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button className="border-primary border bg-white text-black rounded-full p-6 text-md hover:text-white duration-300  cursor-pointer">
              Contact Us
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 grid  max-[1024px]:grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {['UI/UX Design', 'Web Development', 'Mobile-Ready Interfaces', 'SEO Optimization'].map(
            (item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4  shadow shadow-secondary hover:scale-105 transition-transform"
              >
                <Sparkles className="text-primary mb-2" />
                <p className=" text-black font-semibold">{item}</p>
              </div>
            ),
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 w-full max-w-6xl"
        >
          <h3 className="text-black text-lg md:text-xl font-medium mb-5 opacity-70 text-center">
            Trusted by forward-thinking brands:
          </h3>
          <div className="relative w-full overflow-hidden max-w-3xl mx-auto py-4">
            <div className="flex">
              {[0, 1, 2].map((stripIndex: number) => (
                <motion.div
                  key={`strip-${stripIndex}`}
                  className="flex shrink-0"
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      duration: 20,
                      ease: 'linear',
                    },
                  }}
                >
                  {brands.map((brand, i) => (
                    <motion.div
                      key={`${stripIndex}-${i}`}
                      className="flex-shrink-0 bg-white p-1 rounded-full border border-gray-300 shadow-md mx-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={`/${brand.icon}.svg`}
                        width={50}
                        height={50}
                        alt={brand.name}
                        className="w-[50px] h-[50px]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
