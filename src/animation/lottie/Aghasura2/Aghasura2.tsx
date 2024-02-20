import Lottie, { useLottie } from 'lottie-react';
// import animation from './../../../assets/aghasura-final/data.json';
// import animation from './../../../assets/aghasura-final/Canvas.json';
// import animation from './../../../assets/aghasura-final/data.json';
import animation from './../../../assets/aghasura-final/aghasura-audio.json';
import s from './Aghasura2.module.css';
import { Screen } from '../../../component/Screen';
import { useScrollListener } from '../../../shared/hook/useScrollListener';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler';
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

export function Aghasura2() {
  const options = {
    animationData: animation,
    assetsPath: '',
    loop: false,
    autoplay: false,
    renderer: 'svg' as const,
    rendererSettings: {
      canvas: {
        progressiveLoad: true,
      },
    },
    audioFactory: createAudio,
  };

  const style = {
    height: '100vh'
  };

  const { View, goToAndStop } = useLottie(options as any, style);

  useScrollListener(
    (percentage, direction) => {
      const totalDurationSeconds = 360;
      const currentTime = (totalDurationSeconds / 100) * percentage;
      goToAndStop(currentTime, true);
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

  return (
    <>
      {/* <Screen>Scroll down</Screen> */}
      <div className={s.scrollContainer}>
        <div className={s.lottie}>
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
