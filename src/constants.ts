import { AppState } from './types';

type AppsType = {
  [key: string]: {
    name: string;
    defaultState: AppState;
    minWidth: number;
    minHeight: number;
  };
};
export const apps: AppsType = {
  chrome: {
    name: 'chrome',
    defaultState: {
      location: { top: 0, left: 0, originLeft: 0, originTop: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
    minWidth: 300,
    minHeight: 76,
  },
};
