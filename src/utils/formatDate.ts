/**
 * 
 * @param dateString
 * @returns formatted date YYYY/MM/DD
 */
export function formateDate(dateString: string): string {
  return `${new Date(dateString).getFullYear()}/${new Date(
    dateString
  ).getMonth()}/${new Date(dateString).getDate()}`
}
