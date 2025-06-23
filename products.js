document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      renderProducts(data.filter(p => p.category === "men").slice(0, 4), "men-products");
      renderProducts(data.filter(p => p.category === "women").slice(0, 4), "women-products");
      renderProducts(data.filter(p => p.category === "mix").slice(0, 4), "mix-products");
      updateCartCount();
    });
});

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach((p, index) => {
    const highlightClass = index === 2 ? "highlight" : ""; // 3rd item highlighted
    container.innerHTML += `
  <div class="product-card">
    <img src="${p.images[0]}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p class="price">₹${p.price}</p>
    <div class="btn-group">
      <a href="product.html?id=${p.id}" class="btn">View Product</a>
      <button onclick="addToCart('${p.id}')" class="btn">Add to Cart</button>
    </div>
  </div>
`;

    
  });
}
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
 
}
