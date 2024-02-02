import Lottie from 'lottie-react';
import animation from './steady-cam.json';
import './SteadyCam.css';

const interactivity = {
  mode: 'scroll',
  actions: [
    {
      visibility: [0, 0.25],
      type: 'seek',
      frames: [0],
    },
    {
      visibility: [0.25, 1],
      type: 'seek',
      frames: [0, 180],
    },
    // {
    //   visibility: [0.75, 1],
    //   type: 'stop',
    //   frames: [180],
    // },
  ],
};

export function SteadyCam() {
  return (
    <>
      <div className="empty">Start</div>
      <Lottie
        className="lottie"
        animationData={animation}
        // style={style}
        loop={false}
        interactivity={interactivity}
      />
      <div className="empty">End</div>
    </>
  );
}
