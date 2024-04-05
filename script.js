document.addEventListener('DOMContentLoaded', function () {
    const categoriesNav = document.getElementById('categories-nav');
    const productsSection = document.getElementById('products-section');
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');
    const closeButton = document.querySelector('.close-button');


    function openModal(product) {
        modalTitle.textContent = product.title;
        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalDescription.textContent = product.description;
        modalCategory.textContent = `Categoría: ${product.category}`;
        modalPrice.textContent = `Precio: $${product.price}`;
        modal.style.display = 'block';
        
        // Agregar un evento de clic al botón para agregar el producto al carrito
        const addToCartButton = document.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', function() {
            addToCart(product);
            alert(`${product.title} ha sido agregado al carrito de compras.`);
        });
    }
    
    function addToCart(product) {
        // Obtener el carrito actual del almacenamiento local
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // Agregar el nuevo producto al carrito
        carrito.push(product);
        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    

    function closeModal() {
        modal.style.display = 'none';
    }


    closeButton.addEventListener('click', closeModal);


    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const link = document.createElement('a');
                link.textContent = category;
                link.href = '#';
                link.addEventListener('click', () => {
                    showProductsByCategory(category);
                });
                categoriesNav.appendChild(link);
            });
            showProductsByCategory('all');
        })
        .catch(error => console.error('Error fetching categories:', error));

    function showProductsByCategory(category) {
        productsSection.innerHTML = '';
        let apiUrl = 'https://fakestoreapi.com/products';
        if (category !== 'all') {
            apiUrl += `/category/${category}`;
        }
        fetch(apiUrl)
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');
                    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
          `;
                    productElement.addEventListener('click', () => {
                        openModal(product);
                    });
                    productsSection.appendChild(productElement);
                });
            })
            .catch(error => console.error(`Error fetching products for category "${category}":`, error));
    }
});