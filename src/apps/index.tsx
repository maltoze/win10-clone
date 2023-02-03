import ChromeIcon from '../components/icons/ChromeIcon';
import { AppState } from '../types';
import AlarmsClock from './alarmsClock';
import Chrome from './chrome';
import NotepadIcon from '../components/icons/NotepadIcon';
import AlarmsClockIcon from '../components/icons/AlarmsClockIcon';

type App = {
  name: string;
  label: string;
  defaultState: AppState;
  minWidth: number;
  minHeight: number;
  component: React.ReactNode;
  icon: React.ReactNode;
};

export const config: { [key: string]: App } = {
  chrome: {
    name: 'chrome',
    label: 'Chrome',
    defaultState: {
      location: { top: 0, left: 0, originLeft: 0, originTop: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
    minWidth: 300,
    minHeight: 76,
    component: <Chrome />,
    icon: <ChromeIcon className="h-6 w-6" />,
  },
  alarmsClock: {
    name: 'alarmsClock',
    label: 'Alarms & Clock',
    defaultState: {
      location: { top: 4, left: 200, originLeft: 0, originTop: 0 },
      dimensions: { width: 1000, height: 700 },
    },
    minWidth: 100,
    minHeight: 100,
    component: <AlarmsClock />,
    icon: <AlarmsClockIcon className="h-8 w-8" />,
  },
  notepad: {
    name: 'notepad',
    label: 'Notepad',
    defaultState: {
      location: { top: 4, left: 100, originLeft: 0, originTop: 0 },
      dimensions: { width: 800, height: 600 },
    },
    minWidth: 100,
    minHeight: 100,
    component: <h1>Notepad</h1>,
    icon: <NotepadIcon className="h-6 w-6" />,
  },
};
