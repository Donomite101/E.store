document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      renderProducts(products.filter(p => p.category === "men").slice(0, 4), "men-products");
      renderProducts(products.filter(p => p.category === "women").slice(0, 4), "women-products");
      renderProducts(products.filter(p => p.category === "mix" || p.category === "unisex").slice(0, 4), "mix-products");

      updateCartCount?.(); // optional if that function exists
    });
});

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach((p, index) => {
    const highlightClass = index === 2 ? "highlight" : "";
    const imageUrl = p.images && p.images.length ? p.images[0] : "images/placeholder.png";

    container.innerHTML += `
      <div class="product-card ${highlightClass}">
        <img src="${imageUrl}" alt="${p.name}" />
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
  item ? item.qty++ : cart.push({ id: productId, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
}
