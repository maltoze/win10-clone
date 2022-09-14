import { AppState } from './types';

export const DragItemTypes = {
  WINDOW: 'window',
};

type AppsType = {
  [key: string]: { defaultState: AppState };
};
export const apps: AppsType = {
  chrome: {
    defaultState: {
      location: { top: 0, left: 0 },
      dimensions: { width: '100%', height: '100%' },
    },
  },
};
