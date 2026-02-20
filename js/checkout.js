let cart_badge = document.getElementById("cart-count");
let savedValue = localStorage.getItem("cartCount"); 
cart_badge.innerHTML=savedValue || 0
let username=document.getElementById("user")
let logout=document.getElementById("logout")
let userinfo=document.querySelector(".user-info")
let btns=document.querySelector(".btns")
if(localStorage.getItem("username")){
  btns.style.display="none"
   userinfo.style.display="block"
    username.innerHTML=localStorage.getItem("username")
    logout.onclick=function(){
        localStorage.clear()
        count = 0;
        cart_count.innerHTML = 0;
        productsname.innerHTML = "";
        viewAllBtn.classList.add("d-none");
        emptymsg.classList.remove("d-none");
        // localStorage.removeItem("isLoggedIn");
        btns.style.display="block"
        userinfo.style.display="none"
    }
}
let productsContainer=document.getElementById("checkout-items");
let totalPriceDom=document.getElementById("total-price");
function drawCheckoutItems() {
    let productsInCart = JSON.parse(localStorage.getItem("productsincart")) || [];
    if (productsInCart.length === 0) {
        productsContainer.innerHTML = "<h3>Your cart is empty!</h3>";
        totalPriceDom.innerHTML = "$0";
        return;
    }

    let itemsHtml= productsInCart.map((item) => {
        return `
        <div class="card mb-3 p-2 shadow-sm border-0">
            <div class="row g-0 align-items-center">
                <div class="col-md-2">
                    <img src="${item.img}" class="img-fluid rounded" style="max-height: 100px;">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted">${item.category}</p>
                        <p class="card-text text-muted">${item.price}</p>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <span class="fw-bold">Quantity: ${item.quantity}</span>
                </div>
                <div class="col-md-2 text-center">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        </div>`;
    }).join("");

    productsContainer.innerHTML = itemsHtml;
    calculateTotal(productsInCart);
}
window.removeItem = function(id) {
    let products = JSON.parse(localStorage.getItem("productsincart")) || [];
    let productToDelete = products.find(item => item.id === id);
    let filtered = products.filter(item => item.id !== id);
    localStorage.setItem("productsincart", JSON.stringify(filtered));
    let newCount = filtered.reduce((acc, curr) => acc + curr.quantity, 0);
    localStorage.setItem("cartCount", newCount);
    let cart_badge = document.getElementById("cart-count");
    if (cart_badge) cart_badge.innerHTML = newCount;
    let cartHTML = localStorage.getItem("cartHTML");
    if (cartHTML) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = cartHTML;
        let itemById = tempDiv.querySelector(`#item-${id}`); 
        if (itemById) {
            itemById.remove();
        } else if (productToDelete) {
            let safeId = productToDelete.name.replace(/\s/g, '');
            let itemBySafeId = tempDiv.querySelector(`#item-${safeId}`);
            if (itemBySafeId) itemBySafeId.remove();
        }
        localStorage.setItem("cartHTML", tempDiv.innerHTML);
    }
    drawCheckoutItems();
    if (filtered.length === 0) {
        localStorage.removeItem("cartHTML");
        localStorage.setItem("cartCount", 0);
    }
}
function calculateTotal(products) {
    let total = products.reduce((acc, curr) => {
        let priceValue = parseFloat(curr.price.replace(/[^\d.]/g, ''));
        return acc + (priceValue * curr.quantity);
    }, 0);
    if(totalPriceDom) totalPriceDom.innerHTML = "$" + total;
}
drawCheckoutItems();
function drawFavoriteItems() {
    let favItems = JSON.parse(localStorage.getItem("favProducts")) || [];
    let favoriteContainer = document.getElementById("favorite-items");
    if (!favoriteContainer) return;
    if (favItems.length === 0) {
        favoriteContainer.innerHTML = "<p class='text-muted text-center'>مفيش منتجات في المفضلات حالياً.</p>";
        return;
    }
    let favHtml = favItems.map((item) => {
        return `
        <div class="col-md-3 mb-4 d-flex justify-content-center">
            <div class="card shadow-sm border-0 position-relative text-center p-2" style="width: 18rem;">
                <i class="fa-solid fa-heart position-absolute" 
                   style="color: red; right: 15px; top: 15px; cursor: pointer; z-index: 10;" 
                   onclick="removeFromFav('${item.name}')"></i>
                
                <img src="${item.img}" class="card-img-top rounded" style="height: 180px; object-fit: cover;">
                
                <div class="card-body">
                    <h5 class="card-title" style="font-weight: bold;">${item.name}</h5>
                    <p class="card-text text-muted">Category: ${item.category}</p>
                </div>
            </div>
        </div>`;
    }).join("");
    favoriteContainer.innerHTML = `<div class="row w-100">${favHtml}</div>`;
}
window.removeFromFav = function(name) {
    let favItems = JSON.parse(localStorage.getItem("favProducts")) || [];
    favItems = favItems.filter(item => item.name !== name);
    localStorage.setItem("favProducts", JSON.stringify(favItems));
    drawFavoriteItems();
}
drawFavoriteItems();