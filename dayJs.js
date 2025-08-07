import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function isWeekend(date){
  date = dayjs().add(6, 'days').format('dddd');
  const nextMonth = dayjs().add(1, 'month').format('MMMM, dddd');
  const lastMonth = dayjs().subtract(1, 'month').format('MMMM, dddd');
  const day = dayjs().add(1, 'days').format('dddd');

  if(date === 'Saturday' || date === 'Sunday' ){
      // console.log(true)
      return date
  } else{
    // console.log(false)
  }
}

