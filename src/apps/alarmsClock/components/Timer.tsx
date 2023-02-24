import {
  HeightIcon,
  PauseIcon,
  ResetIcon,
  PlayIcon,
} from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import { secondsToTime } from '../../../utils';
import useTimerAction from '../hooks/useTimerAction';
import { TimerState } from '../types';
import CircleProgress from './CircleProgress';
import cx from 'classnames';
import { useAtomValue } from 'jotai';
import { expandedTimerAtom } from '../store';
import { TbArrowsDiagonalMinimize2 } from 'react-icons/tb';
import { motion, useAnimationControls } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  timer: TimerState;
  tIdx: number;
};

const Timer = ({ timer, tIdx }: Props) => {
  const controls = useAnimationControls();

  const { pause, start, reset, expand, restore } = useTimerAction(tIdx);
  const progress = timer.elapsedTime / (timer.totalSeconds * 1000);

  const expandedTimer = useAtomValue(expandedTimerAtom);
  const isExpanded = expandedTimer !== null;
  const isExpandedTimer = expandedTimer === tIdx;

  const handleToggleTimer = useDebouncedCallback(
    () => {
      if (timer.isRunning) {
        pause();
      } else {
        start();
      }
    },
    300,
    { leading: true }
  );

  useEffect(() => {
    if (timer.elapsedTime === 0) {
      // cancel animation
      controls.stop();
      controls.set({ strokeDashoffset: 0 });
    }
  }, [controls, timer.elapsedTime]);

  useEffect(() => {
    if (timer.isRunning) {
      controls.start({
        strokeDashoffset: 100,
        transition: {
          duration: timer.totalSeconds - timer.elapsedTime / 1000,
          ease: 'linear',
        },
      });
    } else {
      controls.stop();
    }
  }, [timer.isRunning, controls, timer.totalSeconds, timer.elapsedTime]);

  if ((isExpanded && isExpandedTimer) || !isExpanded) {
    return (
      <div
        className={cx({
          'pointer-events-none p-1.5 transition-colors duration-100 ease-out hover:rounded-sm hover:bg-zinc-750 hover:shadow hover:delay-75':
            !isExpanded,
          'flex h-full items-center justify-center': isExpanded,
        })}
      >
        <div
          className={cx('pointer-events-auto h-full', {
            'rounded-sm bg-zinc-750 pb-2 pt-1 shadow hover:rounded-none hover:shadow-none':
              !isExpanded,
            'flex flex-col items-center justify-center py-10 px-8 supports-container:w-full supports-container:@2xl:w-8/12 supports-container:@5xl:w-7/12':
              isExpanded,
          })}
        >
          <div className="flex w-full grow flex-col">
            <div className="flex w-full grow-0 justify-between pl-4 pr-1">
              <div className="flex select-none items-center text-sm">
                {!isExpandedTimer && timer.name}
              </div>
              <motion.button
                layout="position"
                transition={{ duration: isExpanded ? 0.3 : 0 }}
                className="cursor-default p-1.5 hover:bg-zinc-700"
                onClick={isExpandedTimer ? restore : expand}
              >
                {isExpandedTimer ? (
                  <TbArrowsDiagonalMinimize2 className="h-6 w-6 stroke-[1.5]" />
                ) : (
                  <HeightIcon className="h-6 w-6 rotate-45 stroke-[1.5]" />
                )}
              </motion.button>
            </div>

            <div
              className={cx(
                'relative flex grow items-center justify-center px-8 pb-2',
                {
                  'h-56 w-72': !isExpandedTimer,
                  'w-full': isExpandedTimer,
                }
              )}
            >
              <motion.div
                layout="position"
                transition={{ duration: isExpanded ? 0.3 : 0 }}
                className={cx('select-none text-4xl', {
                  'text-6xl': isExpandedTimer,
                })}
              >
                {secondsToTime(
                  Math.round(timer.totalSeconds - timer.elapsedTime / 1000)
                )}
              </motion.div>
              <CircleProgress
                className={cx('absolute top-0', {
                  'h-56 w-56': !isExpandedTimer,
                  'h-full w-full py-6': isExpandedTimer,
                })}
                controls={controls}
                strokeDashoffset={progress * 100}
                isRunning={timer.isRunning}
              />
            </div>
          </div>

          <motion.div
            layout="position"
            transition={{ duration: isExpanded ? 0.3 : 0 }}
            className="z-10 flex grow-0 justify-center space-x-4 py-2"
          >
            <button
              className={cx(
                'flex cursor-default items-center justify-center rounded-full bg-blue-500 shadow hover:bg-blue-400',
                { 'h-14 w-14': isExpanded, 'h-10 w-10': !isExpanded }
              )}
              onClick={handleToggleTimer}
              title={timer.isRunning ? 'Pause' : 'Start'}
            >
              {timer.isRunning ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>
            <button
              className={cx(
                'flex cursor-default items-center justify-center rounded-full bg-zinc-500 shadow',
                {
                  'hover:bg-zinc-600': progress !== 0 || timer.isRunning,
                  'h-14 w-14': isExpanded,
                  'h-10 w-10': !isExpanded,
                }
              )}
              onClick={reset}
              disabled={timer.elapsedTime === 0}
              title="Reset"
            >
              <ResetIcon
                className={cx('h-6 w-6 ', {
                  'text-zinc-400': progress === 0 && !timer.isRunning,
                  'text-zinc-100': timer.isRunning || progress !== 0,
                })}
              />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(Timer);
