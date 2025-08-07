import {carts, calculateCartQuantity} from "../../data/carts.js";

const checkoutHeader = document.querySelector('.js-return-to-home-link');
export function totalCartQuantity(){
  carts.forEach((cart) => {
    if(!cart.Quantity){
      checkoutHeader.innerHTML = ' '
    }else {
      checkoutHeader.innerHTML = `${calculateCartQuantity()} items`
    }
  })
}

