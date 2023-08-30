// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }
  document.querySelector("#cart-count").textContent = itemsAdded.length;


  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );
  document.querySelector("#cart-count").textContent = itemsAdded.length;

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("Your cart is empty. Add items to your cart before proceeding.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully");
  itemsAdded = [];

  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(1);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

function start() {
  addEvents();
  document.querySelector("#cart-count").textContent = itemsAdded.length;
}

const buyButton = document.querySelector(".btn-buy");
const cartContent = document.querySelector(".cart-content");


const subpageURL = "checkoutnew.html"; 


buyButton.addEventListener("click", function() {
  // Check if the cart is not empty
  if (cartContent.children.length > 0) {
    // Navigate to the subpage when the cart is not empty
    window.location.href = subpageURL;
  } else {
    // Handle the scenario when the cart is empty (you can show an alert or do nothing)
    alert("Your cart is empty. Add items to your cart before proceeding.");
    // Alternatively, you can leave this empty if you don't want any action for an empty cart
   }
});

//############################################################################
//paralax
  // const text = document.getElementById('text');
  // const bird1 = document.getElementById('bird1');
  // const bike = document.getElementById('bike');
  // const bird2 = document.getElementById('bird2');
  // const forest = document.getElementById('forest');
  // const btn = document.getElementById('btn');
  // const rocks = document.getElementById('rocks');
  // const header = document.getElementById('header');

  // window.addEventListener('scroll', () => {
  //     const value = window.scrollY;

  //     text.style.marginTop = value * 1.5 + 'px';
  //     bird1.style.top = value * -0.5 + 'px';
  //     bird1.style.left = value -0.5 + 'px'; 
  //     bike.style.left = value * 0.5 + '%'; 
  //     bird2.style.top = value * -0.5 + 'px'; 
  //     bird2.style.left = value * -0.05 + 'px'; 
  //     btn.style.marginTop = value * 1.5 + 'px';
  //     rocks.style.top = value * -0.12 + 'px';
  //     forest.style.top = value * 0.25 + 'px';
  //     header.style.top = value * 0.5 + 'px';
  // })


// //dark mode
// const body = document.body;
// const toggleThemeBtn = document.querySelector("#toggle-theme");

// // Check if a theme preference is stored in local storage
// const savedTheme = localStorage.getItem("theme");
// if (savedTheme) {
//   body.classList.add(savedTheme);
// }

// // Toggle between dark and light modes
// toggleThemeBtn.addEventListener("click", () => {
//   body.classList.toggle("dark");
//   body.classList.toggle("light");

//   // Store the current theme preference in local storage
//   const currentTheme = body.classList.contains("dark") ? "dark" : "light";
//   localStorage.setItem("theme", currentTheme);
// });

