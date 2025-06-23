
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const orderItemsContainer = document.getElementById("orderItems");
  const totalElement = document.getElementById("orderTotal");

  if (!currentUser) {
    alert("Please login to continue.");
    return window.location.href = "login.html";
  }

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      let total = 0;
      const enrichedCart = cart.map(item => {
        const product = products.find(p => p.id == item.id);
        if (!product) return null;

        const lineTotal = product.price * item.qty;
        total += lineTotal;

        return {
          ...item,
          name: product.name,
          price: product.price
        };
      }).filter(Boolean); // remove nulls

      orderItemsContainer.innerHTML = enrichedCart.map(item =>
        `<p>${item.name} × ${item.qty} = ₹${(item.price * item.qty).toFixed(2)}</p>`
      ).join("");

      totalElement.textContent = total.toFixed(2);

      // Save enriched cart to use in order
      document.getElementById("billingForm").addEventListener("submit", e => {
        e.preventDefault();

        const payment = document.getElementById("paymentMethod").value;
        if (!payment) return alert("Select a payment method.");

        const order = {
          id: Date.now(),
          userEmail: currentUser.email,
          items: enrichedCart,
          total,
          payment,
          date: new Date().toLocaleDateString()
        };

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("lastOrder", JSON.stringify(order));
        localStorage.removeItem("cart");

        window.location.href = "order-confirmation.html"; // ✅ Redirect here
      });
    });
});

