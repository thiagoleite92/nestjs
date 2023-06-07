export default function hoursToSeconds(time: string): string {
  const fullTime = time.split('');

  const hours = fullTime.slice(0, 2).join('');
  const minutes = fullTime.slice(2, 4).join('');

  const hoursToSeconds = 3600 * Number(hours);

  const minutesToSeconds = 60 * Number(minutes);

  return (hoursToSeconds + minutesToSeconds).toString();
}
