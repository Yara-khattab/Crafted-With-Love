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
