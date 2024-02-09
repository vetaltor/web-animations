import { useEffect } from 'react';

type UseScrollListenerCallback = (
  percentage: number,
  direction: 'up' | 'down'
) => void;

export function useScrollListener(
  callback: UseScrollListenerCallback,
  deps: any[]
): void {
  let lastScrollTop = window.scrollY;
  let lastPercentage = 0;

  useEffect(() => {
    const scrollListener = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPercentage = Math.round(
        (scrollTop / (totalHeight - windowHeight)) * 100
      );

      if (lastPercentage === scrollPercentage) {
        return;
      }
      lastPercentage = scrollPercentage;

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
