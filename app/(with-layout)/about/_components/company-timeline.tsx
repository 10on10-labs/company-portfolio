'use client';

const timelineData = [
  {
    year: '2014',
    title: '10on10 Labs Founded',
    description: 'Started with a vision to transform businesses through digital innovation.',
  },
  {
    year: '2016',
    title: 'Expanded Team & Services',
    description: 'Grew our team and added UI/UX design and mobile development services.',
  },
  {
    year: '2019',
    title: 'International Clients',
    description: 'Began serving clients globally, expanding our reach beyond local markets.',
  },
  {
    year: '2022',
    title: 'Industry Recognition',
    description: 'Received multiple awards for excellence in web development and design.',
  },
  {
    year: '2024',
    title: '200+ Projects Delivered',
    description: 'Celebrating a milestone of successfully delivering over 200 projects.',
  },
];

export const CompanyTimeline = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2" />

        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <div
            key={item.year}
            className={`relative mb-12 last:mb-0 ${
              index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:text-left'
            }`}
          >
            {/* Dot */}
            <div className="absolute left-8 md:left-1/2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm md:-translate-x-1/2" />

            {/* Content */}
            <div className="ml-16 md:ml-0 md:px-8">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
