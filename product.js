function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
  }
  
  function renderProduct(product) {
    const container = document.getElementById("product-detail");
    if (!container) return;
    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }
  
    container.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
  
    const button = container.querySelector(".add-to-cart");
    if (button) {
      button.addEventListener("click", () => {
        addToCart({ ...product, quantity: 1 });
      });
    }
  }
  
  function renderProductList(products) {
    const list = document.getElementById("product-list");
    if (!list) return;
  
    list.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="btn">View</a>
        <button class="add-to-cart">Add to Cart</button>
      `;
  
      const addButton = card.querySelector(".add-to-cart");
      addButton.addEventListener("click", () => {
        addToCart({ ...product, quantity: 1 });
      });
  
      list.appendChild(card);
    });
  }
  
  function renderFeatured(products) {
    const container = document.getElementById("featured-list");
    if (!container) return;
  
    container.innerHTML = "";
    const featured = products.filter(p => p.featured).slice(0, 3);
    featured.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <a href="product.html?id=${product.id}" class="btn">View Product</a>
        <button class="add-to-cart">Add to Cart</button>
      `;
  
      const addButton = div.querySelector(".add-to-cart");
      addButton.addEventListener("click", () => {
        addToCart({ ...product, quantity: 1 });
      });
  
      container.appendChild(div);
    });
  }
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = totalCount;
    }
  }
  
  // Initialize everything
  document.addEventListener("DOMContentLoaded", () => {
    fetch("product.json")
      .then(res => res.json())
      .then(products => {
        const productId = getProductIdFromURL();
        if (productId) {
          const product = products.find(p => p.id === productId);
          renderProduct(product);
        }
        renderProductList(products);
        renderFeatured(products);
      })
      .catch(err => {
        console.error("Failed to load products.json", err);
      });
  
    updateCartCount(); // Always update cart count on load
  });
  