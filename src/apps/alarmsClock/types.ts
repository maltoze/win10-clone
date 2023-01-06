export type TimerState = {
  lastStartTime: number;
  elapsedTime: number;
  isRunning: boolean;
  interval?: ReturnType<typeof setInterval>;
  totalSeconds: number;
  name: string;
};
