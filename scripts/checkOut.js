import { carts, removeCart, removeCartAlternative, cartMemory, calculateCartQuantity } from "../data/carts.js";
import { products } from "../data/products.js"

const checkoutOrder = document.querySelector('.js-checkout-grid');
const checkoutHeader = document.querySelector('.js-return-to-home-link');

let similarProduct;

let cartCheckout = '';
carts.forEach((cart) => {
  products.forEach((product) => {
    if(product.id === cart.productId){
      similarProduct = product
    }
  })

  cartCheckout += ` 
    <div class="order-summary js-order-${similarProduct.id}">
          <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                    Quantity: <span class="quantity-label">${cart.Quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" >
                    Update
                  </span>
                  <span class= "delete-quantity-link link-primary js-deleteBtn" data-delete-button = "${similarProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-button" >
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option js-delivery-button">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${similarProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${similarProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${similarProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
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

document.querySelectorAll('.js-deleteBtn').forEach((deleteBtn) => {
  const {deleteButton} = deleteBtn.dataset
  const order = document.querySelector(`.js-order-${deleteButton}`); 

  deleteBtn.addEventListener('click', () => {
    removeCartAlternative(deleteButton);
    order.remove();
    totalCartQuantity()
  })
})

totalCartQuantity();
function totalCartQuantity(){

   checkoutHeader.innerHTML = `${calculateCartQuantity()} items`;
}