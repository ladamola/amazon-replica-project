import {carts} from "../data/carts.js";

const productContainer = document.querySelector('.js-product-grid');
const cartQuantity = document.querySelector('.js-cart-quantity');

let productAccumulator = '';

products.forEach((product) => {
  productAccumulator += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src= ${product.image }>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1" >1</option>
              <option value="2" >2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-${product.id}">
           <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addCart" data-product-id = "${product.id}">
            Add to Cart
          </button>
    </div>
  `
})  
productContainer.innerHTML = productAccumulator; 



document.querySelectorAll('.js-addCart').forEach((button, index) => {
  const { productId } = button.dataset;
  const addedQuantity = document.querySelector(`.js-added-cart-${productId}`);
  const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  
  let clearCart;
    button.addEventListener('click', () => {
      let productExist;
      addedQuantity.classList.add('added-opacity');
      clearTimeout(clearCart);

    clearCart =  setTimeout(() => { 
            addedQuantity.classList.remove('added-opacity');
      }, 2000)
  


      carts.forEach((cart) => {
        if(productId === cart.productId){
          productExist = cart;
        }
      })
      const Quantity = Number(selectedQuantity.value)

      if(productExist){
        productExist.Quantity += Quantity
      } else{
        carts.push({
        productId,
        Quantity
         })
      }
      console.log(carts);
      
      let totalQuantity = 0;

      carts.forEach((cart) => {
       totalQuantity += cart.Quantity;
      })
      cartQuantity.innerHTML = totalQuantity;
    })
})

