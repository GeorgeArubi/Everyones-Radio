export function millisecondToMinutesAndSeconds(millisecond: number) {
  const minutes = Math.floor(millisecond / 60000);
  const seconds = parseInt(((millisecond % 60000) / 1000).toFixed(0))
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
