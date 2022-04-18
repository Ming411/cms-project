import dayjs from 'dayjs'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs(utcString).format(format)
}

// import dayjs from 'dayjs'
// 默认 dayjs 支持utc
// import utc from 'dayjs/plugin/utc'
// dayjs.extend(utc)
// const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// export default function formatUtcString(
//   utcStirng: string,
//   format: string = DATE_TIME_FORMAT
// ) {
//   return dayjs.utc(utcStirng).format(format)
// }
