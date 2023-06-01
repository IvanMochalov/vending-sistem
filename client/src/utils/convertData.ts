import moment from 'moment';

export function convertData(data: Date|null) {
  if (data === null) return;
  const yyyy = data.getFullYear();
  let mm = `${data.getMonth() + 1}`;
  let dd = `${data.getDate()}`;
  // let h = data.getHours();
  // let m = data.getMinutes();
  // let s = data.getSeconds();
  if (Number(dd) < 10) dd = `0${dd}`;
  if (Number(mm) < 10) mm = `0${mm}`;

  // let momentTime = moment(`${mm}-${dd}-${yyyy}`, "MM-DD-YYYY").fromNow()

  // if

  // return `${dd}.${mm}.${yyyy} в ${h}:${m}`;
  return `${moment(`${mm}-${dd}-${yyyy}`, "MM-DD-YYYY").fromNow()}`;
}