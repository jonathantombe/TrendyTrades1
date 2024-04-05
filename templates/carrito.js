document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');

    // Función para mostrar los productos en el carrito
    function mostrarProductosCarrito(carrito) {
        cartContainer.innerHTML = ''; // Limpiar el contenedor
        carrito.forEach(producto => {
            const productoElement = crearElementoProducto(producto);
            cartContainer.appendChild(productoElement);
        });
    }

    // Mostrar los productos del carrito al cargar la página
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarProductosCarrito(carrito);

    // Función para crear un elemento de producto
    function crearElementoProducto(producto) {
        const productoElement = document.createElement('li');

        // Imagen
        const imagen = document.createElement('img');
        imagen.src = producto.image;
        imagen.alt = producto.title;
        productoElement.appendChild(imagen);

        // Título
        const titulo = document.createElement('h3');
        titulo.textContent = producto.title;
        productoElement.appendChild(titulo);

        // Descripción
        const descripcion = document.createElement('p');
        descripcion.textContent = producto.description;
        productoElement.appendChild(descripcion);

        // Precio
        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.price}`;
        productoElement.appendChild(precio);

        // Cantidad de productos
        const cantidadLabel = document.createElement('label');
        cantidadLabel.textContent = 'Cantidad:';
        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.min = 1;
        cantidadInput.value = producto.cantidad || 1;
        cantidadInput.addEventListener('change', function() {
            actualizarCantidad(producto, parseInt(cantidadInput.value));
        });
        productoElement.appendChild(cantidadLabel);
        productoElement.appendChild(cantidadInput);

        // Botón para eliminar producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            eliminarProducto(producto);
        });
        productoElement.appendChild(botonEliminar);

        return productoElement;
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosCarrito(carrito);
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.title !== producto.title);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosCarrito(carrito);
    }

    // Función para actualizar la cantidad de un producto
    function actualizarCantidad(producto, cantidad) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.forEach(item => {
            if (item.title === producto.title) {
                item.cantidad = cantidad;
            }
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductosCarrito(carrito);
    }
});



