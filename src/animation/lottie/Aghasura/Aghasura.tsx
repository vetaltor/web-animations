import Lottie from 'lottie-react';
import animation from './anim2.json';
import s from './Aghasura.module.css';
import { Screen } from '../../../component/Screen';

const interactivity = {
  mode: 'scroll',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 137],
    },
  ],
};

export function Aghasura() {
  return (
    <>
      <Screen>Scroll down</Screen>
      <Lottie
        className={s.lottie}
        assetsPath="images/"
        renderer="svg"
        animationData={animation}
        // style={style}
        loop={false}
        interactivity={interactivity as any}
      />
    </>
  );
}
