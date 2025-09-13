'use client';

import { useTheme } from '@/hooks/use-theme';

export function ThemeBackground() {
  const { theme } = useTheme();

  // Determine if we're in dark mode (either explicitly dark or system with dark preference)
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 20% 30%, rgba(255, 126, 0, 0.3) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.2) 0%, transparent 40%)'
            : 'radial-gradient(circle at 20% 30%, rgba(255, 126, 0, 0.5) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.3) 0%, transparent 40%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Neural Network Pattern */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="neural-net"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <g fill={isDark ? '#ff7e00' : '#ff7e00'} r="2">
                <circle cx="50" cy="50" r="2" />
                <circle cx="15" cy="15" r="2" />
                <circle cx="85" cy="15" r="2" />
                <circle cx="15" cy="85" r="2" />
                <circle cx="85" cy="85" r="2" />
              </g>

              <g stroke={isDark ? '#ff7e00' : '#ff7e00'} strokeWidth={isDark ? '0.3' : '0.5'}>
                <g opacity={isDark ? '0.4' : '0.6'}>
                  <line x1="50" y1="50" x2="15" y2="15" />
                  <line x1="50" y1="50" x2="85" y2="15" />
                  <line x1="50" y1="50" x2="15" y2="85" />
                  <line x1="50" y1="50" x2="85" y2="85" />
                </g>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
      </div>
    </>
  );
}
