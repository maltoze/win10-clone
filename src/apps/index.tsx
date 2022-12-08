import { AppState } from '../types';
import AlarmsClock from './alarmsClock';
import Chrome from './chrome';

type App = {
  name: string;
  defaultState: AppState;
  minWidth: number;
  minHeight: number;
  component: React.ReactNode;
};

export const apps: { [key: string]: App } = {
  chrome: {
    name: 'chrome',
    defaultState: {
      location: { top: 0, left: 0, originLeft: 0, originTop: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
    minWidth: 300,
    minHeight: 76,
    component: <Chrome />,
  },
  alarmsClock: {
    name: 'alarmsClock',
    defaultState: {
      location: { top: 0, left: 0, originLeft: 0, originTop: 0 },
      dimensions: { width: '50%', height: '50%' },
    },
    minWidth: 100,
    minHeight: 100,
    component: <AlarmsClock />,
  },
};
