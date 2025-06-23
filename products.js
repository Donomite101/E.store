document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      renderProducts(products.filter(p => p.category === "men").slice(0, 4), "men-products");
      renderProducts(products.filter(p => p.category === "women").slice(0, 4), "women-products");
      renderProducts(products.filter(p => p.category === "mix" || p.category === "unisex").slice(0, 4), "mix-products");

      if (typeof updateCartCount === "function") updateCartCount();
    });
});

function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach((p, index) => {
    const imageUrl = p.images && p.images.length ? p.images[0] : "images/placeholder.png";

    container.innerHTML += `
      <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
        <div class="w-full h-56 overflow-hidden">
          <img src="${imageUrl}" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">${p.name}</h3>
          <p class="text-sm text-gray-500 mb-2 line-clamp-2">${p.description || ""}</p>
          <p class="text-blue-600 font-bold text-lg mb-4">₹${p.price}</p>
          <div class="flex gap-2 mt-auto">
            <a href="product.html?id=${p.id}" class="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded transition">
              View
            </a>
            <button onclick="addToCart('${p.id}')" class="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}
