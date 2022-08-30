export function getImgUrl(string_url: string) {
  if (string_url == null) {
    return ''
  }
  return `http://image.tmdb.org/t/p/w500/${string_url}`
}
