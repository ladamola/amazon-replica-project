const productContainer = document.querySelector('.js-product-grid');
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
           ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
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

          <div class="added-to-cart">
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
let carts = [];

document.querySelectorAll('.js-addCart').forEach((button, index) => {
  const productId = button.dataset.productId;
  

    button.addEventListener('click', () => {
      let productExist;

      for(let i = 0; i < carts.length; i++){
        let cart = carts[i];

        if(productId === cart.productId){
          productExist = cart;
        }
      }

      if(productExist){
        productExist.Quantity += 1
      } else{
        carts.push({
        productId,
        Quantity: 1
         })
      }
      console.log(carts)
    })
})
