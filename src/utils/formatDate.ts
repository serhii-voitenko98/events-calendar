export const formatDate = (date: Date): string => {
  return date ? `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}` : '';
}
