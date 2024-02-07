import { useEffect } from 'react';

type UseScrollPercentageCallback = (
  percentage: number,
  direction: 'up' | 'down'
) => void;

export function useScrollPercentage(
  callback: UseScrollPercentageCallback,
  deps: any[]
): void {
  let lastScrollTop = window.scrollY;

  useEffect(() => {
    const scrollListener = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPercentage = Math.round(
        (scrollTop / (totalHeight - windowHeight)) * 100
      );
      const direction = scrollTop > lastScrollTop ? 'down' : 'up';
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      callback(scrollPercentage, direction);
    };
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [callback, ...deps]);
}
