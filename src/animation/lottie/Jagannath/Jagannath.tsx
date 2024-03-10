import Lottie, { useLottie } from 'lottie-react';
import animation from './../../../assets/jagannath/jagannath-full.json';
import s from './Jagannath.module.css';
import { useScrollListener } from '../../../shared/hook/useScrollListener';
// import { lottieJsonReplace, textUpdate } from '../../../shared/lottie-json-replace';

let prevFrame = 0;

export function Jagannath() {
  const options = {
    animationData: animation,
    // path: process.env.PUBLIC_URL + '/assets/jagannath/data-img.json',
    // assetsPath: './build/assets/jagannath/images/',
    loop: false,
    // autoplay: true,
    autoplay: false,
    renderer: 'svg',
    rendererSettings: {
      progressiveLoad: true,
      preserveAspectRatio: 'xMidYMid slice',
    },
    // audioFactory: createAudio,
  };

  const style = {
    height: '100vh',
  };

  const lottie = useLottie(options as any, style);
  const { View, goToAndStop, animationItem } = lottie;
  // console.log(lottie);

  useScrollListener(
    (percentage, direction) => {
      const totalFrames = (animation as any).op;
      const currentFrame = Math.round((totalFrames / 100) * percentage);
      if (currentFrame === prevFrame) {
        return;
      }
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

  // useEffect(() => {
  //   const svg = document.querySelector('svg');
  //   if (!svg) {
  //     return;
  //   }

  //   svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  // }, []);

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
