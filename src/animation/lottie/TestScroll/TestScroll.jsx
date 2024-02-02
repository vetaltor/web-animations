import Lottie from 'lottie-react';
import animation from './data2.json';
// import animation from '../assets/Animation - 1704044690824.json';
import './TestScroll.css';

const style = {
  maxWidth: '800px',
  margin: '0 auto',
  height: '300vh',
};

const interactivity = {
  mode: 'scroll',
  actions: [
    // {
    //   visibility: [0, 0.33],
    //   type: 'seek',
    //   frames: [0],
    // },
    {
      visibility: [0, 0.75],
      type: 'seek',
      frames: [0, 360],
    },
    {
      visibility: [0.75, 1],
      type: 'stop',
      frames: [360],
    },
  ],
};

export function TestScroll() {
  return (
    <>
      <div className="empty"></div>
      <Lottie
        animationData={animation}
        style={style}
        loop={false}
        interactivity={interactivity}
      />
      <div className="empty"></div>
    </>
  );
}
