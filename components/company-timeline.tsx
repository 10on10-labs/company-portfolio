'use client';

import { motion } from 'motion/react';

const timelineData = [
  {
    year: '2016',
    tag: 'The seed',
    title: 'Open PRO was founded in Milan, Italy',
    description:
      'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
  },
  {
    year: '2019',
    tag: 'New features',
    title: 'Launched the first Open PRO Advanced plan',
    description:
      'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
  },
  {
    year: '2022',
    tag: 'Pivoting',
    title: 'Transitioned to a SaaS business model',
    description:
      'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
  },
  {
    year: '2026',
    tag: 'Huge milestone',
    title: '1 million happy customers',
    description:
      'Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.',
  },
];

export const CompanyTimeline = () => {
  return (
    <div className="py-20">
      <div className="mx-auto px-4 w-[calc(100%-90px)]">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[26px] top-3 bottom-[85px] w-[2px] bg-primary/30" />

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-12 relative pl-14"
            >
              {/* Year */}
              <div className="absolute -left-12 px-3 py-1 rounded-full bg-primary/20 text-primary font-medium text-sm">
                {item.year}
              </div>

              {/* Dot */}
              <div className="absolute left-[22px] top-[10px] w-[10px] h-[10px] rounded-full bg-primary z-10" />

              {/* Content */}
              <div>
                <span className="text-primary/80 text-sm">{item.tag}</span>
                <h3 className="text-xl font-semibold mt-1 mb-2 text-black">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
