import React from 'react';
import { ServicesQueryResult } from '@company/sanity-shared';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';

import { ServiceCard } from './service-card';

type Props = {
  services: ServicesQueryResult;
};

export const ServicesCarousel: React.FC<Props> = ({ services }) => {
  return (
    <>
      <Carousel opts={{ loop: true }} orientation="horizontal">
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
        <CarouselPrevious className="-left-3 rtl:-left-auto rtl:-right-3" />
        <CarouselNext className="-right-3 rtl:-right-auto rtl:-left-3" />
      </Carousel>
    </>
  );
};
