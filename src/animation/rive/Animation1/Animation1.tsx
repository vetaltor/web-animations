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
import { useCallback, useEffect } from 'react';

// preload wasm
RuntimeLoader.setWasmUrl(riveWASMResource);

export function Animation1() {
  const parameters = {
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
      // rive.resizeDrawingSurfaceToCanvas();
    },
  };

  const options = {
    fitCanvasToArtboardHeight: true,
  };
  const { RiveComponent, setCanvasRef, rive } = useRive(parameters, options);

  useEffect(() => {
    console.log(rive);
  }, [rive]);

  // const onRiveMount = useCallback(
  //   (riveComponent) => {
  //     console.log(riveComponent);
  //     console.log(rive);
  //   },
  //   [rive]
  // );

  // const bumpInput = useStateMachineInput(rive, 'State Machine 1', "bump");

  return (
    <RiveComponent
      className={s.riveComponent}
      onClick={() => {
        rive!.play();
        // stateMachineLoadInput = rive.stateMachineInputs('State Machine 1')[0];
        // stateMachineLoadInput.value = 1;
        // console.log(rive.animationNames);
      }}
    />
  );
}
