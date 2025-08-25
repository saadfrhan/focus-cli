export function msRemaining(
  endTime: Date,
  now: Date
): {
  ms: number;
  mm: string;
  ss: string;
} {
  const ms = endTime.getTime() - now.getTime();
  const mm = String(Math.floor(ms / 60000)).padStart(2, "0");
  const ss = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return { ms, mm, ss };
}
