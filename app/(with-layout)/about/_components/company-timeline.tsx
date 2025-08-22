'use client';

const timelineData = [
  {
    year: 'Q1 2024',
    title: '10on10 Labs Founded',
    description:
      'Started with a vision to transform businesses through digital innovation and perfect 10/10 solutions.',
  },
  {
    year: 'Q2 2024',
    title: 'First Major Clients',
    description:
      'Secured partnerships with key clients and delivered our first enterprise-level projects.',
  },
  {
    year: 'Q3 2024',
    title: 'Team Expansion',
    description:
      'Grew our team to 15+ talented professionals specializing in UI/UX and frontend development.',
  },
  {
    year: 'Q4 2024',
    title: '60+ Projects Milestone',
    description:
      'Successfully delivered over 60 projects across various industries in our first year.',
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Expanding our services internationally and establishing partnerships worldwide.',
  },
];

export const CompanyTimeline = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 md:-translate-x-1/2" />

        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <div
            key={item.year}
            className={`relative mb-12 last:mb-0 ${
              index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:text-left'
            }`}
          >
            {/* Dot */}
            <div className="absolute left-8 md:left-1/2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-gray-900 shadow-sm md:-translate-x-1/2" />

            {/* Content */}
            <div className="ml-16 md:ml-0 md:px-8">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-2">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
