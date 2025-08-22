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
    <section className="relative w-full text-black overflow-hidden py-8 md:py-12">
      <div className="relative z-10 flex flex-col justify-center items-center text-center max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent pb-2"
        >
          Engineering digital perfection.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-black"
        >
          We specialize in crafting seamless user experiences and building powerful frontend
          solutions that are a perfect 10/10.
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
          <Link href="/#pricing">
            <Button className="border-primary border bg-white text-black rounded-full p-6 text-md hover:text-white hover:bg-primary duration-300 cursor-pointer">
              See Available Packages
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button className="border-primary border bg-white text-black rounded-full p-6 text-md hover:text-white hover:bg-primary duration-300 cursor-pointer">
              Contact Us
            </Button>
          </Link>
        </motion.div>

        {/* Our Expertise Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 w-full"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent pb-2">
              Our Expertise
            </h2>
            <p className="text-gray-600 mt-2">Building digital excellence with proven expertise</p>
          </motion.div>

          {/* Expertise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'UI/UX Design',
                description: 'Beautiful, intuitive interfaces',
                link: '/services/ui-ux-services',
              },
              {
                title: 'Frontend Development',
                description: 'Fast, scalable applications',
                link: '/services/frontend-development',
              },
            ].map((item, index) => (
              <Link href={item.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[180px] cursor-pointer overflow-hidden"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="bg-gray-50 rounded-xl p-3 inline-block mb-4 group-hover:bg-primary/10 transition-colors">
                      <Sparkles className="text-primary w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </Link>
            ))}
          </div>
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
                      speed: 2,
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
