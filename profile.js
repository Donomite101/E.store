document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return location.href = "login.html";
  
    // Fill profile form with user data
    document.getElementById("user-name").textContent = `${user.firstName || ""} ${user.lastName || ""}`;
    document.getElementById("firstName").value = user.firstName || "";
    document.getElementById("lastName").value = user.lastName || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("dob").value = user.dob || "";
  
    if (user.gender) {
      const genderInput = document.querySelector(`input[name="gender"][value="${user.gender}"]`);
      if (genderInput) genderInput.checked = true;
    }
  
    // Load avatar
    const avatar = document.getElementById("profileAvatar");
    const savedImg = localStorage.getItem("profileImage");
    avatar.src = user.profileImage || savedImg || "default-avatar.png";
  
    // Load order history
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = orders.filter(o => o.userEmail === user.email);
    renderOrderHistory(userOrders);
  });
  
  // Save updated profile
  document.getElementById("profile-form").addEventListener("submit", e => {
    e.preventDefault();
    const current = JSON.parse(localStorage.getItem("currentUser")) || {};
  
    const updatedUser = {
      ...current,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      dob: document.getElementById("dob").value,
      gender: document.querySelector("input[name='gender']:checked")?.value || "",
      profileImage: document.getElementById("profileAvatar").src
    };
  
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  
    // Update users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    alert("✅ Profile updated successfully!");
  });
  
  // Upload avatar
  document.getElementById("profileImageInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const src = e.target.result;
      document.getElementById("profileAvatar").src = src;
      localStorage.setItem("profileImage", src);
    };
    reader.readAsDataURL(file);
  });
  
  // Logout
  function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
  }
  
  // Render order history
  function renderOrderHistory(orders) {
    const container = document.getElementById("orderHistoryContainer");
    if (orders.length === 0) {
      container.innerHTML = "<p>You have no past orders.</p>";
      return;
    }
  
    container.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span>Order ID: #${order.id}</span>
          <span>${order.date}</span>
        </div>
        <ul class="order-items">
          ${order.items.map(i => `<li>${i.name} × ${i.qty} = ₹${(i.qty * i.price).toFixed(2)}</li>`).join("")}
        </ul>
        <div class="order-footer">
          <span>Payment: ${order.payment}</span>
          <span>Total: ₹${order.total.toFixed(2)}</span>
        </div>
      </div>
    `).join("");
  }
  