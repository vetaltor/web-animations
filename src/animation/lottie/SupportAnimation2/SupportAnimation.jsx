import animation from './support.json';
import '@lottiefiles/lottie-player';
import { useCallback } from 'react';
import './SupportAnimation.css';
import { create } from '@lottiefiles/lottie-interactivity';

const interactivity = {
  mode: 'scroll',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 91],
    },
  ],
};


export function SupportAnimation() {

  const url = `${process.env.PUBLIC_URL}/assets/support.json`;
  
  const callbackRef = useCallback((player) => {
    if (!player) {
      return;
    }

    player.addEventListener('load', function (e) {
      create({
        mode: 'scroll',
        // container: 'qwe',
        player: '#lottiePlayer',
        actions: [
          {
            visibility: [0, 1],
            type: 'seek',
            frames: [0, 91],
          },
        ],
      });

    });
  }, []);

  return (
    <div className="support__container" id="qwe">
      <lottie-player
        ref={callbackRef}
        id="lottiePlayer"
        controls
        mode="normal"
        src={url}
        className="support__lottie"
      ></lottie-player>
    </div>
  );
}
