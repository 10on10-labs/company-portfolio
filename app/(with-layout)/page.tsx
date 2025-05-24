'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';

export default function HeroSection() {
  return (
    <section className="relative w-full p-5 md:pt-20  text-black overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center text-center ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent pb-2"
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
            <Button className="hover:bg-primary rounded-2xl p-7 text-md md:text-lg hover:opacity-85 cursor-pointer ease-in-out duration-300">
              Explore Services
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button className="border-primary/50 bg-white text-black rounded-2xl p-7 text-md hover:text-white duration-300  cursor-pointer">
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
          className="mt-24 w-full max-w-6xl"
        >
          <h3 className="text-black text-lg md:text-xl font-medium mb-4 opacity-70">
            Trusted by forward-thinking brands:
          </h3>
          <div className="relative flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-80">
            {[
              { name: 'Google', icon: 'google-icon' },
              { name: 'Amazon', icon: 'amazon-icon' },
              { name: 'Dribbble', icon: 'dribble-icon' },
              { name: 'Spotify', icon: 'spotify-icon' },
            ].map((brand, i) => (
              <div
                key={i}
                className="text-black flex items-center gap-2 text-sm md:text-base font-semibold bg-white  rounded-full border border-black shadow-md"
              >
                <Image src={`/${brand.icon}.svg`} width={50} height={50} alt="Google" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
