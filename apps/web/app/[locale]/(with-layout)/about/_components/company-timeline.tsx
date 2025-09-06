import { CompanyTimelineQueryResult } from '@company/sanity-shared';

type NonNullTimelineItems = NonNullable<CompanyTimelineQueryResult>;

type Props = Pick<NonNullTimelineItems, 'items'>;

export const CompanyTimeline = async ({ items }: Props) => (
  <div className="max-w-4xl mx-auto">
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 md:-translate-x-1/2" />

      {/* Timeline items */}
      {items?.map((item, index) => (
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
