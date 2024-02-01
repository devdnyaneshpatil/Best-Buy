let formEl = document.getElementById("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const confirPass = document.getElementById("confirm-pass").value;
  if (!name || !email || !password) {
    alert(`Best BUY Says!!\nPlease Fill All The Fields`);
    return;
  }
  if(confirPass!=password){
    alert(`Best BUY Says!!\nBoth Passwords should match`);
    return
  }
  const payload={
    name,
    email,
    password
  }
  fetch("http://localhost:8080/users/register",{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(payload)
  })
  .then((res)=>res.json())
  .then((data)=>{
    alert(`Best Buy Says\n${data.msg}`)
    if(data.msg==="User Has Been Added Successfully!"){
        localStorage.setItem("userInfo",JSON.stringify(data.user))
        window.location.href="../index.html"
    }
  })
  .catch((error)=>{
    console.log(error)
  })
});
