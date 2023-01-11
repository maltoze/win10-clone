import { atomWithImmer } from 'jotai-immer';
import { TimerState } from './types';

const defaultTimerMinutes = [1, 5, 3, 10];
const defaultTimers: TimerState[] = defaultTimerMinutes.map((minute) => ({
  totalSeconds: minute * 60,
  isRunning: false,
  elapsedTime: 0,
  lastStartTime: 0,
  name: `${minute} min`,
}));

export const timersAtom = atomWithImmer(defaultTimers);
