document.addEventListener('DOMContentLoaded', function () {
    const categoriesNav = document.getElementById('categories-nav');
    const productsSection = document.getElementById('products-section');


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
                            <h3>${product.title}</h3>`
                    ;
                productsSection.appendChild(productElement);
            });
        })
        .catch(error => console.error(`Error fetching products for category "${category}":`, error));
}

    
});