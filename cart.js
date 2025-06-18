function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    saveCart(cart);
    alert(`${product.name} added to cart`);
  }
  
  function removeFromCart(id) {
    let cart = getCart().filter(item => item.id != id);
    saveCart(cart);
    renderCart();
  }
  
  function updateQuantity(id, newQty) {
    const cart = getCart();
    const item = cart.find(p => p.id == id);
    if (item) item.quantity = newQty;
    saveCart(cart);
    updateCartTotal();
  }
  
  function updateCartTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
  }
  
  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = getCart();
    cartItemsContainer.innerHTML = "";
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById("cart-total").textContent = "$0.00";
      return;
    }
  
    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <label>
            Qty: <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" />
          </label>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => removeFromCart(e.target.dataset.id));
    });
  
    document.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener("change", e => {
        const id = e.target.dataset.id;
        const qty = parseInt(e.target.value);
        if (qty >= 1) {
          updateQuantity(id, qty);
        }
      });
    });
  
    updateCartTotal();
  }
  
  if (document.getElementById("cart-items")) renderCart();
  