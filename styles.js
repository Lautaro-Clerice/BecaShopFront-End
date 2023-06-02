
// Obtener todos los checkboxes
var checkboxes = document.querySelectorAll('input[type=checkbox]');

// Agregar un controlador de eventos para cada checkbox
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    // Obtener todas las secciones seleccionadas
    var seccionesSeleccionadas = [];
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked && checkbox.value !== 'todos') {
        seccionesSeleccionadas.push(checkbox.value);
      }
    });

    // Obtener todos los productos
    var productos = document.querySelectorAll('.product');

    // Mostrar u ocultar los productos según las secciones seleccionadas
    productos.forEach(function(producto) {
      var productoSeccion = producto.getAttribute('data-seccion');
      if (seccionesSeleccionadas.length === 0 || seccionesSeleccionadas.includes(productoSeccion)) {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    });
  });
});

// Obtener el checkbox "Todos"
var checkboxTodos = document.getElementById('todos');

// Agregar un controlador de eventos al checkbox "Todos"
checkboxTodos.addEventListener('change', function() {
  // Obtener todos los productos
  var productos = document.querySelectorAll('.product');

  // Mostrar u ocultar todos los productos según el estado del checkbox "Todos"
  if (checkboxTodos.checked) {
    productos.forEach(function(producto) {
      producto.style.display = 'block';
    });
  } else {
    productos.forEach(function(producto) {
      producto.style.display = 'none';
    });
  }
});







// Mostrar todos los productos al cargar la página
var productos = document.querySelectorAll('.product');
productos.forEach(function (producto) {
  producto.style.display = 'block';
});

// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos a que todos los elementos de la página carguen para ejecutar el script
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // Agregremos funcionalidad a los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener('click', eliminarItemCarrito);
  }

  // Agrego funcionalidad al boton sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener('click', sumarCantidad);
  }

  // Agrego funcionalidad al botón restar cantidad
  var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener('click', restarCantidad);
  }

  // Agregamos funcionalidad al boton Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', agregarAlCarritoClicked);
  }

  // Agregamos funcionalidad al botón comprar
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
  var numeroPedido = generarNumeroAleatorio();
  mostrarVentanaEmergente(numeroPedido);

  // Elimino todos los elementos del carrito
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();

  // Obtener contenido del carrito
  var carritoContenido = obtenerContenidoCarrito();
}

// Función para obtener el contenido del carrito
function obtenerContenidoCarrito() {
  var carritoItems = document.getElementsByClassName('carrito-item');
  var contenidoCarrito = '';

  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];
    var titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
    var precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
    var cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;

    contenidoCarrito += 'Título: ' + titulo + '\n';
    contenidoCarrito += 'Precio: ' + precio + '\n';
    contenidoCarrito += 'Cantidad: ' + cantidad + '\n';
    contenidoCarrito += '------------------------\n';
  }

  return contenidoCarrito;
}


// Función que genera un número aleatorio entre 1000 y 9999
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 9000) + 1000;
}

// Función para mostrar la ventana emergente
function mostrarVentanaEmergente(numeroPedido) {
  var ventanaEmergente = document.createElement("div");
  ventanaEmergente.id = "ventana-emergente";
  ventanaEmergente.classList.add("mi-ventana-emergente");
  // Resto del código...
  
  document.body.appendChild(ventanaEmergente);
  
  // Mostrar el número de pedido en el contenido de la ventana emergente
  var contenidoVentanaEmergente = document.createElement("div");
  contenidoVentanaEmergente.id = "contenido-ventana-emergente";
  contenidoVentanaEmergente.textContent = "Gracias por realizar su pedido! Nos estaremos contactando con usted, para ultimar detalles de su compra. Su pedido es el número #" + numeroPedido;
  ventanaEmergente.appendChild(contenidoVentanaEmergente);

  // Agregar botón para cerrar la ventana emergente
  var cerrarVentana = document.createElement("span");
  cerrarVentana.textContent = "X";
  cerrarVentana.addEventListener("click", ocultarVentanaEmergente);
  ventanaEmergente.appendChild(cerrarVentana);
}

// Función para ocultar la ventana emergente
function ocultarVentanaEmergente() {
  var ventanaEmergente = document.getElementById("ventana-emergente");
  ventanaEmergente.parentNode.removeChild(ventanaEmergente);
}

// ... Resto del código ...


//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}

//CARDSSS//
