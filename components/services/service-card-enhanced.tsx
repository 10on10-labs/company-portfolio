'use client';

import { useState } from 'react';
import { ServicesQueryResult } from '@/sanity.types';
import {
  Binary,
  Blocks,
  Boxes,
  Braces,
  BrainCircuit,
  Brush,
  ChevronDown,
  ChevronUp,
  Cloud,
  Code,
  Component,
  Database,
  Figma,
  FileCode2,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Layout,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react';

interface ServiceCardEnhancedProps {
  service: ServicesQueryResult[number];
  index: number;
  featured?: boolean;
}

const iconMap: Record<string, any> = {
  // Development
  'web development': Globe,
  'frontend development': Monitor,
  'backend development': Server,
  'full stack development': Layers,
  'mobile development': Smartphone,
  'app development': Smartphone,
  'ios development': Smartphone,
  'android development': Smartphone,

  // Design
  'ui/ux design': Palette,
  'ui design': Layout,
  'ux design': Users,
  'web design': Brush,
  'graphic design': PenTool,
  'product design': Figma,
  'design system': Component,

  // Technical
  'api development': Braces,
  'api integration': GitBranch,
  'database design': Database,
  'database management': Database,
  'cloud services': Cloud,
  devops: Workflow,
  microservices: Boxes,
  'system architecture': Binary,

  // Features & Services
  'e-commerce': ShoppingCart,
  ecommerce: ShoppingCart,
  'performance optimization': Gauge,
  'seo optimization': Search,
  security: Shield,
  authentication: Lock,
  'email integration': Mail,
  analytics: LineChart,
  'ai integration': BrainCircuit,

  // Other
  consulting: Lightbulb,
  maintenance: Wrench,
  testing: FileCode2,
  deployment: Rocket,
  'cms development': Blocks,
  wordpress: Globe,
  'custom development': Code,
  'software development': Terminal,

  // Default
  default: Code,
};

export default function ServiceCardEnhanced({
  service,
  index,
  featured = false,
}: ServiceCardEnhancedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (serviceName: string) => {
    const lowerName = serviceName?.toLowerCase() || '';

    // Check for exact match first
    if (iconMap[lowerName]) {
      return iconMap[lowerName];
    }

    // Check for partial matches
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        return icon;
      }
    }

    return iconMap.default;
  };

  const Icon = getIcon(service?.name || '');
  const hasMoreCategories = service?.categories && service.categories.length > 4;

  return (
    <div className="group h-full">
      <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 transition-transform transition-shadow duration-300 hover:shadow-xl shadow-sm flex flex-col transform-gpu">
        {/* Premium Badge for Featured */}
        {featured && index === 0 && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
              Popular
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Icon and Number Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              {/* Icon Container with Gradient Background */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 transform-gpu group-hover:scale-110">
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Service Number - More subtle */}
            <span className="text-3xl font-bold bg-gradient-to-br from-gray-200 to-gray-300 bg-clip-text text-transparent">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Service Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize group-hover:text-primary transition-colors duration-300">
            {service?.name}
          </h3>

          {/* Description */}
          {service?.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
              {service.description}
            </p>
          )}

          {/* Categories with Better Styling */}
          {service?.categories && service.categories.length > 0 && (
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap gap-2">
                {service.categories
                  .slice(0, isExpanded ? undefined : 4)
                  .map((category, catIndex) => (
                    <span
                      key={`${category}-${catIndex}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                    >
                      {category}
                    </span>
                  ))}

                {/* Show More/Less Button */}
                {hasMoreCategories && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                  >
                    {isExpanded ? (
                      <>
                        Show Less
                        <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        +{service.categories.length - 4} more
                        <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Accent Line */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Available</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-300"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
