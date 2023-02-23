document.querySelector("#form").addEventListener("submit",createAccFun)
 

 var userData=JSON.parse(localStorage.getItem("userStoData"))||[];
function createAccFun(){
    event.preventDefault();
     var name=document.querySelector("#cusName").value;
     var number=document.querySelector("#number").value;
     var email=document.querySelector("#email1").value;
     var pass=document.querySelector("#pass").value;
     var dataObj={
        userName:name,
        userNumber:number,
        userEmail:email,
        userPassword:pass
     }
     if(name==""||number==""||email==""||pass==""){
        alert("Please Provide correct Data")
     }else{
        userData.push(dataObj);
        localStorage.setItem("userStoData",JSON.stringify(userData));
        alert("Account created successfully");
        window.location.href="login.html"
     }
     
     
}