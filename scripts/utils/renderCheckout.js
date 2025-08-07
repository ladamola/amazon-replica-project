import { carts, cartUpdate, removeCart, removeCartAlternative, cartMemory, updateQuantity, updateCartDelivery} from "../../data/carts.js";
import { products } from "../../data/products.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryDates, calculateDeliveryDate } from "../../data/deliveryDates.js";
import { payment } from "./renderPayment.js";
import { totalCartQuantity } from "./checkoutHeader.js";

const checkoutOrder = document.querySelector('.js-checkout-grid');  

  let trueSelected = '';
  let currentDate = '';

  export function checkout() {
    let cartCheckout = ''; // The html as a whole 

    carts.forEach((cart) => {
    let similarProduct; // Last Saved Item on the Cart  

  products.forEach((product) => {
    if(product.id === cart.productId){
      similarProduct = product
    }
  })

    deliveryDates.forEach((deliveryDate) => {
          if(cart.deliveryDateId === deliveryDate.id){
            currentDate = dayjs().add(deliveryDate.deliveryDays, 'days').format('dddd MMMM D');
          }
      })

      cartCheckout += ` 
      <div class="order-summary js-order-${similarProduct.id}">
          <div class="cart-item-container-${similarProduct.id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${currentDate}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${similarProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${similarProduct.name}
                </div>
                <div class="product-price">
                  $${(similarProduct.priceCents/100).toFixed(2) }
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cart.Quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-update-id = "${similarProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input-${similarProduct.id} cart-quantity-input"/>
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-save-id= "${similarProduct.id}" > 
                    Save
                  </span>
                  <span class= "delete-quantity-link link-primary js-deleteBtn" data-delete-button = "${similarProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options" >
                 <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryDays(cart, similarProduct)}
              </div>
            </div>
          </div>
      </div>
      `  
      })

    checkoutOrder.innerHTML = cartCheckout;

      
//     let newCart = []

// document.querySelectorAll('.js-deleteBtn').forEach((deleteBtn) => {
//   const {deleteButton} = deleteBtn.dataset;
//   const order = document.querySelector(`.js-order-${deleteButton}`);
  
//   deleteBtn.addEventListener('click', () =>{
//     removeCart(deleteButton)
//     order.remove()
//   })
// })

//Generate Delivery Days HTML
function deliveryDays(cart, similarProduct){
  let dateHTML = '';
  
  deliveryDates.forEach((date) => {
  const deliveryDate = calculateDeliveryDate(date)
  const deliveryPrice = date.priceCents;
  
  const actualDeliveryPrice = date.priceCents === 0 ? 'FREE' : `$${date.priceCents / 100} -`;
  const selectedDelivery = cart.deliveryDateId === date.id;
      
        dateHTML += `
                  <div class="delivery-option js-delivery-button"
                  data-cart-id = ${cart.productId} data-delivery-id = ${date.id}>
                    <input type="radio" 
                      ${selectedDelivery ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${similarProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                      ${deliveryDate}
                      </div>
                      <div class="delivery-option-price">
                        ${actualDeliveryPrice} Shipping
                      </div>
                    </div>
                  </div>
                `
             
  })

  return dateHTML;
}

//Delete Button
document.querySelectorAll('.js-deleteBtn').forEach((deleteBtn) => {
  const {deleteButton} = deleteBtn.dataset
  const order = document.querySelector(`.js-order-${deleteButton}`); 

  deleteBtn.addEventListener('click', () => {
    removeCartAlternative(deleteButton);
    checkout();
    payment();
    totalCartQuantity();
    // order.remove() //changed this so the html could be regenerated instead of a dom update
  })
})
totalCartQuantity();

//Update Button
document.querySelectorAll('.js-update-quantity-link').forEach((updateBtn) => {
  const { updateId } = updateBtn.dataset;
  const cartContainer = document.querySelector(`.cart-item-container-${updateId}`);

  updateBtn.addEventListener('click', () => {
    cartContainer.classList.add('is-editing-quantity')
    console.log(carts)
  })
})

//Save Button
document.querySelectorAll('.js-save-quantity-link').forEach((saveBtn) => {
    const { saveId } = saveBtn.dataset;
    const cartContainer = document.querySelector(`.cart-item-container-${saveId}`);
    const newQuantityInput = document.querySelector(`.quantity-input-${saveId}`);
  
    //Update Click Function
    saveBtn.addEventListener('click', () => {
      cartContainer.classList.remove('is-editing-quantity');
      const newQuantity = Number(newQuantityInput.value);
      updateQuantity(saveId, newQuantity)
      if(newQuantity >= 0 && newQuantity <= 1000){
        document.querySelector('.js-quantity-label')
      .innerHTML = newQuantity;
      }
      payment();
      checkout();
    })

    //Keyboard Function
    newQuantityInput.addEventListener('keydown', (event) => {
      if(event.key === 'Enter' && saveId){
      cartContainer.classList.remove('is-editing-quantity');
      const newQuantity = Number(newQuantityInput.value);
      updateQuantity(saveId, newQuantity)
      if(newQuantity >= 0 && newQuantity <= 1000){
      document.querySelector('.js-quantity-label')
        .innerHTML = newQuantity;
      }
      payment();
      checkout();
      }
    })
})
 



document.querySelectorAll('.js-delivery-button').forEach((deliveryBtn) => {
  const { cartId, deliveryId } = deliveryBtn.dataset;
  deliveryBtn.addEventListener('click', () => {
    updateCartDelivery(cartId, deliveryId);
    checkout();
    cartMemory();
    payment();
  })
})
}
  
