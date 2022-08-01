import create, { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

type AppState = {
  isOpen?: boolean;
  top?: number;
  left?: number;
  originTop?: number;
  originLeft?: number;
};

type AppSlice = {
  apps: {
    [key: string]: AppState;
  };
  open: (appName: string) => void;
  close: (appName: string) => void;
  moveWindow: (appName: string, left: number, top: number) => void;
  doubleClickTitlebar: (appName: string) => void;
};

const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/immer', never], ['zustand/persist', AppSlice]],
  []
> = (set) => ({
  apps: {},
  moveWindow: (appName, left, top) =>
    set((state) => {
      state.apps[appName] = {
        ...state.apps[appName],
        top,
        left,
        originLeft: left,
        originTop: top,
      };
    }),
  doubleClickTitlebar: (appName) =>
    set((state) => {
      const { left, top, originLeft, originTop } = state.apps[appName];
      state.apps[appName] = {
        ...state.apps[appName],
        left: left === 0 ? originLeft : 0,
        top: top === 0 ? originTop : 0,
      };
    }),
  open: (app) =>
    set((state) => {
      if (!state.apps[app]) {
        state.apps[app] = { isOpen: true, top: 0, left: 0 };
      } else {
        state.apps[app].isOpen = true;
      }
    }),
  close: (app) =>
    set((state) => {
      if (!state.apps[app]) {
        state.apps[app] = { isOpen: false };
      } else {
        state.apps[app].isOpen = false;
      }
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
