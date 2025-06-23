const category = new URLSearchParams(location.search).get("cat");
document.getElementById("category-title").textContent = category?.toUpperCase() || "ALL";

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const filtered = category ? data.filter(p => p.category === category) : data;
    const container = document.getElementById("category-products");
    filtered.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price}</p>
          <a href="product.html?id=${product.id}" class="btn">View</a>
          <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>`;
      container.appendChild(div);
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");
    document.getElementById("category-title").textContent = category?.toUpperCase() || "ALL";
  
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = category ? data.filter(p => p.category === category) : data;
        const container = document.getElementById("category-products");
  
        filtered.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="price">₹${product.price}</p>
              <a href="product.html?id=${product.id}" class="btn">View Product</a>
              <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>`;
          container.appendChild(card);
        });
      });
  });
  
  // ✅ Global addToCart function
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
  