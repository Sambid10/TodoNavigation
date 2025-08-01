export function isDateTimeValid(date: Date): boolean {
  const now = new Date();
  const currentTime = now.getTime() + 2 * 60 * 1000; //atleast 2 min vanda geater hunuparyo than cuurent time
  return currentTime >= date.getTime();
}
