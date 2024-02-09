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
  useStateMachineInput,
} from '@rive-app/react-canvas';
import riveWASMResource from '@rive-app/canvas/rive.wasm';
// import animation from './sage.riv';
import animation from './scrub-blend.riv';
import walkAudio from './audio/walk.mp3';
import halloAudio from './audio/hallo.mp3';
// import en from './locale/en.json';
// import ru from './locale/ru.json';
import en from './locale/final/en.json';
import ru from './locale/final/ru.json';
import s from './Blend.module.css';
import { useEffect } from 'react';
import { AudioPool } from '../../../shared/audio/AudioPool';
import { useScrollListener } from '../../../shared/hook/useScrollListener';

// preload wasm
RuntimeLoader.setWasmUrl(riveWASMResource);

const audioPool = new AudioPool([walkAudio, halloAudio]);

let lastPercentage = 0;
let prevTime = 0;

export function Blend() {
  const riveParams = {
    src: animation,
    artboard: 'Blend',
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
    onLoad: () => {},
  };

  const useRiveOptions = {
    // fitCanvasToArtboardHeight: true,
  };

  const { RiveComponent, rive } = useRive(riveParams, useRiveOptions);
  const scrollInput = useStateMachineInput(
    rive,
    'State Machine 1',
    'ScrollPercentage'
  );

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
      // rive.pause('Main');
      // rive.play('Main');
      // rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive]);

  useEffect(() => {
    // audioPool.setup();
  }, []);

  useScrollListener(
    (percentage, direction) => {
      const totalDurationSeconds = 6;
      const currentTime = (totalDurationSeconds / 100) * percentage;

      if (rive) {
        if (scrollInput) {
          scrollInput.value = percentage;
        }
        lastPercentage = percentage;

        if (percentage >= 24 && percentage <= 34 && direction === 'down') {
          // audioPool.playSample(0, 0, 0, 1);
        }
        if (percentage >= 64 && percentage <= 74 && direction === 'down') {
          // audioPool.playSample(1);
        }
      }
    },
    [rive]
  );

  const setLanguage = (translations: Record<string, string>) => {
    translateArtboard(rive as Rive, translations);
  };

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
          <RiveComponent className={s.root} />
        </div>
      </div>
    </>
  );
}

function translateArtboard(
  rive: Rive,
  translations: Record<string, string>
): void {
  for (const [key, value] of Object.entries(translations)) {
    if (rive.getTextRunValue(key)) {
      rive.setTextRunValue(key, value);
    }
  }
}

function generatePoints(min: number, max: number, steps: number): number[] {
  const step = (max - min) / steps;
  const res = [];
  for (let i = 1; i <= steps; i++) {
    res.push(min + step * i);
  }

  return res;
}

function executeWithInterval(func: any, interval: number, times: number) {
  let counter = 0;
  const intervalId = setInterval(() => {
    func();
    counter++;
    if (counter === times) {
      clearInterval(intervalId);
    }
  }, interval);
}

function timeout(func: any, timeout: number) {
  const id = setTimeout(() => {
    func();
    clearTimeout(id);
  }, timeout);
}
