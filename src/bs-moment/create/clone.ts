// fastest way to clone date
// https://jsperf.com/clone-date-object2
export function cloneDate(date: Date): Date {
  return new Date(date.getTime());
}
