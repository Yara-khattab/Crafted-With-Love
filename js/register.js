let first_name=document.getElementById("first")
let last_name=document.getElementById("last")
let username=document.getElementById("username")
let email=document.getElementById("email")
let password=document.getElementById("password")
let confirm_password=document.getElementById("confirm-password")
let signup=document.getElementById("signup")
signup.onclick=function(e){
    e.preventDefault()
    if(first_name.value===""||last_name.value===""||username.value===""||email.value===""||password.value===""||confirm_password.value===""){
        alert("Please fill in all required fields 😊")
    }
    else if(password.value!=confirm_password.value){
        alert("Password mismatch. Try again")
       password.value=""
       confirm_password.value=""
    }
    else if(!(password.value!=confirm_password.value)&&!(first_name.value===""||last_name.value===""||username.value===""||email.value===""||password.value===""||confirm_password.value==="")){
        localStorage.setItem("full name",first_name.value + " " + last_name.value)
        localStorage.setItem("username",username.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        alert("Awesome! Your account is ready, " + username.value + "!  Let’s get started. ")
        setTimeout(()=>{window.location.assign("index.html")},1000)
    }

}
