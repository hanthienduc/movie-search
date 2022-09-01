const baseUrl = 'http://image.tmdb.org/t/p'
type ImgUrlProp = {
  width?: number
  height?: number
  string_url: string
}
/**
 * a function used to return the image link
 * @param {ImgUrlProp}
 * @returns image link
 */
export function getImgUrl({ width, height, string_url }: ImgUrlProp): string {
  if (string_url == null) {
    return ''
  }

  if (width !== undefined && height !== undefined) {
    return `${baseUrl}/w${width}_and_h${height}_bestv2/${string_url}`
  }

  if (width !== undefined) {
    return `${baseUrl}/w${width}/${string_url}`
  }

  return `${baseUrl}/w500/${string_url}`
}
