import Image from 'next/future/image';
import ChromeIcon from '../components/icons/ChromeIcon';
import { AppState } from '../types';
import AlarmsClock from './alarmsClock';
import Chrome from './chrome';
import alarmsClockPic from '../assets/icons/alarms-clock.png';

type App = {
  name: string;
  defaultState: AppState;
  minWidth: number;
  minHeight: number;
  component: React.ReactNode;
  taskbarIcon: React.ReactNode;
};

export const config: { [key: string]: App } = {
  chrome: {
    name: 'chrome',
    defaultState: {
      location: { top: 0, left: 0, originLeft: 0, originTop: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
    minWidth: 300,
    minHeight: 76,
    component: <Chrome />,
    taskbarIcon: <ChromeIcon className="block h-6 w-6" />,
  },
  alarmsClock: {
    name: 'alarmsClock',
    defaultState: {
      location: { top: 4, left: 200, originLeft: 0, originTop: 0 },
      dimensions: { width: 1000, height: 700 },
    },
    minWidth: 100,
    minHeight: 100,
    component: <AlarmsClock />,
    taskbarIcon: (
      <Image
        src={alarmsClockPic}
        quality={100}
        alt="Alarms & Clock"
        className='w-8 h-8'
      />
    ),
  },
};
