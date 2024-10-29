import Carrito from "./Carrito.js";
const carrito=new Carrito();
var productos= [];

document.addEventListener('DOMContentLoaded', function (event) {

    function cargarProductos(productos){
        const tablaProductos = document.getElementById("productosTable");

        //Con iteración creamos una fila para cada producto
        productos.forEach(producto => {

            //se crea la primera celda para el id del producto con su respectivo contenido
            const productoId=document.createElement('td');
            productoId.innerText=producto.prodcutoId;

            //celda para descripcion
            const desc=document.createElement('td');
            desc.innerText=producto.descripcion;

            //celda para cantidad
            const cant=document.createElement('td');

                //creamos un div para que sea el contenedor de los botones de mas y menos, y el input de cantidad
            const miDiv= document.createElement('div');
            miDiv.id="cajaCant";

                //button de -
            const buttonMinus=document.createElement('button');
            buttonMinus.textContent="-";

                //input de cantidad
            const cantidadInput=document.createElement('input');
            cantidadInput.type='number';
            cantidadInput.value=0;
            cantidadInput.min=0;
                //buttonPlus
            const buttonPlus=document.createElement('button');
            buttonPlus.textContent="+";
            
            // Dentro del div estan los dos botones y el input, y el div está dentro de la celda cantidad.
            miDiv.append(buttonMinus,cantidadInput,buttonPlus);
            cant.appendChild(miDiv);

              //La celda de precio
              const precioU=document.createElement('td');
              precioU.innerText=`${producto.precio}€`;

            
                //La celda del precio total, que se calculará con una funcion
                const precioTotal=document.createElement('td');
                precioTotal.innerText='0.00 €';


            //funcion para calcular el precioTotal
            function calcularPrecioTotal(){
                const cantidad= cantidadInput.value;
               const total=( producto.precio*cantidad).toFixed(2);
               precioTotal.innerText= `${total}€`;
            }

            const tr =document.createElement('tr');
            tr.append(productoId,desc,cant,precioU,precioTotal);
            tablaProductos.appendChild(tr);

            cantidadInput.addEventListener('change', function() {
                const cantidad = parseInt(cantidadInput.value, 10);
                if (cantidad >= 0) {
                    // Actualiza el carrito con el ID del producto y la cantidad ingresada
                    carrito.agregarProductos(producto.prodcutoId, producto.descripcion, producto.precio, cantidad);
            
                    // Limpia y actualiza el contenido del carrito en el HTML
                    const carritoLleno = document.getElementById('carritoLleno');
                    carritoLleno.innerHTML = ''; // Limpia el contenido anterior
            
                    // Crea un nuevo párrafo con el resumen del carrito
                    const productoX = document.createElement('p');
                    productoX.innerText = carrito.mostrarCarrito(); // Muestra el resumen del carrito
                    
                    //calcular el total
                    calcularPrecioTotal();
                    carritoLleno.appendChild(productoX); // Agrega el resumen al contenedor 'carritoLleno'
                }
            });
            
            // Botón "minus"
            buttonMinus.addEventListener('click', function(event) {
                let cantidad = parseInt(cantidadInput.value, 10);
                if (cantidad > 0) {
                    cantidadInput.value = --cantidad;
                    carrito.agregarProductos(producto.prodcutoId, producto.descripcion, producto.precio, cantidad);
                    actualizarCarrito();
                    calcularPrecioTotal();
                }
            });
            
            // Botón "plus"
            buttonPlus.addEventListener('click', function(event) {
                let cantidad = parseInt(cantidadInput.value, 10);
                cantidadInput.value = ++cantidad;
                carrito.agregarProductos(producto.prodcutoId, producto.descripcion, producto.precio, cantidad);
                actualizarCarrito(); // Llama a la función para actualizar el carrito
                calcularPrecioTotal();
            });
            
            
            // Función para actualizar el carrito en el DOM
            function actualizarCarrito() {
                const carritoLleno = document.getElementById('carritoLleno');
                carritoLleno.innerHTML = ''; // Limpia el contenido anterior
            
                // Crea un nuevo párrafo con el resumen del carrito
                const productoX = document.createElement('p');
                productoX.innerText = carrito.mostrarCarrito(); // Muestra el resumen del carrito
                carritoLleno.appendChild(productoX); // Agrega el resumen al contenedor 'carritoLleno'
                
                const totalCarrito=document.createElement('p');
                totalCarrito.innerText=`Total: ${carrito.mostrarTotal()}`;
                totalCarrito.id="total";
                document.getElementById('carritoLleno').appendChild(totalCarrito);
                
            }

          

        }) 

     

        

    }


    fetch('https://jsonblob.com/api/1297365531240554496')
    .then(response => response.json())
      .then(prod=> {
          productos = prod.products ;
          cargarProductos(productos);
  });

})

