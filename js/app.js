
  
  //Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritobtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
const contadorCarrito = document.querySelector('#contadorCarrito');
const terminarCompra = document.querySelector('#terminar-compra');

//Uso la api de leaflets.com para mostrar el mapa
const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let map = L.map('mapa').setView([-34.806369, -58.280196], 13)

L.tileLayer(tilesProvider, {
    maxZoom: 18,
}).addTo(map)

let marker = L.marker([-34.806369, -58.280196]).addTo(map)

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
    terminarCompra.addEventListener('click', checkout);
    
}

//Funciones
function agregarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregaste el producto al carrito',
            showConfirmButton: false,
            timer: 1500
          })
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

    vaciarCarrito2();
    let contador = 0
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
        contador++
        //Agrego el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    console.log( contador)
    contadorCarrito.innerText = contador;

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
         Swal.fire({
            title: 'Estas Seguro?',
            text: "Se borraran todos los productos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Estoy seguro!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Bien!',
                'Compraste todos los productos.',
                'success'
              )
              articulosCarrito = []
              sincronizarStorage();
              contadorCarrito.innerText = 0;
            }
          })
     }
     
}

function vaciarCarrito2() {
    // contenedorCarrito.innerHTML = '';
    

    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
         }
        }
const button = document.getElementById(`agregar-carrito${producto.id}`);

function checkout() {
    // contenedorCarrito.innerHTML = '';
    

    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
         Swal.fire({
            title: 'Finalizar Compra?',
            text: "Comprar todos los productos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Estoy seguro!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Gracias por su Compra',
                ':) :).',
                'success'
              )
              articulosCarrito = []
              sincronizarStorage();
              contadorCarrito.innerText = 0;
            }
          })
     }
     
}

