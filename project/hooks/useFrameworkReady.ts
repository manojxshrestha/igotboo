import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  const mounted = useRef(true);

  useEffect(() => {
    if (mounted.current && window.frameworkReady) {
      setTimeout(() => {
        if (mounted.current) {
          window.frameworkReady();
        }
      }, 0);
    }

    return () => {
      mounted.current = false;
    };
  }, []);
}