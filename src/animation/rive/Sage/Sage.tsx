import {
  useRive,
  Layout,
  Fit,
  Alignment,
  RuntimeLoader,
  EventType,
  Event,
  RiveEventPayload,
  RiveEventType,
  Rive,
} from '@rive-app/react-canvas';
import riveWASMResource from '@rive-app/canvas/rive.wasm';
import animation from './sage.riv';
import walkAudio from './audio/walk.mp3';
import halloAudio from './audio/hallo.mp3';
import en from './locale/en.json';
import ru from './locale/ru.json';
import s from './Sage.module.css';
import { useEffect } from 'react';
import { AudioPool } from '../../../shared/audio/AudioPool';
import { useScrollPercentage } from '../../../shared/hook/useScrollPercentage';

// preload wasm
RuntimeLoader.setWasmUrl(riveWASMResource);

const audioPool = new AudioPool([walkAudio, halloAudio]);

export function Sage() {
  const riveParams = {
    src: animation,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
    autoplay: false,
    onLoad: () => {},
  };

  const useRiveOptions = {
    // fitCanvasToArtboardHeight: true,
  };

  const { RiveComponent, rive } = useRive(riveParams, useRiveOptions);

  const onRiveEvent = (riveEvent: Event) => {
    console.log(riveEvent);
    const data = riveEvent.data as RiveEventPayload;
    if (data.type === RiveEventType.General) {
      const { properties } = data;
      // if (properties!.position === 0) {
      //   playAudio(walkAudio);
      // }
      // if (properties!.position === 1) {
      //   playAudio(halloAudio);
      // }
    }
  };

  useEffect(() => {
    if (rive) {
      console.log(rive);
      rive.on(EventType.RiveEvent, onRiveEvent);
      // rive.on(EventType.Advance, (evt: any) => {console.log(evt)});
      rive.pause('Timeline 1');
      rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive]);

  useEffect(() => {
    audioPool.setup();
  }, []);

  useScrollPercentage(
    (percentage, direction) => {
      const totalDurationSeconds = 4;
      const currentTime = (totalDurationSeconds / 100) * percentage;
      if (rive) {
        rive.scrub('Timeline 1', currentTime);
        if (percentage >= 24 && percentage <= 34 && direction === 'down') {
          audioPool.playSample(0, 0, 0, 1);
        }
        if (percentage >= 64 && percentage <= 74 && direction === 'down') {
          audioPool.playSample(1);
        }
      }
    },
    [rive]
  );

  const setLanguage = (translations: Record<string, string>) => {
    translateArtboard(rive as Rive, translations);
  };

  // const bumpInput = useStateMachineInput(rive, 'State Machine 1', "bump");

  return (
    <>
      <div className={s.scrollContainer}>
        <div className={s.fixed}>
          <header className={s.header}>
            <button
              className={s.button}
              type="button"
              onClick={() => {
                setLanguage(en);
              }}
            >
              En
            </button>
            <button
              className={s.button}
              type="button"
              onClick={() => {
                setLanguage(ru);
              }}
            >
              Ru
            </button>
          </header>
          <RiveComponent
            className={s.root}
            onClick={() => {
              if (!rive) {
                return;
              }
              // rive.play();

              // rive.scrub('Timeline 1', 1);
              // rive.setTextRunValue(
              //   'samurai has no goal',
              //   'A samurai has no goal. There is only a way.'
              // );

              // rive?.pause('Timeline 1');
              // rive?.scrub('Timeline 1', 4000);
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
        </div>
      </div>
    </>
  );
}

function translateArtboard(
  rive: Rive,
  translations: Record<string, string>
): void {
  rive.play();
  for (const [key, value] of Object.entries(translations)) {
    if (rive.getTextRunValue(key)) {
      rive.setTextRunValue(key, value);
    }
  }
  rive.pause();
}
