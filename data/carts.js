export let carts = JSON.parse(localStorage.getItem('cartStorage')) || [];

export function cartMemory(){
  localStorage.setItem('cartStorage', JSON.stringify(carts));
}
export function cartUpdate(productId){
const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
let productExist;

let Quantity = Number(selectedQuantity.value);

carts.forEach((cart) => {
      if(productId === cart.productId){
          productExist = cart;
        }
})
    if(!productExist){
      carts.push({
        productId,
        Quantity,
        deliveryDateId: '2'
      })
    } else{
      productExist.Quantity += Quantity;
    }    
    cartMemory();
    console.log(carts)
}

export function removeCart(deleteButton){
  const newCart = [];

 carts.forEach((cart) => {
      if(cart.productId !== deleteButton){
        newCart.push(cart); 
      }
    })
    carts = newCart
    
  }

export function removeCartAlternative(deleteButton){
  const newCartId = carts.findIndex(cartItem => cartItem.productId === deleteButton);
  carts.splice(newCartId, 1);
  localStorage.removeItem('cartStorage');
  cartMemory();
}

export function calculateCartQuantity(){
  let totalQuantity = Number('');
  carts.forEach((cart) => {
  totalQuantity += cart.Quantity;
  })
  return totalQuantity;
}

export function updateQuantity(saveId, newQuantity){
    carts.forEach((cart) => {
      if(cart.productId === saveId){
        if(newQuantity >= 0 && newQuantity <= 1000){
          return cart.Quantity = newQuantity;
        }
      }
    })
    cartMemory();
}

export function updateCartDelivery (cartId, deliveryId, deliveryDateTitle){
   carts.forEach((cart) => {
    if(cart.productId === cartId){
        cart.deliveryDateId = deliveryId;
        return cart.deliveryDateId;
    }
  })
}