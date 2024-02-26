import { useEffect, useState } from 'react';

export type Font = {
  family: string;
  url: string;
  weight: string;
  style: string;
};

export function useFont(font: Font) {
  const [loading, setLoading] = useState<FontFaceLoadStatus>('unloaded');

  useEffect(() => {
    const { family, url, ...descriptors} = font;
    const fontFace = new FontFace(family, `url(${url})`, descriptors);

    async function loadFontFace(fontFace: FontFace) {
      const loadedFont = await fontFace.load();
      document.fonts.add(loadedFont);
      setLoading('loaded');
    }

    loadFontFace(fontFace);
  }, [font]);

  return loading;
}
