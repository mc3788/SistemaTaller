import {Proveedor} from './Proveedor';
import {Marca} from './Marca';

export class Producto {

    id: number;
    idProveedor: Proveedor;
    nombre: string;
    precioCosto: number;
    precioVenta: number;
    idMarca: Marca;
    observaciones: string;
  
    constructor(id: number,
                idProveedor: Proveedor,
                nombre: string,
                precioCosto: number,
                precioVenta: number,
                idMarca: Marca,
                observaciones: string
                 
    ) {
      this.id = id;
      this.idProveedor = idProveedor;
      this.nombre = nombre;
      this.precioCosto = precioCosto;
      this.precioVenta = precioVenta;
      this.idMarca = idMarca;
      this.observaciones = observaciones;
    }
  
  }
  