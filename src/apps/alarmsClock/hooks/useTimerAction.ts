import { expandedTimerAtom, timersAtom } from '../store';
import { useSetAtom } from 'jotai';

export default function useTimerAction(tIdx: number) {
  const updateTimers = useSetAtom(timersAtom);
  const setExpandedTimer = useSetAtom(expandedTimerAtom);

  const restore = () => {
    setExpandedTimer(null);
  };

  const expand = () => {
    setExpandedTimer(tIdx);
  };

  const reset = () => {
    updateTimers((draft) => {
      draft[tIdx].elapsedTime = 0;
    });
  };

  const pause = () => {
    updateTimers((draft) => {
      draft[tIdx].isRunning = false;
      clearInterval(draft[tIdx].interval);
      draft[tIdx].elapsedTime +=
        new Date().getTime() - draft[tIdx].lastStartTime;
    });
  };

  const start = () => {
    updateTimers((draft) => {
      draft[tIdx].lastStartTime = new Date().getTime();
      draft[tIdx].isRunning = true;
    });

    const interval = setInterval(
      (function _updateTimer() {
        updateTimers((draft) => {
          const elapsedTime =
            draft[tIdx].elapsedTime +
            (new Date().getTime() - draft[tIdx].lastStartTime);

          if (Math.round(elapsedTime / 1000) >= draft[tIdx].totalSeconds) {
            draft[tIdx].isRunning = false;
            draft[tIdx].elapsedTime = 0;
            draft[tIdx].lastStartTime = 0;
            clearInterval(draft[tIdx].interval);
          } else {
            draft[tIdx].lastStartTime = new Date().getTime();
            draft[tIdx].elapsedTime = elapsedTime;
          }
        });
        return _updateTimer;
      })(),
      1000
    );

    updateTimers((draft) => {
      draft[tIdx].interval = interval;
    });
  };

  return { pause, start, reset, expand, restore };
}
