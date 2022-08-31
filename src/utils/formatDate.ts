export function formateDate(dateString: string) {
  return `${new Date(dateString).getFullYear()}/${new Date(
    dateString
  ).getMonth()}/${new Date(dateString).getDate()}`
}
