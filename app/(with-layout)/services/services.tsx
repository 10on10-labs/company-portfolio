'use client';

import React from 'react';
import { useIsDesktop } from '@/hooks';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';

import { ServiceCard } from './service-card';

export type Service = {
  name: string;
  id: string;
  categories: string[];
};
type Props = {
  services: Service[];
};

export const Services: React.FC<Props> = ({ services }) => {
  const isMobile = useIsDesktop();
  return !isMobile ? (
    <Carousel
      className="relative p-5 w-full max-w-sm md:hidden"
      opts={{ loop: true }}
      orientation="horizontal"
    >
      <CarouselContent>
        {services.map((service, index) => {
          const step = index < 10 ? `0${index + 1}` : index + 1;
          return (
            <CarouselItem key={service.id}>
              <ServiceCard key={service.id} service={service} step={step} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  ) : (
    services.map((service, index) => {
      const step = index < 10 ? `0${index + 1}` : index + 1;
      return <ServiceCard key={service.id} service={service} step={step} />;
    })
  );
};
