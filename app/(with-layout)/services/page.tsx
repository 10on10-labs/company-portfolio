import React from 'react';

import { Service, Services } from './_components/services';

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
  return <Services services={services} />;
};

export default ServicesPage;
