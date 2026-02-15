let username=document.getElementById("user")
let logout=document.getElementById("logout")
let userinfo=document.querySelector(".user-info")
let btns=document.querySelector(".btns")
if(localStorage.getItem("username")){
  btns.style.display="none"
   userinfo.style.display="block"
    username.innerHTML=localStorage.getItem("username")
    logout.onclick=function(){
        localStorage.removeItem("isLoggedIn");
        btns.style.display="block"
        userinfo.style.display="none"
    }
}
