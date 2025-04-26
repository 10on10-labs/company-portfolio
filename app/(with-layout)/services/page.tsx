import React from 'react';

import { Service, ServiceCard } from './service-card';

const services: Service[] = [
  {
    id: 'design',
    name: 'Design',
    categories: [
      'Creative Direction',
      'Digital Product Design',
      'Brand Design',
      'Motion Design',
      'Experience Design',
      'Interaction Design',
      'Visual Design',
      'Prototyping',
      'Copywriting',
      'Video Production',
    ],
  },
  {
    id: 'strategy',
    name: 'Strategy',
    categories: [
      'Creative Direction',
      'Digital Product Design',
      'Brand Design',
      'Motion Design',
      'Experience Design',
      'Interaction Design',
      'Visual Design',
      'Prototyping',
      'Copywriting',
      'Video Production',
    ],
  },
  {
    id: 'technology',
    name: 'Technology',
    categories: [
      'Creative Direction',
      'Digital Product Design',
      'Brand Design',
      'Motion Design',
      'Experience Design',
      'Interaction Design',
      'Visual Design',
      'Prototyping',
      'Copywriting',
      'Video Production',
    ],
  },
];
const Services = () => {
  return (
    <div className="md:w-full flex flex-col md:flex-row h-full gap-4 items-center">
      {services.map((service, index) => {
        const step = index < 10 ? `0${index + 1}` : index + 1;
        return <ServiceCard key={service.id} service={service} step={step} />;
      })}
    </div>
  );
};

export default Services;
