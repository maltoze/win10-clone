import {
  ClockIcon,
  CountdownTimerIcon,
  HeightIcon,
  LapTimerIcon,
  PlayIcon,
  ResetIcon,
  TimerIcon,
} from '@radix-ui/react-icons';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';

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

const defaultTimer = [1, 5, 3, 10];

export default function AlarmsClock() {
  const { close } = useStore((state) => ({
    close: () => state.close('alarmsClock'),
  }));

  return (
    <div className="flex h-full cursor-default select-none text-zinc-100">
      <div className="w-48 bg-zinc-750 shadow">
        <div className="alarmsClock-drag-handle flex h-10 items-center px-3 text-xs">
          Alarms & Clock
        </div>
        <div className="w-56 text-sm">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center space-x-3 py-2 pl-1 pr-8 hover:bg-zinc-700"
            >
              {item.icon && (
                <div className="relative py-1">
                  <div className="absolute top-0 h-full rounded group-first:w-0.5 group-first:bg-blue-500"></div>
                  <item.icon className="ml-2 h-[18px] w-[18px] text-zinc-200" />
                </div>
              )}
              <span>{item.label}</span>
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
          {defaultTimer.map((minute, idx) => (
            <div
              key={idx}
              className="pointer-events-none p-1.5 transition-colors duration-100 ease-out hover:rounded-sm hover:bg-zinc-750 hover:shadow hover:delay-75"
            >
              <div className="pointer-events-auto rounded-sm bg-zinc-750 py-2 pl-4 pr-2 shadow hover:rounded-none hover:shadow-none">
                <div className="flex justify-between">
                  <div className="text-sm">{minute} min</div>
                  <div className="p-1.5 hover:bg-zinc-700">
                    <HeightIcon className="h-6 w-6 rotate-45" />
                  </div>
                </div>

                <div className="mx-6 mb-4 flex h-52 w-52 items-center justify-center rounded-full border-[12px] border-zinc-600">
                  <div className="text-4xl">
                    {new Date(minute * 60 * 1000).toISOString().slice(11, 19)}
                  </div>
                </div>

                <div className="flex justify-center space-x-4 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400">
                    <PlayIcon className="h-6 w-6" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600">
                    <ResetIcon className="h-6 w-6 text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
