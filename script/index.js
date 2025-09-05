// homepage.js

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadFeaturedProducts();
});

// Load categories
function loadCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories?limit=12")
    .then(res => res.json())
    .then(categories => {
      const categorycarousel = document.querySelector(".categoriescarousel");
      categorycarousel.innerHTML = "";
      categories.forEach(cat => {
        const div = document.createElement("div");
        div.classList.add("categorycontainer");
        div.innerHTML = `
          <img src="${cat.image}" alt="${cat.name}" class="categoryproduct"/>
          <h3>${cat.name}</h3>
        `;
        categorycarousel.appendChild(div);
      });
    })
    .catch(err => console.error("Error loading categories:", err));
}

// Load featured products
function loadFeaturedProducts() {
  fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8")
    .then(res => res.json())
    .then(products => {
      const productcarousel = document.querySelector(".products-carousel");
      productcarousel.innerHTML = "";
      products.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("productcontainer");
        div.innerHTML = `
          <img src="${prod.images[0]}" alt="${prod.title}">
          <h3>${prod.title}</h3>
          <p>$${prod.price}</p>
          <a href="pages/product.html?id=${prod.id}" class="btn">View Details</a>
        `;
        productcarousel.appendChild(div);
      });
    })
    .catch(err => console.error("Error loading featured products:", err));
}
