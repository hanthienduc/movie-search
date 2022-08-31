const baseUrl = 'http://image.tmdb.org/t/p'
type ImgUrlProp = {
  width?: number
  height?: number
  string_url: string
}

export function getImgUrl({ width, height, string_url }: ImgUrlProp): string {
  if (string_url == null) {
    return ''
  }

  if (width && height) {
    return `${baseUrl}/w${width}_and_h${height}_bestv2/${string_url}`
  }

  if (width) {
    return `${baseUrl}/w${width}${string_url}`
  }

  return `${baseUrl}/w500/${string_url}`
}
