import Lottie, { useLottie } from 'lottie-react';
// import animation from './../../../assets/aghasura-final/data.json';
// import animation from './../../../assets/aghasura-final/Canvas.json';
// import animation from './../../../assets/aghasura-final/data.json';
import animation from './../../../assets/data.json';
// import animation from './../../../assets/aghasura-final/data-font.json';
// import animation from './../../../assets/aghasura-final/data-null.json';
// import animation from './../../../assets/aghasura-final/data-images.json';
import s from './Aghasura2.module.css';
import { useScrollListener } from '../../../shared/hook/useScrollListener';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { lottieJsonReplace, textUpdate } from '../../../shared/lottie-json-replace';
import en from './i18n/en.json';
import ru from './i18n/ru.json';

// import type {AnimationItem} from '@lottiefiles/react-lottie-player';

// const interactivity = {
//   mode: 'scroll',
//   actions: [
//     {
//       visibility: [0, 1],
//       type: 'seek',
//       frames: [0, 360],
//     },
//   ],
// };

let prevFrame = 0;

export function Aghasura2() {
  const currentTimeRef = useRef(0);

  const options = {
    animationData: animation,
    // path: process.env.PUBLIC_URL + '/assets/data-font.json',
    // assetsPath: './build/images/',
    loop: false,
    // autoplay: true,
    autoplay: false,
    renderer: 'svg',
    rendererSettings: {
      progressiveLoad: true,
      preserveAspectRatio: 'xMidYMid slice',
    },
    audioFactory: createAudio,
  };

  const style = {
    height: '100vh',
  };

  const lottie = useLottie(options as any, style);
  const { View, goToAndStop, animationItem } = lottie;
  console.log(lottie);

  useScrollListener(
    (percentage, direction) => {
      const totalFrames = 360;
      const currentFrame = Math.round((totalFrames / 100) * percentage);
      if (currentFrame === prevFrame) {
        return;
      }
      // console.log(currentFrame);
      prevFrame = currentFrame;
      currentTimeRef.current = currentFrame;
      goToAndStop(currentFrame, true);
      // console.log(currentTime);

      if (percentage >= 24 && percentage <= 34 && direction === 'down') {
        // audioPool.playSample(0, 0, 0, 1);
      }
      if (percentage >= 64 && percentage <= 74 && direction === 'down') {
        // audioPool.playSample(1);
      }
    },
    [goToAndStop]
  );

  // const lottieCalback = useCallback((lottie: any) => {
  //   if (lottie) {
  //   }
  // }, []);

  useEffect(() => {
    const svg = document.querySelector('svg');
    if (!svg) {
      return;
    }

    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  }, []);

  const setLanguage = (dictionary: any) => {
    textUpdate(animationItem!.renderer, dictionary);

    // repaint current frame
    goToAndStop(currentTimeRef.current + 1, true);
    goToAndStop(currentTimeRef.current, true);
    // lottieJsonReplace(currentAnimation, dictionary);
    // setAnimation({ ...currentAnimation });
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
          {/* <Player
          autoplay
            lottieRef={lottieCalback}
            src={animation}
            // style={{ height: '300px', width: '300px' }}
          /> */}
          {View}
          {/* <View
          className={s.lottie}
          // assetsPath="assets/aghasura-final/images/"
          // animationData={animation}
          // style={style}
          // loop={false}
          // interactivity={interactivity as any}
        /> */}
        </div>
      </div>
    </>
  );
}

function createAudio(assetPath: string) {
  return new Howl({
    src: [assetPath],
  });
}
