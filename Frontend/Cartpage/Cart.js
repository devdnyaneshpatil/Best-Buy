const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (!userInfo) {
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

function displayData(cart) {
  container.innerHTML = "";
  let sum = 0;

  cart.forEach((ele) => {
    let card = document.createElement("div");
    card.setAttribute("data-id", ele._id);

    let image = document.createElement("img");
    let title = document.createElement("h2");
    let category = document.createElement("h4");
    let price = document.createElement("h3");
    let removeFromCart = document.createElement("button");
    let buyOrder = document.createElement("button");

    image.setAttribute("src", ele.img);
    title.innerText = ele.title;
    category.innerText = ele.category;
    price.innerText = "₹" + ele.price;

    removeFromCart.innerText = "Remove";
    buyOrder.innerText='Buy Item'
    removeFromCart.addEventListener("click", () => removeCartItem(ele._id));

    sum += ele.price; // Assuming price is a number

    card.append(image, title, price, category, removeFromCart,buyOrder);
    container.append(card);
  });

  document.getElementById("cart-total").innerText = `₹${sum.toFixed(2)}`;
}

function removeCartItem(productId) {
  fetch(`http://localhost:8080/users/removeFromCart/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.msg)
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
    })
    .catch((error) => console.log(error.message));
}
