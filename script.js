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
                            <p>${product.price}$</p>`
                    ;
                productsSection.appendChild(productElement);
            });
        })
        .catch(error => console.error(`Error fetching products for category "${category}":`, error));
}

    
});