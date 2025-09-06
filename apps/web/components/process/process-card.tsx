import { Clock, Code, FileText, Palette, Rocket } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Card, CardContent } from '@/components/shadcn/card';

import { Slide } from './process-section';

type Props = {
  slide: Slide;
};

// IMPROVEMENT #5: Modern card design with icons and better layout
const iconMap: Record<string, any> = {
  '01': Clock,
  '02': FileText,
  '03': Palette,
  '04': Code,
  '05': Rocket,
};

const emojiMap: Record<string, string> = {
  '01': '📞',
  '02': '📋',
  '03': '🎨',
  '04': '💻',
  '05': '🚀',
};

export const ProcessCard: React.FC<Props> = ({ slide }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const Icon = iconMap[slide.number] || Clock;
  const emoji = emojiMap[slide.number] || '⚡';

  return (
    <Card className="rounded-3xl pt-4 pb-4 border border-secondary shadow-sm hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-2">
        <div
          className={`flex flex-col gap-4 ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-2xl min-h-[250px] md:min-h-[300px] overflow-hidden`}
        >
          {/* Step Number Section - Simple original style */}
          <div className="bg-secondary p-6 rounded-lg flex flex-col justify-center items-center lg:min-w-[120px]">
            <p className="text-xs uppercase">Step</p>
            <div className="text-2xl text-primary font-black leading-none">{slide.number}</div>
          </div>

          {/* Content Section - Improved Design */}
          <div className="flex flex-col justify-between p-6 flex-1">
            {/* Tag with improved styling */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-7 h-7 bg-gradient-to-br from-primary/20 to-orange-200/40 rounded-lg flex items-center justify-center">
                  <span role="img" aria-label="step-emoji" className="text-base">
                    {emoji}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider leading-none mb-0.5">
                    Timeline
                  </span>
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    {slide.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Title and Description with better typography */}
            <div className="space-y-3">
              <div
                className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight flex-1">
                  {slide.title}
                </h2>
              </div>
              <p
                className={`text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none ${isRTL ? 'text-right' : ''}`}
              >
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
