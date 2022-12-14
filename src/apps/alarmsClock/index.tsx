import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';

const sidebarItems = [
  { label: 'Timer' },
  { label: 'Alarm' },
  { label: 'World Clock' },
  { label: 'Stopwatch' },
];

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
        <div className="text-sm">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className="px-4 py-2 hover:bg-zinc-700">
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="grow bg-zinc-800">
        <div className="alarmsClock-drag-handle flex h-10 justify-end">
          <div>
            <WindowCloseButton
              onTouchEnd={() => close()}
              onClick={() => close()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
