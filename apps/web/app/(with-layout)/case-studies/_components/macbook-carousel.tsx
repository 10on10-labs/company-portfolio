'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/shadcn/carousel';

interface MacBookCarouselProps {
  images: Array<{ url: string; alt: string }>;
}

export const MacBookCarousel: React.FC<MacBookCarouselProps> = ({ images }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <div className="relative max-w-[600px] mx-auto">
      {/* MacBook Frame with Carousel */}
      <div className="relative">
        <Image
          src="/macbook_new-min.webp"
          alt="MacBook Frame"
          width={600}
          height={375}
          className="w-full h-auto relative z-10"
        />

        {/* Carousel Inside MacBook Screen */}
        <div className="absolute top-[7.2%] left-[10%] right-[10%] bottom-[21%] overflow-hidden rounded-[0.5%]">
          {images.length > 0 ? (
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full h-full"
            >
              <CarouselContent className="h-94">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full p-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={image.url || ''}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-base">No preview available</span>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Positioned at MacBook edges */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => carouselApi?.scrollPrev()}
              className="absolute -left-2 top-1/2 -translate-y-1/2 size-8 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity rounded-full shadow-md flex items-center justify-center z-20"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => carouselApi?.scrollNext()}
              className="absolute -right-2 top-1/2 -translate-y-1/2 size-8 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity rounded-full shadow-md flex items-center justify-center z-20"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
