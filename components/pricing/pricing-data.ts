export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string | null;
  period: string | null;
  features: string[];
  isHighlighted?: boolean;
  isCustom?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'advance-design',
    name: 'Advance Design',
    subtitle: 'Product design as a service',
    price: '$3,799',
    period: '/mo',
    features: [
      'Dedicated Product Designer',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
  },
  {
    id: 'advance-combo',
    name: 'Advance Combo',
    subtitle: 'Product design and frontend engineering as a service',
    price: '$6,399',
    period: '/mo',
    features: [
      'Dedicated Product Designer',
      'Dedicated Frontend Engineer (Vue.js, Angular.js, React.js)',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
    isHighlighted: true,
  },
  {
    id: 'advance-frontend',
    name: 'Advance Frontend',
    subtitle: 'Frontend engineering as a service',
    price: '$3,799',
    period: '/mo',
    features: [
      'Dedicated Frontend Engineer (Vue.js, Angular.js, React.js)',
      'Real-time Collaboration on Slack / Microsoft Teams',
      'Daily Updates',
      'No contracts - pause or cancel anytime',
    ],
  },
  {
    id: 'custom-plan',
    name: 'Get Custom Plan',
    subtitle: 'Product design and frontend engineering as a service',
    price: null,
    period: null,
    features: ['All subject to Decided Plan'],
    isCustom: true,
  },
];
