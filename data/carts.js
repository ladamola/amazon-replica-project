export const carts = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity: 1
},
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity: 2
}
];

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
