import {
  useRive,
  Layout,
  Fit,
  Alignment,
  RuntimeLoader,
} from '@rive-app/react-canvas';
import riveWASMResource from '@rive-app/canvas/rive.wasm';
import animation from './anim.riv';
import s from './Animation1.module.css';
import { useEffect } from 'react';

// preload wasm
RuntimeLoader.setWasmUrl(riveWASMResource);

export function Animation1() {
  const riveParams = {
    src: animation,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.TopCenter,
    }),
    autoplay: false,
    onLoad: () => {
      // console.log(e);
      // stateMachineLoadInput = rive.stateMachineInputs("ShimmerMachine")[0];
      // stateMachineLoadInput.value = 1;
    },
  };

  const useRiveOptions = {
    // fitCanvasToArtboardHeight: true,
  };

  const { RiveComponent, rive } = useRive(riveParams, useRiveOptions);

  useEffect(() => {
    if (!rive) {
      return;
    }
    console.log(rive);
  }, [rive]);

  // const bumpInput = useStateMachineInput(rive, 'State Machine 1', "bump");

  return (
    <RiveComponent
      className={s.riveComponent}
      onClick={() => {
        // rive?.play();
        rive?.pause(['Timeline 1']);
        rive?.scrub(['Timeline 1'], 4000);
        // console.log(rive?.durations);
        // console.log(rive?.frameCount);
        // console.log(rive?.frameTimes);
        // console.log(rive?.frameTime);
        // console.log(rive?.animationNames);

        // rive?.scrub();
        // rive!.play();
        // stateMachineLoadInput = rive.stateMachineInputs('State Machine 1')[0];
        // stateMachineLoadInput.value = 1;
        // console.log(rive.animationNames);
      }}
    />
  );
}
