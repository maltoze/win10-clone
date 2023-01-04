import {
  ClockIcon,
  CountdownTimerIcon,
  HamburgerMenuIcon,
  HeightIcon,
  LapTimerIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { useImmer } from 'use-immer';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';
import { secondsToTime } from '../../utils';
import CircleProgress from './components/CircleProgress';

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

type TimerState = {
  [key: number]: {
    timeLeft: number;
    isRunning: boolean;
    interval?: ReturnType<typeof setInterval>;
    progress?: number;
  };
};

const defaultTimerKeys = [1, 5, 3, 10];
const defaultTimer: TimerState = Object.fromEntries(
  defaultTimerKeys.map((minutes) => [
    minutes,
    {
      timeLeft: minutes * 60,
      isRunning: false,
    },
  ])
);

export default function AlarmsClock() {
  const { close } = useStore((state) => ({
    close: () => state.close('alarmsClock'),
  }));

  const [timer, updateTimer] = useImmer<TimerState>(defaultTimer);

  const handleOnTimerToggle = (minutes: number) => {
    if (timer[minutes].isRunning) {
      clearInterval(timer[minutes].interval);
      updateTimer((draft) => {
        draft[minutes].isRunning = false;
        draft[minutes].progress = 1 - draft[minutes].timeLeft / (minutes * 60);
      });
      return;
    }

    const interval = setInterval(
      (function _updateTimer() {
        updateTimer((draft) => {
          let timeLeft = (draft?.[minutes]?.timeLeft ?? minutes * 60) - 1;
          let isRunning = true;
          if (timeLeft === 0) {
            clearInterval(draft[minutes].interval ?? interval);
            isRunning = false;
            timeLeft = minutes * 60;
            draft[minutes].progress = 0;
          }

          draft[minutes].timeLeft = timeLeft;
          draft[minutes].isRunning = isRunning;
          draft[minutes].interval = interval;
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
        <div className="alarmsClock-drag-handle flex h-10 justify-end">
          <div>
            <WindowCloseButton
              onTouchEnd={() => close()}
              onClick={() => close()}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 overflow-y-auto px-4 py-2">
          {defaultTimerKeys.map((minutes) => {
            const curTimer = timer?.[minutes];
            return (
              <div
                key={minutes}
                className="pointer-events-none p-1.5 transition-colors duration-100 ease-out hover:rounded-sm hover:bg-zinc-750 hover:shadow hover:delay-75"
              >
                <div className="pointer-events-auto rounded-sm bg-zinc-750 py-2 pl-4 pr-2 shadow hover:rounded-none hover:shadow-none">
                  <div className="flex justify-between">
                    <div className="select-none text-sm">{minutes} min</div>
                    <div className="p-1.5 hover:bg-zinc-700">
                      <HeightIcon className="h-6 w-6 rotate-45" />
                    </div>
                  </div>

                  <div className="relative">
                    <CircleProgress
                      value={
                        curTimer.isRunning
                          ? 100
                          : Math.round(100 * (curTimer.progress ?? 0))
                      }
                      duration={minutes * 60 * (1 - (curTimer.progress ?? 0))}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-4xl ">
                      {secondsToTime(curTimer?.timeLeft ?? minutes * 60)}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 py-2">
                    <button
                      className="flex h-10 w-10 cursor-default items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400"
                      onClick={() => handleOnTimerToggle(minutes)}
                    >
                      {curTimer?.isRunning ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600">
                      <ResetIcon className="h-6 w-6 text-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
