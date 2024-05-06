const MContenido = document.getElementById("MContenido");
const verCarrito = document.getElementById("verCarrito");
const modalContenido= document.getElementById("modalContenido")

const mates= [
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
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function actualizarCarrito() {
    modalContenido.innerHTML = "";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-titulo">Carrito</h1>`;

    modalContenido.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
    modalContenido.style.display = "none";
    }); 

    modalHeader.append(modalbutton);

    carrito.forEach((product) => {

        let carritoContenido = document.createElement("div");
        carritoContenido.className = "modal-contenido";
        carritoContenido.innerHTML = `
            <img src="${product.img}">
            <p>${product.nombre}</p>
            <h3>$${product.precio}</h3>
        `;

    modalContenido.append(carritoContenido);
    });

    const total = carrito.reduce((acc, price) => acc + price.precio, 0);

        const totalcompra = document.createElement("div");
        totalcompra.className = "total-compra";
        totalcompra.innerHTML = `Total a pagar: $${total}`;
        modalContenido.append(totalcompra);
    }   ;



mates.forEach((product) => {
    let contenidoM = document.createElement("div");
    contenidoM.className = "product";
    contenidoM.innerHTML = `
        <img src="${product.img}">
        <p>${product.nombre}</p>
        <h3>$${product.precio}</h3>
    `;

    MContenido.append(contenidoM);

    let comprar = document.createElement("a");
    comprar.className = "boton";
    comprar.innerText = "Comprar";
    contenidoM.append(comprar);

    comprar.addEventListener("click", () => {
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
    });
    console.log(carrito);  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    });
});



verCarrito.addEventListener("click", () => {
    modalContenido.style.display = "block";
    actualizarCarrito();
});