let box = document.querySelector("#box")
let cart_amount = document.querySelector(".cart-amount")

let basket = JSON.parse(localStorage.getItem("productData"))

function getCartItem() {
    
    if (basket.length !== 0) {
        console.log("fsdafsd");
        return (box.innerHTML = basket.map((elem) => {
            let { id, item } = elem;
            let search = product.find((elem) => elem.id === id)
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
                        <h4 class="discontedPercentProduct">${search.discouned} %</h4>
                    </div>
                    <div class="priceProductAddCart">
                        <h4 class="priceProduct">$ ${Math.round(search.price - (search.price * ( search.discouned / 100 )))}</h4>
                        <div class="actionProducts">
                            <i class="fa-solid fa-minus"></i>
                            <p>${item}</p>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </article>
            `
        }).join(""))
    }
    else{
        box.innerHTML = ""
    }
}
getCartItem();

// remove item when delete icon clicked from the cart
function removeItem(id) {
    basket = basket.filter((elem) => elem.id !== id)
    calculation()
    setTimeout(() => {
        getCartItem();
    }, 500);
    localStorage.setItem("productData", JSON.stringify(basket))
    
}

// calculation
function calculation() {
    cart_amount.innerHTML = basket.map((elem) => elem.item).reduce((a, b) => a + b, 0)
}
calculation();