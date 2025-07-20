export const carts = [];

export function cartUpdate(productId){
  const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  let productExist;
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
}
