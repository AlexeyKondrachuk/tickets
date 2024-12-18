export default function convertSecondsToTime(seconds: number | undefined): {
  hours: number;
  minutes: number;
} {
  if (seconds === undefined) {
    return { hours: 0, minutes: 0 };
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return { hours, minutes };
}
