// import animationData from './../../../assets/aghasura-final/data1.json';
import animationData from './../../../assets/aghasura-final/data-font.json';
// import animationData from './../../../assets/heart.json';
import s from './LottieWebSvg.module.css';
import { useScrollListener } from '../../../shared/hook/useScrollListener';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { lottieJsonReplace } from '../../../shared/lottie-json-replace';
import en from './i18n/en.json';
import ru from './i18n/ru.json';

import lottie from 'lottie-web';
import type {
  AnimationConfigWithData,
  AnimationItem,
  AnimationSegment,
} from 'lottie-web';

export function LottieWebSvg() {
  const currentTimeRef = useRef(0);
  const elem = useRef<HTMLDivElement | null>(null);
  const animation = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = elem.current!;
    // const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    animation.current = lottie.loadAnimation({
      renderer: 'svg',
      // autoplay: true,
      // loop: true,
      autoplay: false,
      loop: false,
      animationData: animationData,
      // path: 'https://assets2.lottiefiles.com/packages/lf20_0ypqp25v.json',
      container: container as Element,
      // rendererSettings: {
      //   className: svgStyles
      // }
      rendererSettings: {
        // context: canvas.getContext("2d")!,
        preserveAspectRatio: 'xMidYMid slice'
      }
    });

    // lottie.setQuality(2);

    return () => {
      animation.current?.destroy();
    };
  }, [elem, animation]);

  // const options = {
  //   animationData: currentAnimation,
  //   assetsPath: '',
  //   loop: false,
  //   // autoplay: true,
  //   autoplay: false,
  //   renderer: 'svg' as const,
  //   rendererSettings: {
  //     canvas: {
  //       progressiveLoad: true,
  //     },
  //     // svg: {
  //     //   preserveAspectRatio: 'xMidYMid slice'
  //     // }
  //   },
  //   audioFactory: createAudio,
  // };

  const style = {
    height: '100vh',
  };

  // const { View, goToAndStop } = useLottie(options as any, style);

  useScrollListener(
    (percentage, direction) => {
      const totalDurationSeconds = 360;
      const currentTime = (totalDurationSeconds / 100) * percentage;
      currentTimeRef.current = currentTime;
      // goToAndStop(currentTime, true);
      // console.log(currentTime);

      if (percentage >= 24 && percentage <= 34 && direction === 'down') {
        // audioPool.playSample(0, 0, 0, 1);
      }
      if (percentage >= 64 && percentage <= 74 && direction === 'down') {
        // audioPool.playSample(1);
      }
    },
    // [goToAndStop]
    []
  );

  // const lottieCalback = useCallback((lottie: any) => {
  //   if (lottie) {
  //   }
  // }, []);

  // useEffect(() => {
  //   const svg = document.querySelector('svg');
  //   if (!svg) {
  //     return;
  //   }

  //   svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  // }, [currentAnimation]);

  const setLanguage = (dictionary: any) => {
    // lottieJsonReplace(currentAnimation, dictionary);
    // setAnimation({...currentAnimation});
    // goToAndStop(currentTimeRef.current, true);
  };

  return (
    <>
      {/* <Screen>Scroll down</Screen> */}
      <div className={s.scrollContainer}>
        <div className={s.lottie}>
          <header className={s.header}>
            <button
              className={s.button}
              type="button"
              onClick={() => {
                setLanguage(en);
              }}
            >
              En
            </button>
            <button
              className={s.button}
              type="button"
              onClick={() => {
                setLanguage(ru);
              }}
            >
              Ru
            </button>
          </header>
        </div>
        <div
          // aria-label={title}
          // title={title}
          data-is-focusable={true}
          // className={className}
          ref={elem}
          // style={sizeStyle}
          // {...props.handlers}
        />
        {/* <canvas id="canvas" width={720} height={1280}/> */}
      </div>
    </>
  );
}

function createAudio(assetPath: string) {
  return new Howl({
    src: [assetPath],
  });
}
