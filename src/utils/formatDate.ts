/**
 * a function use to create and format date from provided date string
 * @param dateString
 * @returns formatted date YYYY/MM/DD
 */
export function formatDate(dateString: string): string {
  return `${new Date(dateString).getFullYear()}/${new Date(
    dateString
  ).getMonth()}/${new Date(dateString).getDate()}`
}
