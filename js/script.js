let username=document.getElementById("user")
let logout=document.getElementById("logout")
let userinfo=document.querySelector(".user-info")
let btns=document.querySelector(".btns")
let count=localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")):0
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
let explore=document.getElementById("explore")
let section_products=document.getElementById("products_section")
explore.onclick=function(){
    section_products.scrollIntoView({
        behavior: "smooth"
    })
}
let search=document.getElementById("search-input")
let search_btn=document.getElementById("search-btn")
let product=document.querySelectorAll(".products .card")
let searchtype=document.getElementById("select_search")
function search_file(){
    let item=search.value.toLowerCase();
    let type=searchtype.value;
    product.forEach(element => {
        let productname=element.querySelector("h5").innerHTML.toLowerCase();
        let productcategory=element.querySelectorAll("p")[1].innerHTML.toLowerCase();
        if(type=="Search by Product Name"){
         if(productname.includes(item)){
            element.classList.remove("d-none");
        }
        else{
           element.classList.add("d-none");
        }
        }
        else if(type=="Search by Category"){
         if(productcategory.includes(item)){
            element.classList.remove("d-none");
        }
        else{
           element.classList.add("d-none");
        }
        }  
    });
}
search_btn.addEventListener("click",search_file)
search.addEventListener("keyup",search_file)
let favItems=localStorage.getItem("favProducts")?JSON.parse(localStorage.getItem("favProducts")):[];
let love=document.querySelectorAll(".card i")
   love.forEach(element=>{
    let card = element.closest(".card");
    let productName = card.querySelector("h5").innerText;
    let productImg = card.querySelector("img").src;
    let productCategory = card.querySelectorAll("p")[1].innerHTML;
    if (favItems.some(item => item.name === productName)) {
        element.classList.replace("fa-regular", "fa-solid");
        element.style.color = "red";
    }
    element.onclick = function() {
    if (!localStorage.getItem("username")) {
        window.location.href = "login.html";
        return;
    }
    if (element.classList.contains("fa-regular")) {
        element.classList.replace("fa-regular", "fa-solid");
        element.style.color = "red";
        let favObj = { 
        name: productName,
        img: productImg,
        category: productCategory 
        };
        favItems.push(favObj);
    } else {
        element.classList.replace("fa-solid", "fa-regular");
        element.style.color = "";
        favItems = favItems.filter(item => item.name !== productName);
    }
    localStorage.setItem("favProducts", JSON.stringify(favItems));
}
})
let productsname=document.getElementById("cart-products-names")
let buy=document.querySelectorAll(".card .btn")
let cart_count=document.getElementById("cart-count")
let viewAllBtn=document.getElementById("view_all")
let emptymsg=document.getElementById("msg_empty")
let productsincart=localStorage.getItem("productsincart")?JSON.parse(localStorage.getItem("productsincart")):[]
buy.forEach(element=>{
    element.onclick=function(){
        if(!localStorage.getItem("username")){
            window.location.href="login.html"
            return
        }
        let card = element.closest(".card");
        let name=card.querySelector("h5").innerText
        let price=card.querySelectorAll("p")[0].innerHTML
        let category=card.querySelectorAll("p")[1].innerHTML
        let img=card.querySelector("img").src
        let productid=name.replace(/\s/g, '')
        if(element.classList.contains("btn-primary")){
            viewAllBtn.classList.remove("d-none");
            emptymsg.classList.add("d-none");
            element.classList.replace("btn-primary","btn-danger")
            element.innerHTML="Remove From Cart"
            element.id = productid
            count++
            cart_count.innerHTML=count
            productsname.innerHTML += `
            <div class="cart-item justify-content-between mb-2 pb-1 cart-class" id="item-${name.replace(/\s/g,'')}">
            <div class="d-flex justify-content-between p-2">
            <p>${name}</p>
            <p>${price}</p></div>
            <div class="qty-controls d-flex justify-content-between">
            <button class="btn btn-sm w-auto ms-4" onclick="change(this,'plus')">+</button>
            <span class="qty">1</span>
            <button class="btn btn-sm w-auto me-4" onclick="change(this,'minus')">-</button>
            </div></div>`
            let producrobject={
                id:name.replace(/\s/g, ''),
                name:name,
                price:price,
                category:category,
                img:img,
                quantity:1
            }
            productsincart.push(producrobject)
            localStorage.setItem("productsincart",JSON.stringify(productsincart))
        }
        else{
            element.classList.replace("btn-danger","btn-primary")
             element.innerHTML="Add To Cart"
             count--
            cart_count.innerHTML=count
            productsincart = productsincart.filter(item => item.id !== productid);
            localStorage.setItem("productsincart", JSON.stringify(productsincart));
            let itemremove=document.getElementById(`item-${name.replace(/\s/g,'')}`)
            if(itemremove){
                itemremove.remove();
            }
        }
        localStorage.setItem("cartHTML", productsname.innerHTML);
        localStorage.setItem("cartCount", count);
    }
})
let shopping_icon=document.getElementById("cart-shopping")
let shopping=document.getElementById("window-cart")
shopping_icon.onclick=function(e){
    e.stopPropagation();
    shopping.classList.toggle("d-none");
    let isOpen = !shopping.classList.contains("d-none");
    localStorage.setItem("cartVisible", isOpen);
}
function change(btn,action){
    let num=btn.parentElement.querySelector("span")
    let current=parseInt(num.innerHTML)
    let itemcard = btn.parentElement.parentElement
    let itemid = itemcard.id.replace('item-', '')
    if(action=='plus'){
        current++;
        count++;
    }
    else if(action=='minus'){
        current--;
       count--;
    }
    let productsincart=JSON.parse(localStorage.getItem("productsincart"))||[]
    let productindex=productsincart.findIndex(item=>item.id===itemid)
    if(productindex!=-1){
        if(current>0){
            productsincart[productindex].quantity=current
        }
        else{
            productsincart.splice(productindex,1)
        }
        localStorage.setItem("productsincart", JSON.stringify(productsincart))
    }
    cart_count.innerHTML=count
     if(current==0){
        let itemcard=btn.parentElement.parentElement
        let itemid=itemcard.id.replace('item-','')
        itemcard.remove()
            let butn=document.getElementById(`${itemid}`);
            if(butn){
                butn.classList.replace("btn-danger","btn-primary")
                butn.innerHTML="Add To Cart"
            }
        }
        if (count === 0) {
        viewAllBtn.classList.add("d-none");
        emptymsg.classList.remove("d-none");
        }
        else{
         num.innerHTML=current
        } 
        localStorage.setItem("cartHTML", productsname.innerHTML);
        localStorage.setItem("cartCount", count);  
}
// document.onclick = function(e) {
// if (!shopping.contains(e.target)&&e.target!==shopping_icon) {
//        shopping.classList.add("d-none"); 
//     }
// };
window.onload=function() {
    if(localStorage.getItem("cartCount")) {
        count=parseInt(localStorage.getItem("cartCount"));
        cart_count.innerHTML=count;
    }
    if(localStorage.getItem("cartHTML")&& count) {
        productsname.innerHTML=localStorage.getItem("cartHTML");
        viewAllBtn.classList.remove("d-none");
        emptymsg.classList.add("d-none");
    }
    if(localStorage.getItem("cartVisible") === "true") {
        shopping.classList.remove("d-none");
    } else {
        shopping.classList.add("d-none");
    }
}
viewAllBtn.onclick=function(){
    window.location.href="checkout.html"
}
