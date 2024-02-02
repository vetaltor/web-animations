import Lottie from 'lottie-react';
import animation from './support.json';
import './SupportAnimation.css';

const interactivity = {
  mode: 'scroll',
  actions: [
     {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 91]
    }
  ],
};

export function SupportAnimation() {
	return (
		<div className="support__container">
    <Lottie className="support__lottie"
        animationData={animation}
        // style={style}
        loop={false}
        interactivity={interactivity}
      />  
    </div>);
		
}