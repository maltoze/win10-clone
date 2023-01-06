import {
  ClockIcon,
  CountdownTimerIcon,
  HamburgerMenuIcon,
  LapTimerIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { useImmer } from 'use-immer';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';
import Timer from './components/Timer';
import { TimerState } from './types';

const sidebarItems = [
  { label: 'Timer', icon: LapTimerIcon },
  { label: 'Alarm', icon: TimerIcon },
  {
    label: 'World Clock',
    icon: ClockIcon,
  },
  {
    label: 'Stopwatch',
    icon: CountdownTimerIcon,
  },
];

const defaultTimerMinutes = [1, 5, 3, 10];
const defaultTimer: TimerState[] = defaultTimerMinutes.map((minute) => ({
  totalSeconds: minute * 60,
  isRunning: false,
  elapsedTime: 0,
  lastStartTime: 0,
  name: `${minute} min`,
}));

export default function AlarmsClock() {
  const { close } = useStore((state) => ({
    close: () => state.close('alarmsClock'),
  }));

  const [timers, updateTimers] = useImmer<TimerState[]>(defaultTimer);

  const handleOnToggleTimer = (tIdx: number) => {
    if (timers[tIdx].isRunning) {
      clearInterval(timers[tIdx].interval);
      updateTimers((draft) => {
        draft[tIdx].isRunning = false;
        draft[tIdx].elapsedTime +=
          new Date().getTime() - draft[tIdx].lastStartTime;
      });
      return;
    }

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
  };

  return (
    <div className="flex h-full cursor-default text-zinc-100 @container">
      <div className="w-12 bg-zinc-750 shadow @5xl:w-56">
        <div className="alarmsClock-drag-handle flex h-10 items-center px-3 text-xs">
          <span className="hidden select-none @5xl:inline-block">
            Alarms & Clock
          </span>
          <HamburgerMenuIcon className="inline-block h-5 w-5 @5xl:hidden" />
        </div>
        <div className="text-sm">
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              className="group flex items-center space-x-3 py-2 pl-1 pr-8 hover:bg-zinc-700"
            >
              {item.icon && (
                <div className="relative py-1">
                  <div className="absolute top-0 h-full rounded group-first:w-0.5 group-first:bg-blue-500"></div>
                  <item.icon className="ml-2 h-[18px] w-[18px] text-zinc-200" />
                </div>
              )}
              <span className="hidden select-none @5xl:inline-block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex grow flex-col bg-zinc-800">
        <div className="alarmsClock-drag-handle flex h-10 justify-between">
          <div className="ml-1.5 pt-3 pl-4 text-xs text-zinc-200 ">
            <span className="inline-block select-none @5xl:hidden">
              Alarms & Clock
            </span>
          </div>
          <div>
            <WindowCloseButton
              onTouchEnd={() => close()}
              onClick={() => close()}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 overflow-y-auto px-4 scrollbar scrollbar-track-zinc-800 scrollbar-thumb-zinc-500 scrollbar-thumb-rounded-full scrollbar-w-[3px]">
          {timers.map((timer, tIdx) => (
            <Timer
              timer={timer}
              timerIdx={tIdx}
              key={`${timer.totalSeconds}-${tIdx}`}
              onToggleTimer={handleOnToggleTimer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
