import {
  ClockIcon,
  CountdownTimerIcon,
  HamburgerMenuIcon,
  LapTimerIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import { useAtomValue } from 'jotai';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';
import Timer from './components/Timer';
import { timersAtom } from './store';

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

export default function AlarmsClock() {
  const { close } = useStore((state) => ({
    close: () => state.close('alarmsClock'),
  }));

  const timers = useAtomValue(timersAtom);

  return (
    <div className="flex h-full cursor-default text-zinc-100 supports-container:@container">
      <div className="w-56 bg-zinc-750 shadow transition-[width] supports-container:w-12 supports-container:@5xl:w-56">
        <div className="alarmsClock-drag-handle flex h-10 items-center px-3 text-xs">
          <span className="absolute select-none whitespace-nowrap supports-container:hidden supports-container:@5xl:inline-block">
            Alarms & Clock
          </span>
          <HamburgerMenuIcon className="hidden h-5 w-5 supports-container:inline-block supports-container:@5xl:hidden" />
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
              <span className="select-none whitespace-nowrap supports-container:hidden supports-container:@5xl:inline-block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex grow flex-col bg-zinc-800">
        <div className="alarmsClock-drag-handle flex h-10 justify-between">
          <div className="ml-1.5 pt-3 pl-4 text-xs text-zinc-200 ">
            <span className="select-none supports-ncontainer:hidden supports-container:@5xl:hidden">
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
            <Timer timer={timer} timerIdx={tIdx} key={tIdx} />
          ))}
        </div>
      </div>
    </div>
  );
}
