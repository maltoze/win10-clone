import { AppState } from './types';

export const DragItemTypes = {
  WINDOW: 'window',
};

type AppsType = {
  [key: string]: {
    defaultState: AppState;
    minWidth: number;
    minHeight: number;
  };
};
export const apps: AppsType = {
  chrome: {
    defaultState: {
      location: { top: 0, left: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
    minWidth: 300,
    minHeight: 76,
  },
};
