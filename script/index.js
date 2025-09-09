

// cartcount = document.querySelectorAll(".cart-count");
// cartcount.forEach(count => count.textContent = 0);


// // homepage.js

// document.addEventListener("DOMContentLoaded", () => {
//   loadCategories();
//   loadFeaturedProducts();
// });

// // Load categories
// function loadCategories() {
//   fetch("https://api.escuelajs.co/api/v1/categories?limit=12")
//     .then(res => res.json())
//     .then(categories => {
//       const categorycarousel = document.querySelector(".categoriescarousel");
//       categorycarousel.innerHTML = "";
//       categories.forEach(cat => {
//         const div = document.createElement("div");
//         div.classList.add("categorycontainer");
//         div.innerHTML = `
//           <img src="${cat.image}" alt="${cat.name}" class="categoryproduct"/>
//           <h3>${cat.name}</h3>
//         `;
//         categorycarousel.appendChild(div);
//       });
//     })
//     .catch(err => console.error("Error loading categories:", err));
// }

// // Load featured products
// function loadFeaturedProducts() {
//   fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8")
//     .then(res => res.json())
//     .then(products => {
//       const productcarousel = document.querySelector(".products-carousel");
//       productcarousel.innerHTML = "";
//       products.forEach(prod => {
//         const div = document.createElement("div");
//         div.classList.add("productcontainer");
//         div.innerHTML = `
//           <img src="${prod.image}" alt="${prod.title}" class="product">
//           <h3>${prod.title}</h3>
//           <p>$${prod.price}</p>
//           <br>
//           <a href="pages/product.html?id=${prod.id}" class="btn">View Details</a>
//         `;
//         productcarousel.appendChild(div);
//       });
//     })
//     .catch(err => console.error("Error loading featured products:", err));
// }


// // cart.js

// document.addEventListener("DOMContentLoaded", () => {
//   displayCart();
// });

// function displayCart() {
//   const container = document.getElementById("cart-container");
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   if (cart.length === 0) {
//     container.innerHTML = "<p>Your cart is empty.</p>";
//     return;
//   }

//   container.innerHTML = "";
//   let grandTotal = 0;

//   cart.forEach(item => {
//     const div = document.createElement("div");
//     div.classList.add("cart-item");
//     div.innerHTML = `
//       <img src="${item.image}" alt="${item.title}" style="width:80px;">
//       <h3>${item.title}</h3>
//       <p>$${item.price} x ${item.quantity}</p>
//       <p><strong>Total:</strong> $${item.price * item.quantity}</p>
//       <button class="btn-remove" onclick="removeFromCart(${item.id})">❌ Remove</button>
//     `;
//     container.appendChild(div);
//     grandTotal += item.price * item.quantity;
//   });

//   // Show grand total + checkout button
//   const summary = document.createElement("div");
//   summary.classList.add("cart-summary");
//   summary.innerHTML = `
//     <h3>Grand Total: $ ${grandTotal.toFixed(2)}</h3>
//     <button class="btn" onclick="goToCheckout()">Proceed to Checkout</button>
//   `;
//   container.appendChild(summary);
// }

// function removeFromCart(id) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart = cart.filter(item => item.id !== id); // remove item
//   localStorage.setItem("cart", JSON.stringify(cart));
//   displayCart(); // refresh cart display
// }

// function goToCheckout() {
//   window.location.href = "checkout.html";
// }




// // homepage.js

// document.addEventListener("DOMContentLoaded", () => {
//   loadCategories();
//   loadFeaturedProducts();
// });

// // Load categories
// function loadCategories() {
//   fetch("https://api.escuelajs.co/api/v1/categories?limit=12")
//     .then(res => res.json())
//     .then(categories => {
//       const categorycarousel = document.querySelector(".categoriescarousel");
//       categorycarousel.innerHTML = "";
//       categories.forEach(cat => {
//         const div = document.createElement("div");
//         div.classList.add("categorycontainer");
//         div.style.padding = "0.3em"
//         div.innerHTML = `
//           <img src="${cat.image}" alt="${cat.name}" class="categoryproduct"/>
//           <h3>${cat.name}</h3>
//         `;
//         categorycarousel.appendChild(div);
//       });
//     })
//     .catch(err => console.error("Error loading categories:", err));
// }

// // Load featured products
// function loadFeaturedProducts() {
//   fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8")
//     .then(res => res.json())
//     .then(products => {
//       const productcarousel = document.querySelector(".products-carousel");
//       productcarousel.innerHTML = "";
//       products.forEach(prod => {
//         const div = document.createElement("div");
//         div.classList.add("productcontainer");
//         div.style.padding = "0.3em"
//         div.innerHTML = `
//           <img src="${prod.image}" alt="${prod.title}">
//           <h3>${prod.title}</h3>
//           <p>$${prod.price}</p>
//           <br>
//           <a href="pages/product.html?id=${prod.id}" class="btn">View Details</a>
//         `;
//         productcarousel.appendChild(div);
//       });
//     })
//     .catch(err => console.error("Error loading featured products:", err));
// }




document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadFeaturedProducts();
    updateCartCount();
});

// CART
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function addToCart(product) {
    let cart = getCart();
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
        exists.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = getCart();
    document.getElementById("cart-count").textContent =
        cart.reduce((acc, item) => acc + item.quantity, 0);
}

// FEATURED PRODUCTS
async function loadFeaturedProducts(categoryId = null) {
    try {
        let url = categoryId
            ? `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
            : `https://api.escuelajs.co/api/v1/products?offset=0&limit=20`;

        const res = await fetch(url);
        const products = await res.json();
        const container = document.querySelector(".products-carousel");
        container.innerHTML = "";

        products.forEach(prod => {
            const imgSrc = (prod.images && prod.images.length > 0) 
                ? prod.images[0] 
                : "https://placehold.co/250x250?text=No+Image";

            const div = document.createElement("div");
            div.className = "productcontainer";
            div.innerHTML = `
                <img src="${imgSrc}" alt="${prod.title}">
                <h3>${prod.title}</h3>
                <p>$${prod.price}</p>
                <button class="add-to-cart">Add to Cart</button>
                <br>
                <span class="view-details">View Details</span>
            `;
            div.querySelector(".add-to-cart").addEventListener("click", () => addToCart({
                id: prod.id,
                title: prod.title,
                price: prod.price,
                image: imgSrc
            }));
            div.querySelector(".view-details").addEventListener("click", () => {
                window.location.href = `pages/product.html?id=${prod.id}`;
            });
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

// CATEGORIES
async function loadCategories() {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const categories = await res.json();
        const container = document.querySelector(".categoriescarousel");
        container.innerHTML = "";

        // Only show the four desired categories
        const allowed = ["Shoes", "Electronics", "Clothes", "Furniture"];
        const filtered = categories.filter(cat => allowed.includes(cat.name));

        filtered.forEach(cat => {
            const div = document.createElement("div");
            div.className = "categorycontainer";
            div.textContent = cat.name;
            div.addEventListener("click", () => {
                loadFeaturedProducts(cat.id);
            });
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading categories:", err);
    }
}