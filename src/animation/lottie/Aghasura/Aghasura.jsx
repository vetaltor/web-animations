import Lottie from 'lottie-react';
import animation from './anim2.json';
// import './SupportAnimation.css';

const interactivity = {
  mode: 'scroll',
  actions: [
     {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 75]
    }
  ],
};

export function Aghasura() {
	return (
		<div className="support__container">
    <Lottie className="support__lottie" assetsPath='images/' renderer='svg'
        animationData={animation}
        // style={style}
        loop={false}
        interactivity={interactivity}
      />  
    </div>);
		
}