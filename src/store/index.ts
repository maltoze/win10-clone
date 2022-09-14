import create, { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { apps } from '../constants';
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
};

const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/immer', never], ['zustand/persist', AppSlice]],
  []
> = (set) => ({
  apps: {},
  setDimensions: (appName, dimensions) =>
    set((state) => {
      state.apps[appName].dimensions = dimensions;
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
      const { left, top, originLeft, originTop } =
        state.apps[appName]['location'];
      state.apps[appName]['location'] = {
        ...state.apps[appName]['location'],
        left: left === 0 ? originLeft : 0,
        top: top === 0 ? originTop : 0,
      };
    }),
  open: (app) =>
    set((state) => {
      if (!state.apps[app]) {
        state.apps[app] = {
          ...apps[app].defaultState,
          isOpen: true,
        };
      } else {
        state.apps[app].isOpen = true;
      }
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
