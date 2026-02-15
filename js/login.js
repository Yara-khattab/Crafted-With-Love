let forget_password=document.querySelector(".forget")
forget_password.onclick=function(){
    alert("اخص عليك يا اسطاااا")
}
let usernamein=document.getElementById("username")
let passwordin=document.getElementById("password")
let login=document.getElementById("enter")
login.onclick=function(e){
e.preventDefault()
let username=localStorage.getItem("username")
let password=localStorage.getItem("password")
if(usernamein.value===""||passwordin.value===""){
    alert("Please fill in all required fields 😊")
}
else if(username!=usernamein.value||password!=passwordin.value){
  alert("❌ Username or password incorrect. Try again!")
    usernamein.value=""
    passwordin.value=""
}
else {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login successful! Redirecting...");
    window.location.href="index.html";
}
}
