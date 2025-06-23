// Product Page Display
const params = new URLSearchParams(location.search);
const productId = params.get("id");
let currentProduct = null;

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    currentProduct = data.find(p => String(p.id) === String(productId));
    if (currentProduct) displayProduct(currentProduct);
  });

function displayProduct(product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `₹${product.price}`;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("main-image").src = product.images[0];
  document.getElementById("breadcrumb-product-name").textContent = product.name;

  const thumbContainer = document.getElementById("thumbnails");
  thumbContainer.innerHTML = "";

  product.images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      document.getElementById("main-image").src = img;
      document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbContainer.appendChild(thumb);
  });
}

function addToCart(id) {
  const pid = String(id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === pid);
  if (item) item.qty++;
  else cart.push({ id: pid, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Product added to cart!");
}
