import { carts, calculateCartQuantity, totalOrder} from '../../data/carts.js'
import { products } from '../../data/products.js';
import { deliveryDates } from '../../data/deliveryDates.js';
import { calculatePriceCents } from './money.js';

const paymentSummary = document.querySelector('.js-payment-summary');

export function payment(){
    let paymentHTML = ' ';
    let paymentProduct;
    let deliveryPrice;
    let shipping = 0;
    let totalPrice = Number(' ');

    carts.forEach((cart) => {
      products.forEach((product) => {
        if(cart.productId === product.id){
            paymentProduct = product
        }
      })
      
      deliveryDates.forEach((date) => {
          if(cart.deliveryDateId === date.id){
            deliveryPrice = date
          }
      })

      if(paymentProduct){
         totalPrice += paymentProduct.priceCents * cart.Quantity ; 
      }  
      if(deliveryPrice){
       shipping += deliveryPrice.priceCents;
    }
        
      paymentHTML = ` 
       <div class="payment-summary-title">
            Order Summary
        </div>
          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money"> $${calculatePriceCents(totalPrice)}</div>
          </div>
          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculatePriceCents(shipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${calculatePriceCents(totalPrice + shipping)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${calculatePriceCents((totalPrice + shipping)* 0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalOrder(shipping, totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
          `
    })

    paymentSummary.innerHTML = paymentHTML;
}

     