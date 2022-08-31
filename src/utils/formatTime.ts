export function formatTime(num: number) {
  let hours = Math.floor(num / 60)
  let minutes = Math.round(hours * 60)
  return `${hours}h ${minutes}m`
}