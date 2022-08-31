export function formatTime(num: number): string {
  let hours = Math.floor(num / 60)
  let minutes = Math.round(hours * 60)
  return `${hours}h ${minutes}m`
}
