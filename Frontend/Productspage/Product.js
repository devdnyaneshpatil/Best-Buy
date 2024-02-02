




const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");

const url = `http://localhost:8080/products?category=${page}`;

async function fetchData() {
  try {
    let res = await fetch(url);
    let response = await res.json(); // Parse the response as JSON
    displayData(response.msg);
  } catch (error) {
    console.log("error", error);
  }
}

fetchData();

// let filterby = document.getElementById("filter");
// filterby.addEventListener("change", () => {
//   fetchData();
// });
// function filterData(data) {
//   if (filterby.value == "") {
//     displayData(data);
//   } else {
//     data = data.filter((ele) => {
//       return ele.category == filterby.value;
//     });
//     displayData(data);
//   }
// }

let container = document.getElementById("product-container");
function displayData(data) {
  container.innerHTML = "";
  data.forEach((ele) => {
    let card = document.createElement("div");
    card.setAttribute("data-id", ele._id);
    let image = document.createElement("img");
    let title = document.createElement("h2");
    let category = document.createElement("h4");
    let price = document.createElement("h3");
    let detail = document.createElement("p");
    let addtocart = document.createElement("button");

    image.setAttribute("src", ele.img);
    title.innerText = ele.title;
    category.innerText = ele.category;
    price.innerText = "₹" + ele.price;
    detail.innerText = ele.description;
    addtocart.innerText = "Add To Cart";
    addtocart.setAttribute("class", "cartButton");

    addtocart.addEventListener("click", () => {
      let proId=card.getAttribute("data-id")
      if (userInfo) {
        fetch(`http://localhost:8080/users/addToCart/${proId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.msg);
          })
          .catch((error) => console.log(error));
      } else {
        alert(
          "Best Buy Says\nYou have to login first to add this item to cart"
        );
      }
    });

    card.append(image, title, price, category, addtocart);
    container.append(card);
  });
}


//search functionality
let searchEl=document.getElementById("search")

searchEl.addEventListener("keyup",(e)=>{
  fetch(`http://localhost:8080/products?category=${page}&search=${e.target.value}`)
  .then((res)=>res.json())
  .then((data)=>{
    displayData(data.msg)
  })
  .catch((error)=>{
    console.log(error)
  })
})


