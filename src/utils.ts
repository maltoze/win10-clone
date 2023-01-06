export function millisecondsToTime(millseconds: number) {
  const ms = Math.max(millseconds, 0);
  return new Date(ms).toISOString().slice(11, 19);
}

export function secondsToTime(seconds: number) {
  return millisecondsToTime(seconds * 1000);
}

export function minutesToTime(minutes: number) {
  return millisecondsToTime(minutes * 60 * 1000);
}
