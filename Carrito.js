export default class Carrito {
    constructor() {
        this.productos = new Map();
        this.currency = "€";
    }

    agregarProductos(prodcutoId, descripcion, precio, unidades) {
        if (this.productos.has(prodcutoId)) {
            const producto = this.productos.get(prodcutoId);
            producto.cantidad = unidades; // Actualiza la cantidad con la nueva cantidad ingresada
            if(producto.cantidad<=0){
                this.productos.delete(prodcutoId);
            }
        } else {
            if (unidades > 0) { // Solo añade si la cantidad es mayor que 0
                this.productos.set(prodcutoId, {
                    descripcion: descripcion,
                    precio: parseFloat(precio),
                    cantidad: unidades
                });
            }
        }
    }

    calcularPrecioTotalCarrito() {
        let total = 0;
        this.productos.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        return total.toFixed(2);
    }

    mostrarTotal() {
        return `${this.calcularPrecioTotalCarrito()}${this.currency}`;
    }

    mostrarCarrito() {
        let resumen = ""; // Variable para almacenar el resumen de los productos
        this.productos.forEach((producto, productoId) => {
            // Para cada producto, accede a sus propiedades y genera el string correspondiente
            resumen += `${producto.cantidad} x ${producto.descripcion} = ${(producto.precio * producto.cantidad).toFixed(2)} ${this.currency}\n`;
        });
        return resumen; // Devuelve el resumen y el total
    }
}