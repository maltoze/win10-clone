import create, { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { config } from '../apps';
import { AppState, Dimensions } from '../types';

type AppSlice = {
  apps: {
    [key: string]: AppState;
  };
  open: (appName: string) => void;
  close: (appName: string) => void;
  moveWindow: (appName: string, left: number, top: number) => void;
  doubleClickTitlebar: (appName: string) => void;
  setDimensions: (appName: string, dimensions: Dimensions) => void;
  handleOnFocus: (appName: string) => void;
};

const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/immer', never], ['zustand/persist', AppSlice]],
  []
> = (set) => ({
  apps: {},
  handleOnFocus: (appName) =>
    set((state) => {
      state.apps[appName].lastFocusTimestamp = new Date().getTime();
    }),
  setDimensions: (appName, { width, height }) =>
    set((state) => {
      state.apps[appName].dimensions = {
        width,
        height,
        originWidth: width,
        originHeight: height,
      };
    }),
  moveWindow: (appName, left, top) =>
    set((state) => {
      const real_left = left;
      const real_top = top < 0 ? 0 : top;
      state.apps[appName]['location'] = {
        top: real_top,
        left: real_left,
        originLeft: real_left,
        originTop: real_top,
      };
    }),
  doubleClickTitlebar: (appName) =>
    set((state) => {
      // NOTE: https://github.com/react-grid-layout/react-draggable/issues/531
      const {
        location: { left, top, originLeft, originTop },
        dimensions: { width, height, originWidth, originHeight },
      } = state.apps[appName];

      let newLeft = originLeft,
        newTop = originTop,
        newWidth = originWidth,
        newHeight = originHeight;
      if (left !== 0 || top !== 0 || width !== '100%' || height !== '100%') {
        newLeft = newTop = 0;
        newWidth = newHeight = '100%';
      }

      state.apps[appName]['location'] = {
        originLeft,
        originTop,
        left: newLeft,
        top: newTop,
      };
      state.apps[appName]['dimensions'] = {
        originHeight,
        originWidth,
        width: newWidth ?? '100%',
        height: newHeight ?? '100%',
      };
    }),
  open: (app) =>
    set((state) => {
      if (!state.apps[app]) {
        state.apps[app] = {
          ...config[app].defaultState,
          isOpen: true,
        };
      } else {
        state.apps[app].isOpen = true;
      }
      state.apps[app].lastFocusTimestamp = new Date().getTime();
    }),
  close: (app) =>
    set((state) => {
      state.apps[app].isOpen = false;
    }),
});

export const useStore = create<AppSlice>()(
  immer(
    persist(
      (...a) => ({
        // @ts-ignore
        ...createAppSlice(...a),
      }),
      {
        name: 'app-storage',
        getStorage: () => sessionStorage,
        partialize: (state) => ({ apps: state.apps }),
      }
    )
  )
);
