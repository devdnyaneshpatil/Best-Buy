const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");
console.log(page);

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

    let image = document.createElement("img");
    let brand = document.createElement("h2");
    let category = document.createElement("h4");
    let price = document.createElement("h3");
    let detail = document.createElement("p");
    let addtocart = document.createElement("button");

    image.setAttribute("src", ele.img);
    brand.innerText = ele.brand;
    category.innerText = ele.category;
    price.innerText = "₹" + ele.price;
    detail.innerText = ele.details;
    addtocart.innerText = "Add To Cart";
    addtocart.setAttribute("class", "cartButton");

    addtocart.addEventListener("click", () => {
      if (checkDuplicate(ele)) {
        alert("Product Aready In The Cart");
      } else {
        Cart.push({ ...ele, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(Cart));
        alert("Product Added To Cart");
      }
    });

    card.append(image, brand, price, category, addtocart);
    container.append(card);
  });
  console.log("display", data);
}

function checkDuplicate(ele) {
  for (let i = 0; i < Cart.length; i++) {
    if (Cart[i].id == ele.id) {
      return true;
    }
  }
  return false;
}
