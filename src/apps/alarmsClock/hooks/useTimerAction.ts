import { expandedTimerAtom, timersAtom } from '../store';
import { useSetAtom } from 'jotai';
import { TimerState } from '../types';

type Props = {
  timer: TimerState;
  tIdx: number;
};

export default function useTimerAction(props: Props) {
  const { timer, tIdx } = props;
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
      clearInterval(timer.interval);
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
          let elapsedTime =
            draft[tIdx].elapsedTime +
            (new Date().getTime() - draft[tIdx].lastStartTime);

          if (Math.round(elapsedTime / 1000) >= draft[tIdx].totalSeconds) {
            draft[tIdx].isRunning = false;
            elapsedTime = 0;
            clearInterval(draft[tIdx].interval ?? interval);
          }

          draft[tIdx].lastStartTime = new Date().getTime();
          draft[tIdx].elapsedTime = elapsedTime;
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
