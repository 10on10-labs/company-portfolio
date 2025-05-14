'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen  text-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(255, 126, 0, 0.5) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.3) 0%, transparent 40%)',
          filter: 'blur(60px)',
        }}
      ></div>

      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="neural-net"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* All circles */}
              <g fill="#ff7e00" r="2">
                <circle cx="50" cy="50" r="2" />
                <circle cx="15" cy="15" r="2" />
                <circle cx="85" cy="15" r="2" />
                <circle cx="15" cy="85" r="2" />
                <circle cx="85" cy="85" r="2" />
              </g>

              {/* Connecting lines */}
              <g stroke="#ff7e00" strokeWidth="0.5">
                {/* Center to corners */}
                <g opacity="0.6">
                  <line x1="50" y1="50" x2="15" y2="15" />
                  <line x1="50" y1="50" x2="85" y2="15" />
                  <line x1="50" y1="50" x2="15" y2="85" />
                  <line x1="50" y1="50" x2="85" y2="85" />
                </g>

                {/* Diagonal connections between corners */}
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-32 py-32">
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
          <Button className="hover:bg-primary-600 rounded-2xl p-8 text-lg">Explore Services</Button>
          <Button variant="outline" className="border-primary text-beige rounded-2xl p-8 text-lg">
            Contact Us
          </Button>
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
                className="bg-white rounded-xl p-4 border border-white/10 hover:scale-105 transition-transform"
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
                className="text-black flex items-center gap-2 text-sm md:text-base font-semibold bg-white px-4 py-2 rounded-lg border border-white/10 shadow-md"
              >
                <Image src={`/${brand.icon}.svg`} width={50} height={50} alt="Google" />
                {brand.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
