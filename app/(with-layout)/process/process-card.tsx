import { Card, CardContent } from '@/components/shadcn/card';

import { Slide } from './process-section';

type Props = {
  slide: Slide;
};

export const ProcessCard: React.FC<Props> = ({ slide }) => {
  return (
    <Card className="rounded-3xl  pt-4 pb-4 border border-secondary shadow-sm">
      <CardContent className="p-2">
        <div className="flex flex-col gap-4 lg:flex-row bg-white rounded-lg min-h-[250px] md:min-h-[280px]">
          <div className="bg-secondary p-6 rounded-lg flex flex-col justify-center items-center">
            <p className="text-xs uppercase">Step</p>
            <div className="text-2xl  font-black leading-none">{slide.number}</div>
          </div>
          <div className="flex flex-col gap-4 justify-between p-2">
            <div className="text-xs flex items-center">
              <span role="img" aria-label="calendar">
                🗓
              </span>
              <span className="text-xs sm:text-sm font-medium">{slide.tag}</span>
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-black mb-2">{slide.title}</h2>
              <p className="text-sm md:text-base line-clamp-3 md:line-clamp-none">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
