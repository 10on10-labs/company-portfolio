'use client';

import { useEffect, useState } from 'react';

// Base responsive hook that handles window resizing
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Specific breakpoint hooks
export function useIsMobile() {
  const { width } = useWindowSize();
  return width < 768; // md breakpoint
}

export function useIsTablet() {
  const { width } = useWindowSize();
  return width >= 768 && width < 1024; // between md and lg
}

export function useIsDesktop() {
  const { width } = useWindowSize();
  return width >= 1024; // lg and above
}

// You can add more specific breakpoints as needed
export function useIsSmallMobile() {
  const { width } = useWindowSize();
  return width < 640; // sm breakpoint
}
