// Registration
if (location.pathname.includes("register.html")) {
    document.getElementById("register-form").addEventListener("submit", e => {
      e.preventDefault();
      const name = e.target.querySelector('input[type="text"]').value;
      const email = e.target.querySelector('input[type="email"]').value;
      const password = e.target.querySelector('input[type="password"]').value;
  
      if (!name || !email || !password) return alert("Fill all fields.");
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.email === email)) return alert("User already exists!");
  
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered! Please login.");
      location.href = "login.html";
    });
  }
  
  // Login
  if (location.pathname.includes("login.html")) {
    document.getElementById("login-form").addEventListener("submit", e => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      const password = e.target.querySelector('input[type="password"]').value;
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
  
      if (!user) return alert("Invalid email or password.");
  
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      location.href = localStorage.getItem("redirectAfterLogin") || "index.html";
      localStorage.removeItem("redirectAfterLogin");
    });
  }
  
  function requireLoginPage(pageUrl) {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", pageUrl);
      alert("Login to continue.");
      location.href = "login.html";
    } else {
      location.href = pageUrl;
    }
  }
  
  function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("profileImage");
    location.href = "login.html";
  }
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
const userOrders = allOrders.filter(o => o.user === user.email);

const historyEl = document.getElementById("order-history");
if (userOrders.length === 0) {
  historyEl.innerHTML = "<p>No orders yet.</p>";
} else {
  userOrders.forEach(order => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <h4>Order ID: ${order.id}</h4>
      <p>Date: ${order.date}</p>
      <p>Total: ₹${order.total}</p>
      <p>Items: ${order.items.map(i => `${i.id} (x${i.qty})`).join(", ")}</p>
    `;
    historyEl.appendChild(div);
  });
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html"; // Redirect to login
}

document.getElementById("logout-btn")?.addEventListener("click", logout);
