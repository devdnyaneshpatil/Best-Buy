

function newWindow1() {
  window.location.assign("https://www.bestbuy.com/");
}
function newWindow2() {
  window.location.assign(
    "https://www.bestbuy.com/site/samsung-store/learn-about-samsung-galaxy-s23/pcmcat1674142583070.c?id=pcmcat1674142583070"
  );
}
function newWindow3() {
  window.location.assign(
    "https://www.bestbuy.com/site/electronics/outlet-refurbished-clearance/pcmcat142300050026.c?id=pcmcat142300050026"
  );
}
function newWindow4() {
  window.location.assign(
    "https://www.bestbuy.com/site/macbook-air-13-6-laptop-apple-m2-chip-8gb-memory-256gb-ssd-latest-model-midnight/6509650.p?skuId=6509650"
  );
}

window.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if(user){
    let accEl=this.document.getElementById("account")
    accEl.innerText=user.name
    fetch("http://localhost:8080/users/cart",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${user.token}`
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      this.document.getElementById("cart").innerText=`(${data.msg.length})`
    })
    .catch((error)=>{
      console.log(error)
    })
  }
});


