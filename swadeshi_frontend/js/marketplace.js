const products = [
  {id: 1, name: "Handmade Pottery", price: 500, img: "images/pottery.jpg"},
  {id: 2, name: "Traditional Scarf", price: 350, img: "images/scarf.jpg"},
  {id: 3, name: "Local Honey", price: 200, img: "images/honey.jpg"},
  {id: 4, name: "Brass Decor", price: 750, img: "images/brass.jpg"},
];

const productGrid = document.getElementById('productGrid');

const cart = [];

function renderProducts() {
  productGrid.innerHTML = products.map(p => `
    <div class="card product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="btn primary" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} added to cart!`);
  console.log(cart);
}

renderProducts();
