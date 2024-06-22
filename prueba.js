const MContenido = document.getElementById("MContenido");
const verCarrito = document.getElementById("verCarrito");
const modalContenido = document.getElementById("modalContenido");

// Lista de productos
const bolsos = [
    {
        id: 1,
        nombre: "Opalo Negro",
        precio: 45000,
        img: "/imagenes/negro.jpg",
    },
    {
        id: 2,
        nombre: "Opalo Crudo",
        precio: 45000,
        img: "/imagenes/crudo.jpg",
    },
    {
        id: 3,
        nombre: "Opalo Gris",
        precio: 45000,
        img: "/imagenes/gris.jpg",
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    modalContenido.innerHTML = "";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-titulo">Carrito</h1>`;

    const modalCloseButton = document.createElement("h1");
    modalCloseButton.innerText = "x";
    modalCloseButton.className = "modal-header-button";

    modalCloseButton.addEventListener("click", () => {
        modalContenido.style.display = "none";
    });

    modalHeader.append(modalCloseButton);

    modalContenido.append(modalHeader);

    carrito.forEach((product, index) => {
        const carritoContenido = document.createElement("div");
        carritoContenido.className = "modal-contenido";
        carritoContenido.innerHTML = `
            <img src="${product.img}" alt="${product.nombre}">
            <div>
                <p>${product.nombre}</p>
                <h3>$${product.precio}</h3>
                <div class="cantidad-container">
                    <button class="cantidad-menos">-</button>
                    <input type="number" min="1" value="${product.cantidad}" class="cantidad-producto" readonly>
                    <button class="cantidad-mas">+</button>
                </div>
            </div>
        `;

        const eliminarBtn = document.createElement("button");
        eliminarBtn.innerText = "x";
        eliminarBtn.className = "eliminar-boton";
        eliminarBtn.addEventListener("click", () => {
            carrito.splice(index, 1); 
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });

        carritoContenido.append(eliminarBtn);
        modalContenido.append(carritoContenido);

        // Actualizar cantidad del producto
        const cantidadInput = carritoContenido.querySelector(".cantidad-producto");
        const cantidadMas = carritoContenido.querySelector(".cantidad-mas");
        const cantidadMenos = carritoContenido.querySelector(".cantidad-menos");

        cantidadMas.addEventListener("click", () => {
            product.cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });

        cantidadMenos.addEventListener("click", () => {
            if (product.cantidad > 1) {
                product.cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            }
        });
    });

    const total = carrito.reduce((acc, product) => acc + product.precio * product.cantidad, 0);

    const totalcompra = document.createElement("div");
    totalcompra.className = "total-compra";
    totalcompra.innerHTML = `Total a pagar: $${total}`;
    modalContenido.append(totalcompra);

    const comprarBtn = document.createElement("button");
    comprarBtn.innerText = "Realizar compra";
    comprarBtn.className = "finalizarcompra";

    comprarBtn.addEventListener("click", finalizarCompra); 

    modalContenido.append(comprarBtn);
}

function finalizarCompra() {
    Swal.fire({
        title: 'Compra exitosa',
        text: 'Gracias por tu compra. Recibirás tu pedido pronto.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000, 
    }).then(() => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito(); 
    });
}

bolsos.forEach((product) => {
    const contenidoM = document.createElement("div");
    contenidoM.className = "product";
    contenidoM.innerHTML = `
        <img src="${product.img}" alt="${product.nombre}">
        <div>
            <p>${product.nombre}</p>
            <h3>$${product.precio}</h3>
        </div>
    `;

    const comprarBtn = document.createElement("a");
    comprarBtn.className = "comprar";
    comprarBtn.innerText = "Comprar";

    comprarBtn.addEventListener("click", () => {
        const productoExistente = carrito.find(item => item.id === product.id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: 1
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    });

    contenidoM.append(comprarBtn);
    MContenido.append(contenidoM);
});

verCarrito.addEventListener("click", () => {
    modalContenido.style.display = "block";
    actualizarCarrito();
});
