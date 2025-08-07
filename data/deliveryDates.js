import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryDates = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 4,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function calculateDeliveryDate(date){
  const today = dayjs();
  let deliveryDate;
  let newDelivery;
  let i = 0;
  let num = date.deliveryDays;
  
  while(i < num){
    i++;
    deliveryDate = today.add(i , 'days').format('dddd');
    newDelivery = today.add(i , 'days').format('dddd, MMMM D');
    if(deliveryDate === "Sunday" || deliveryDate === 'Saturday'){
      num += 1;
      continue;
    }
  }
  return newDelivery;
}