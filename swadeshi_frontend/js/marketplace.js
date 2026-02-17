const products = [
  { id: 1, name: 'Handmade Pottery', price: 500, icon: 'Pottery' },
  { id: 2, name: 'Traditional Scarf', price: 350, icon: 'Scarf' },
  { id: 3, name: 'Local Honey', price: 200, icon: 'Honey' },
  { id: 4, name: 'Brass Decor', price: 750, icon: 'Brass' }
];

const productGrid = document.getElementById('productGrid');
const cart = [];

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (p) => `
    <div class="card product-card">
      <div style="font-size:0.9rem;font-weight:600;margin-bottom:0.75rem;">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>INR ${p.price}</p>
      <button class="btn primary" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `
    )
    .join('');
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  cart.push(product);
  alert(`${product.name} added to cart.`);
}

window.addToCart = addToCart;
renderProducts();
