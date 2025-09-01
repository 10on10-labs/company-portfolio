'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { routing } from '@/src/i18n/routing';
import { ChevronDown, Globe } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // Language display config
  const languageConfig = {
    en: { label: 'EN', flag: '🇺🇸', name: 'English' },
    ar: { label: 'العربية', flag: '🇸🇦', name: 'Arabic' },
  };

  function onSelectChange(nextLocale: string) {
    // Extract dynamic route parameters (excluding locale)
    const routeParams = Object.fromEntries(
      Object.entries(params).filter(([key]) => key !== 'locale'),
    );

    router.replace(
      // @ts-ignore - pathname with params will be handled correctly by next-intl
      { pathname, params: routeParams },
      { locale: nextLocale },
    );
    setIsOpen(false);
  }

  const currentLanguage = languageConfig[locale as keyof typeof languageConfig];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/20 transition-all duration-200 min-w-[80px] lg:min-w-[80px]"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentLanguage.label}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 min-w-[140px]">
            {routing.locales.map(cur => {
              const lang = languageConfig[cur as keyof typeof languageConfig];
              const isActive = cur === locale;

              return (
                <button
                  key={cur}
                  onClick={() => onSelectChange(cur)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    isActive ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700'
                  }`}
                  disabled={isActive}
                >
                  <span className="text-base">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.label}</span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                  {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
