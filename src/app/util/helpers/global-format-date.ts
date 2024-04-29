import { formatDate } from 'date-fns/format';
// @TODO: Use formatDate from date-fns. Current issue is formatDate of date-fns parsing date before formatting.
export function globalFormatDate(date: Date): string {
  return date.toISOString().split('T')[0];
  // const month = date.getMonth() + 1;
  // const dateOfMonth = date.getDate();
  // return `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${
  //   dateOfMonth < 10 ? '0' : ''
  // }${dateOfMonth}`;
}
