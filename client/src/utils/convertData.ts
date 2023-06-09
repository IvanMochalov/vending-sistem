// import moment from 'moment';

export function convertData(data: Date|null) {
  if (data === null) return;
  // console.log(data)
  // console.log(data.getTime())
  // console.log(typeof data)
  // const newData = new Date(data.getTime() + (20 * 3600 * 1000))
  const newData = new Date(data.getTime() + (0 * 3600 * 1000))
  const yyyy = newData.getFullYear();
  let mm = `${newData.getMonth() + 1}`;
  let dd = `${newData.getDate()}`;
  let h = `${newData.getHours()}`;
  let m = `${newData.getMinutes()}`;
  // let s = data.getSeconds();
  if (Number(dd) < 10) dd = `0${dd}`;
  if (Number(mm) < 10) mm = `0${mm}`;

  if (Number(h) < 10) h = `0${h}`;
  if (Number(m) < 10) m = `0${m}`;


  // let momentTime = moment(`${mm}-${dd}-${yyyy}`, "MM-DD-YYYY").fromNow()

  // if

  return `${dd}.${mm}.${yyyy} в ${h}:${m}`;
  // return `${moment(`${mm}-${dd}-${yyyy}`, "MM-DD-YYYY").fromNow()}`;
}