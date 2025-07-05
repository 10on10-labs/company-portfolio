'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/shadcn/carousel';

interface Brand {
  _id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  link?: string;
}

interface HeroClientProps {
  brands: Brand[];
}

export default function HeroClient({ brands }: HeroClientProps) {
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

        {brands && brands.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-10 w-full max-w-6xl"
            >
              <h3 className="text-black text-lg md:text-xl font-medium mb-5 opacity-70 text-center">
                Trusted by forward-thinking brands:
              </h3>
            </motion.div>
            <div className="relative w-full max-w-5xl mx-auto py-4 overflow-hidden">
              <Suspense>
                <Carousel
                  opts={{
                    loop: true,
                    align: 'start',
                    skipSnaps: true,
                  }}
                  plugins={[
                    AutoScroll({
                      speed: 3,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                      stopOnFocusIn: false,
                      playOnInit: true,
                    }),
                  ]}
                  orientation="horizontal"
                  className="w-full"
                >
                  <CarouselContent className="flex items-center">
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                      <CarouselItem
                        key={`${brand._id}-${index}`}
                        className="min-w-20 basis-auto pl-0"
                      >
                        <div className="flex items-center justify-center px-8 h-[60px]">
                          {brand.link ? (
                            <Link
                              href={brand.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              // className="flex items-center justify-center"
                            >
                              <Image
                                title={brand.name}
                                src={brand.logoUrl}
                                width={120}
                                height={60}
                                alt={brand.logoAlt || brand.name}
                                className="h-auto w-auto object-contain grayscale"
                                style={{ maxWidth: '120px' }}
                              />
                            </Link>
                          ) : (
                            <Image
                              src={brand.logoUrl}
                              width={120}
                              height={60}
                              alt={brand.logoAlt || brand.name}
                              className="max-h-12 w-auto object-contain grayscale"
                              style={{ maxWidth: '120px' }}
                            />
                          )}
                          {/* </motion.div> */}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </Suspense>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
