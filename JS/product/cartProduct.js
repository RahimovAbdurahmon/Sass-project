let box = document.querySelector("#box")
let cart_amount = document.querySelector(".cart-amount")

let basket = JSON.parse(localStorage.getItem("productData"))
console.log(basket);

function calculation() {
    cart_amount.innerHTML = basket.map((elem) => elem.item).reduce((a, b) => a + b, 0)
}
calculation();