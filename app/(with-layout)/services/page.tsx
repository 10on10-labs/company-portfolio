import React from 'react';

import { Service, Services } from './services';

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

const ServicesPage = () => {
  return (
    <div className="md:w-full flex flex-col md:flex-row h-full gap-4 md:items-center lg:justify-center">
      <Services services={services} />
    </div>
  );
};

export default ServicesPage;
