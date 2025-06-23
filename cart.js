document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cart.length) {
    cartContainer.innerHTML = `<div class="empty-cart-msg"><p>Your cart is empty.</p></div>`;
    totalEl.textContent = "0.00";
    return;
  }

  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      cartContainer.innerHTML = "";
      let total = 0;

      cart.forEach(item => {
        const product = products.find(p => String(p.id) === String(item.id));
        if (!product) return;

        const itemTotal = product.price * item.qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}" />
          <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price.toFixed(2)}</p>
            <div class="cart-qty">
              <button class="qty-minus" data-id="${product.id}">−</button>
              <span class="item-qty">${item.qty}</span>
              <button class="qty-plus" data-id="${product.id}">+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <p class="item-total">Subtotal: ₹${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-id="${product.id}" type="button">Remove</button>
          </div>
        `;
        cartContainer.appendChild(div);
      });

      totalEl.textContent = total.toFixed(2);
      attachCartEvents();
    })
    .catch(error => {
      console.error("Error loading products:", error);
      cartContainer.innerHTML = "<p>Failed to load cart. Please try again later.</p>";
    });
}

function attachCartEvents() {
  document.querySelectorAll(".qty-minus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.id, -1))
  );
  document.querySelectorAll(".qty-plus").forEach(btn =>
    btn.addEventListener("click", () => changeQty(btn.dataset.id, 1))
  );
  document.querySelectorAll(".remove-item").forEach(btn =>
    btn.addEventListener("click", () => removeItem(btn.dataset.id))
  );
}

function changeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => String(i.id) === String(id));
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => String(i.id) !== String(id));
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => String(i.id) !== String(id));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
