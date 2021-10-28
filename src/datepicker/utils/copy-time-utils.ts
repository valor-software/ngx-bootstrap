export function copyTime(sourceDate: Date, time: Date) {
  if (!sourceDate) {
    return;
  }

  sourceDate.setHours(time.getHours());
  sourceDate.setMinutes(time.getMinutes());
  sourceDate.setSeconds(time.getSeconds());
  sourceDate.setMilliseconds(time.getMilliseconds());
}
