let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayProducts(products);
updateCartCount();

// Navigation

function showSection(sectionId) {

document
.querySelectorAll(".page")
.forEach(page => {
page.classList.remove("active-page");
});

document
.getElementById(sectionId)
.classList.add("active-page");

if(sectionId === "cart"){
displayCart();
}
}

// Display Products

function displayProducts(productList){

const container =
document.getElementById("productContainer");

container.innerHTML = "";

productList.forEach(product => {

container.innerHTML += `

<div class="card">

<img src="${product.image}" alt="${product.name}">

<div class="card-content">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="price">
₹${product.price}
</div>

<button
class="add-btn"
onclick="addToCart(${product.id})">
Add to Cart
</button>

</div>

</div>

`;

});

}

// Add to Cart

function addToCart(id){

const product =
products.find(p => p.id === id);

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert(product.name + " added to cart!");
}

// Update Cart Count

function updateCartCount(){

document.getElementById("cartCount")
.innerText = cart.length;
}

// Display Cart

function displayCart(){

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

cartItems.innerHTML = "";

let total = 0;

if(cart.length === 0){

cartItems.innerHTML =
"<h3>Your cart is empty</h3>";

totalPrice.innerText =
"Total: ₹0";

return;
}

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h3>${item.name}</h3>

<p>₹${item.price}</p>

</div>

<button
class="remove-btn"
onclick="removeFromCart(${index})">
Remove
</button>

</div>

`;

});

totalPrice.innerText =
"Total: ₹" + total;
}

// Remove Item

function removeFromCart(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();
updateCartCount();
}

// Search Products

function searchProducts(){

const searchValue =
document
.getElementById("searchInput")
.value
.toLowerCase();

const category =
document
.getElementById("categoryFilter")
.value;

let filtered = products;

if(category !== "all"){

filtered = filtered.filter(product =>
product.category === category
);

}

filtered = filtered.filter(product =>
product.name.toLowerCase().includes(searchValue)
);

displayProducts(filtered);
}
// Category Filter

function filterProducts(){
searchProducts();
}