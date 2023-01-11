import { useCallback } from 'react';
import { timersAtom } from '../store';
import { useSetAtom } from 'jotai';
import { TimerState } from '../types';

export default function useTimerAction(timer: TimerState, tIdx: number) {
  const updateTimers = useSetAtom(timersAtom);

  const pause = useCallback(() => {
    clearInterval(timer.interval);
    updateTimers((draft) => {
      draft[tIdx].isRunning = false;
      draft[tIdx].elapsedTime +=
        new Date().getTime() - draft[tIdx].lastStartTime;
    });
  }, [timer.interval, updateTimers, tIdx]);

  const start = useCallback(() => {
    updateTimers((draft) => {
      draft[tIdx].lastStartTime = new Date().getTime();
    });

    const interval = setInterval(
      (function _updateTimer() {
        updateTimers((draft) => {
          let elapsedTime =
            draft[tIdx].elapsedTime +
            (new Date().getTime() - draft[tIdx].lastStartTime);
          let isRunning = true;

          if (Math.round(elapsedTime / 1000) >= draft[tIdx].totalSeconds) {
            clearInterval(draft[tIdx].interval ?? interval);
            isRunning = false;
            elapsedTime = 0;
          }

          draft[tIdx].lastStartTime = new Date().getTime();
          draft[tIdx].elapsedTime = elapsedTime;
          draft[tIdx].isRunning = isRunning;
          draft[tIdx].interval = interval;
        });
        return _updateTimer;
      })(),
      1000
    );
  }, [tIdx, updateTimers]);

  return { pause, start };
}
