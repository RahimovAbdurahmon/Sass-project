const box = document.querySelector("#box");
let cart_amount = document.querySelector(".cart-amount")

// window.location.href = "http://127.0.0.1:5501/HTML/index.html"

let basket = JSON.parse(localStorage.getItem("productData")) || []
console.log(basket);


function getProduct(data) {
  return (box.innerHTML = product.map((elem) => {
    let { id, name, description, img, price, discouned, isSaled } = elem;
    return `
        <article class="productItem">
            <img class="productImg" src="${img}" alt="">
            <div class="contentProduct">
                <h3 class="productName">${name}</h3>
                <p class="productDescription">${description}</p>
                <div class="discountedPricesesProduct">
                    <p class="discountedPriceProduct">$ ${price}</p>
                    <h4 class="discontedPercentProduct">${discouned} %</h4>
                </div>
                <div class="priceProductAddCart">
                    <h4 class="priceProduct">$ ${Math.round(price - (price * (discouned / 100)))}</h4>
                    <div class="button btnAddToCart" onclick="addToCart(${id})">
                        <div class="button-wrapper">
                            <div class="text">Add To Cart</div>
                            <span class="icon">
                                <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16"
                                    width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        `;
  }).join(""));
}
getProduct()

function addToCart(id) {
    let search = basket.find((elem) => elem.id == id)
    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        })
    }
    else {
        search.item += 1;
    }
    localStorage.setItem("productData", JSON.stringify(basket))
    calculation()
}

function calculation() {
    const sumProduct = basket.map((elem) => elem.item).length
    cart_amount.innerHTML = sumProduct;
}
console.log(calculation());
