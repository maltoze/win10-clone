import {
  HeightIcon,
  PauseIcon,
  ResetIcon,
  PlayIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { secondsToTime } from '../../../utils';
import useTimerAction from '../hooks/useTimerAction';
import { TimerState } from '../types';
import CircleProgress from './CircleProgress';
import cx from 'classnames';

type Props = {
  timer: TimerState;
  timerIdx: number;
};

const Timer = ({ timer, timerIdx }: Props) => {
  const { pause, start, reset } = useTimerAction(timer, timerIdx);
  const progress = timer.elapsedTime / (timer.totalSeconds * 1000);

  let to: number | null = null;
  if (timer.isRunning) {
    if (progress === 0) {
      to = 0;
    } else {
      to = 100;
    }
  } else {
    if (progress === 0) {
      to = null;
    } else {
      to = 100 * progress;
    }
  }

  const handleToggleTimer = () => {
    timer.isRunning ? pause() : start();
  };

  return (
    <div className="pointer-events-none p-1.5 transition-colors duration-100 ease-out hover:rounded-sm hover:bg-zinc-750 hover:shadow hover:delay-75">
      <div className="pointer-events-auto rounded-sm bg-zinc-750 py-2 pl-4 pr-2 shadow hover:rounded-none hover:shadow-none">
        <div className="flex justify-between">
          <div className="select-none text-sm">{timer.name}</div>
          <div className="p-1.5 hover:bg-zinc-700">
            <HeightIcon className="h-6 w-6 rotate-45" />
          </div>
        </div>

        <div className="relative">
          <CircleProgress
            value={to}
            duration={timer.totalSeconds * 1000 * (1 - progress)}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-4xl ">
            {secondsToTime(
              Math.round(timer.totalSeconds - timer.elapsedTime / 1000)
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 py-2">
          <button
            className="flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-blue-500 shadow hover:bg-blue-400"
            onClick={handleToggleTimer}
          >
            {timer?.isRunning ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </button>
          <button
            className={cx(
              'flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-zinc-500 shadow',
              { 'hover:bg-zinc-600': progress !== 0 || timer.isRunning }
            )}
            onClick={reset}
          >
            <ResetIcon
              className={cx('h-6 w-6 ', {
                'text-zinc-400': progress === 0 && !timer.isRunning,
                'text-zinc-100': timer.isRunning || progress !== 0,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Timer);
