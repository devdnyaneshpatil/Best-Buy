// Write all necessery JS here

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  alert("Welcome to the cart");
} else {
  alert("Best Buy Says\nLogin First");
  window.location.href = "../Authentication/login.html";
}

fetch("http://localhost:8080/users/cart", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${userInfo.token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    displayData(data.msg);
  })
  .catch((error) => console.log(error));
let container = document.getElementById("cart-container");

function displayData(Cart) {
  container.innerHTML = "";
  Cart.forEach((ele) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    let title = document.createElement("h2");
    let category = document.createElement("h4");
    let price = document.createElement("h3");
    let desc = document.createElement("p");
    let addtocart = document.createElement("button");
    let increase = document.createElement("button");
    let decrease = document.createElement("button");
    // let quantity = document.createElement("span");

    image.setAttribute("src", ele.img);
    title.innerText = ele.title;
    category.innerText = ele.category;
    price.innerText = "₹" + ele.price;
    desc.innerText = ele.description;
    addtocart.innerText = "Remove";
    increase.innerText = "+";
    decrease.innerText = "-";
    // quantity.innerText = ele.quantity;

    // addtocart.addEventListener("click", () => {
    //   Cart = Cart.filter((element) => {
    //     return element.id != ele.id;
    //   });
    //   localStorage.setItem("cart", JSON.stringify(Cart));
    //   displayData();
    // });

    // increase.addEventListener("click", () => {
    //   Cart = Cart.map((element) => {
    //     if (element.id == ele.id) {
    //       ele.quantity++;
    //       return element;
    //     } else {
    //       return element;
    //     }
    //   });
    //   localStorage.setItem("cart", JSON.stringify(Cart));
    //   displayData();
    // });

    // decrease.addEventListener("click", () => {
    //   Cart = Cart.map((element) => {
    //     if (element.id == ele.id && element.quantity > 1) {
    //       ele.quantity--;
    //       return element;
    //     } else {
    //       return element;
    //     }
    //   });
    //   localStorage.setItem("cart", JSON.stringify(Cart));
    //   displayData();
    // });

    let sum = 0;
    for (let i = 0; i < Cart.length; i++) {
      if (Cart == "") {
        sum = 0;
      } else {
        sum += Cart[i].price * Cart[i].quantity;
      }
    }
    document.getElementById("cart-total").innerText = `$` + " " + sum;
    card.append(
      image,
      title,
      price,
      category,
      increase,
      decrease,
      addtocart
    );
    container.append(card);
  });
  // console.log('display',data)
}
