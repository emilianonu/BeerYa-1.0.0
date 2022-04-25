
  
  //Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');

//arrays
let articulosCarrito = []; 

cargarEventListeners();
function cargarEventListeners(){
    //evento que agrega un producto cuando presionan "agregar carrito"
    listaProductos.addEventListener('click', agregarProducto);

    // elimina un producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    //Muestra los productos en local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Al Vaciar el carrito
    vaciarCarritobtn.addEventListener('click', vaciarCarrito);
}

//Funciones
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}

// Crear el contenido del html y extrae la info del producto
function leerDatosProducto(producto){

    //creo un objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
        const productos = articulosCarrito.map( producto => {
             if( producto.id === infoProducto.id ) {
                  producto.cantidad++;
                   return producto; //retorna los objetos actualizados
              } else {
                   return producto; //retorna los obajetos no actualizados
           }
        })
        articulosCarrito = [...productos];
   }  else {
        articulosCarrito = [...articulosCarrito, infoProducto];
   }


    console.log(articulosCarrito);

    carritoHTML();
}

// Elimina el producto del carrito en el DOM
function eliminarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-producto') ) {
         // e.target.parentElement.parentElement.remove();
         const productoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

         carritoHTML();
    }
}

//Muestra al carrito de compras en el html
function carritoHTML(){

    vaciarCarrito();
    


    //recorro el carrito y lo agrego al html
    articulosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;

        //Agrego el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los productos del carrito en el DOM
function vaciarCarrito() {
    // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

const button = document.getElementById(`agregar-carrito${producto.id}`);
    button.addEventListener('click', () => {
        carrito(producto.id);
        Swal({
            title:'genial',
            Text:'jajaj',
            icon:'success',
            confirm: 'ok',
            timer: 3000
        })
    });

