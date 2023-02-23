userData=JSON.parse(localStorage.getItem("userStoData"))
console.log(userData);
document.querySelector("#form").addEventListener("submit",checkAndEnterFun)
function checkAndEnterFun(){
    event.preventDefault();
    console.log("hi");
    var number=document.querySelector("#number").value;
    var pass=document.querySelector("#pass").value;
    for(a=0;a<userData.length;a++){
        if(userData[a].userNumber==document.querySelector("#number").value&&userData[a].userPassword==document.querySelector("#pass").value){
            alert(`${userData[a].userName} Welcome to Best Buy`);
            window.location.href="index.html";
            break;
        }else{
            if(a==userData.length-1){
                alert("Please Enter Correct Password and Mobile Number")
                break;
                
            }
            // console.log(a)
            // console.log(userData.length)
        }
    }

}

function showPass() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }