export function minutesToTime(minutes: number) {
  return new Date(minutes * 60 * 1000).toISOString().slice(11, 19);
}
export function secondsToTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}
