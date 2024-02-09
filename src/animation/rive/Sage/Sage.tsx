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
// import animation from './sage.riv';
import animation from './final.riv';
import walkAudio from './audio/walk.mp3';
import halloAudio from './audio/hallo.mp3';
// import en from './locale/en.json';
// import ru from './locale/ru.json';
import en from './locale/final/en.json';
import ru from './locale/final/ru.json';
import s from './Sage.module.css';
import { useEffect } from 'react';
import { AudioPool } from '../../../shared/audio/AudioPool';
import { useScrollListener } from '../../../shared/hook/useScrollListener';

// preload wasm
RuntimeLoader.setWasmUrl(riveWASMResource);

const audioPool = new AudioPool([walkAudio, halloAudio]);

let lastPercentage = 0;
let prevTime = 0;

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
      rive.pause('Main');
      // rive.play('Main');
      // rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive]);

  useEffect(() => {
    audioPool.setup();
  }, []);

  useScrollListener(
    (percentage, direction) => {
      const totalDurationSeconds = 6;
      const currentTime = (totalDurationSeconds / 100) * percentage;

      if (rive) {
        if (Math.abs(lastPercentage - percentage) === 1) {
          prevTime = (totalDurationSeconds / 100) * lastPercentage;
          // const diff = (currentTime - prevTime) / 2;
          // const addedTime = prevTime + diff;
          const addedTimes = generatePoints(prevTime, currentTime, 2);
          for (let i = 0; i < addedTimes.length; i++) {
            // timeout(() => {
              rive.scrub('Main', addedTimes[i]);
            //   console.log(`${percentage}%`, `${addedTimes[i]}s`);
            // }, i * 50);
          }
          // rive.scrub('Main', currentTime);
          // console.log(`${percentage}%`, `${currentTime}s`);
        } else {
          rive.scrub('Main', currentTime);
          // console.log(`${percentage}%`, `${currentTime}s`);
        }

        lastPercentage = percentage;

        // rive.scrub('Main', currentTime);

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

function generatePoints(min: number, max: number, steps: number): number[] {
  const step = (max - min) / steps;
  const res = [];
  for (let i = 1; i <= steps; i++) {
    res.push(min + step * i)
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
    clearTimeout(id)
  }, timeout);
}


