let box = document.querySelector("#box");
let cart_amount = document.querySelector(".cart-amount");
let total_cart_amount = document.querySelector(".total-cart-amount");
let btnClearCart = document.querySelector(".btnClearCart");
let total_amount = document.querySelector(".total-amount");

let basket = JSON.parse(localStorage.getItem("productData")) || [];
console.log(basket);

function getCartItem() {
  if (basket.length !== 0) {
    return (box.innerHTML = basket
      .map((elem) => {
        let { id, item } = elem;
        let search = product.find((elem) => elem.id === id);
        return `
            <article class="productItem">
                <img class="productImg" src="${search.img}" alt="">
                <div class="contentProduct">
                    <div class="navProductItem">
                        <h3 class="productName">${search.name}</h3>
                        <i class="fa-solid fa-trash-can" onclick="removeItem(${id})"></i>
                    </div>
                    <p class="productDescription">${search.description}</p>
                    <div class="discountedPricesesProduct">
                        <p class="discountedPriceProduct">$ ${search.price}</p>
                        <h4 class="discontedPercentProduct">${
                          search.discouned
                        } %</h4>
                    </div>
                    <div class="priceProductAddCart">
                        <h4 class="priceProduct">$ ${Math.round(
                          search.price - search.price * (search.discouned / 100)
                        )}</h4>
                        <div class="actionProducts">
                            <i class="fa-solid fa-minus" onclick="decrement(${
                              elem.id
                            })"></i>
                            <p>${item}</p>
                            <i class="fa-solid fa-plus" onclick="increment(${
                              elem.id
                            })"></i>
                        </div>
                    </div>
                </div>
            </article>
            `;
      })
      .join(""));
  } else {
    box.innerHTML = `
        <div class="emptyCart">
            <img src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=" alt="">
            <h2 class="textEmpryCart">Cart is Empty</h2>
            <a href="./product.html">
                <h4 class="btnBackHome">Back to Product</h4>
            </a>
        </div>
        `;
  }
}
getCartItem();

// remove item when delete icon clicked from the cart
function removeItem(id) {
  basket = basket.filter((elem) => elem.id !== id);
  calculation();
  setTimeout(() => {
    getCartItem();
  }, 500);
  localStorage.setItem("productData", JSON.stringify(basket));
  setTimeout(() => {
    getCartItem();
  }, 1000);
  total_cart();
}
// increment function
const increment = (id) => {
  let search = basket.find((elem) => elem.id === id);
  search.item += 1;
  localStorage.setItem("productData", JSON.stringify(basket));
  getCartItem();
  calculation();
  total_cart();
};

// decrement function
const decrement = (id) => {
  let search = basket.find((elem) => elem.id == id);
  if (search.item == 0) {
    document.querySelector(".fa-minus").style.cursor = "no-drop";
    return "";
  }
  search.item -= 1;
  basket = basket.filter((elem) => elem.item !== 0);
  localStorage.setItem("productData", JSON.stringify(basket));
  setTimeout(() => getCartItem(), 500);
  calculation();
  total_cart();
};

// total cart amount
function total_cart() {
  if (basket.length !== 0) {
    let amount = basket
      .map((elem) => {
        let { id, item } = elem;
        let search = product.find((elem) => elem.id === id);
        return (item *= search.price - search.price * (search.discouned / 100));
      })
      .reduce((a, b) => a + b, 0);
    total_cart_amount.innerHTML = `Total bill: ${amount}`;
    total_cart_amount.style.fontSize = "30px";
  } else {
    total_amount.style.display = "none";
    return;
  }
}
total_cart();

// calculation
function calculation() {
  cart_amount.innerHTML = basket.map((elem) => elem.item).length;
}
calculation();

// clear cart
btnClearCart.onclick = () => {
  clearCart();
  total_amount.style.display = "none";
  total_cart_amount.innerHTML = `Total bill: 0`;
};
const clearCart = () => {
  basket = [];
  getCartItem();
  calculation();
  localStorage.setItem("productData", JSON.stringify(basket));
};
