let formEl=document.getElementById("form")

formEl.addEventListener("submit",(e)=>{
    e.preventDefault()
    const payload={
        email:document.getElementById("email").value,
        password:document.getElementById("pass").value
    }
    fetch("http://localhost:8080/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert(`Best Buy Says!!\n${data.msg}`)
        console.log(data.msg)
        if(data.msg=="Login Successfull"){
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            window.location.href='../index.html'
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})