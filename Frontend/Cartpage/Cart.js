// Write all necessery JS here
let Cart = JSON.parse(localStorage.getItem("cart"));
let container = document.getElementById("cart-container");

function displayData() {
  container.innerHTML = "";
  Cart.forEach((ele) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    let brand = document.createElement("h2");
    let category = document.createElement("h4");
    let price = document.createElement("h3");
    let detail = document.createElement("p");
    let addtocart = document.createElement("button");
    let increase = document.createElement("button");
    let decrease = document.createElement("button");
    let quantity = document.createElement("span");

    image.setAttribute("src", ele.img);
    brand.innerText = ele.brand;
    category.innerText = ele.category;
    price.innerText = "₹" + ele.price;
    detail.innerText = ele.details;
    addtocart.innerText = "Remove";
    increase.innerText = "+";
    decrease.innerText = "-";
    quantity.innerText = ele.quantity;

    addtocart.addEventListener("click", () => {
      Cart = Cart.filter((element) => {
        return element.id != ele.id;
      });
      localStorage.setItem("cart", JSON.stringify(Cart));
      displayData();
    });

    increase.addEventListener("click", () => {
      Cart = Cart.map((element) => {
        if (element.id == ele.id) {
          ele.quantity++;
          return element;
        } else {
          return element;
        }
      });
      localStorage.setItem("cart", JSON.stringify(Cart));
      displayData();
    });

    decrease.addEventListener("click", () => {
      Cart = Cart.map((element) => {
        if (element.id == ele.id && element.quantity > 1) {
          ele.quantity--;
          return element;
        } else {
          return element;
        }
      });
      localStorage.setItem("cart", JSON.stringify(Cart));
      displayData();
    });

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
      brand,
      price,
      category,
      increase,
      quantity,
      decrease,
      addtocart
    );
    container.append(card);
  });
  // console.log('display',data)
}
displayData();
