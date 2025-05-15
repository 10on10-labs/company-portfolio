'use client';

import { motion } from 'framer-motion';

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
    <div className="py-20 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] top-3 bottom-3 w-[2px] bg-blue-900/30" />

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-12 relative pl-16"
            >
              {/* Year bubble */}
              <div className="absolute left-0 flex items-center justify-center w-14 h-7 bg-blue-900/40 text-blue-400 rounded-full text-sm">
                {item.year}
              </div>

              {/* Dot */}
              <div className="absolute left-[27px] top-[13px] w-[4px] h-[4px] rounded-full bg-blue-400" />

              {/* Content */}
              <div>
                <span className="text-blue-400 text-sm">{item.tag}</span>
                <h3 className="text-xl font-semibold mt-1 mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
