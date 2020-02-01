import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective} from 'ngx-bootstrap/modal';
import { Producto} from '../../interface/bo/Producto';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ProductoDTO} from '../../interface/dto/ProductoDTO';
import { Marca} from '../../interface/bo/Marca';
import { Proveedor} from '../../interface/bo/Proveedor';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  productos: Producto[];
  detail: Producto;
  marcas: Marca[];
  proveedores: Proveedor[];

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder) { 
    this.dataService.getAllItemsFromEntity('producto', '')
    .subscribe(res => {
      this.productos = (<Producto[]>res);
    }, error => {
      console.error(JSON.stringify(error));
    });
          
    this.dataService.getAllItemsFromEntity( 'marca', '' )
    .subscribe( resp => {
      this.marcas = (<Marca[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });

    this.dataService.getAllItemsFromEntity( 'proveedor', '' )
    .subscribe( resp => {
      this.proveedores = (<Proveedor[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      proveedor: [''],
      nombre: [''],
      precioCosto: [''],
      precioVenta: [''],
      marca: [''],
      observaciones: ['']
    });

  }

  openToAdd() {
    this.modalMode = 1;
    this.title='Agregar';
    this.modalForm = this.formBuilder.group({
      proveedor: [''],
      nombre: [''],
      precioCosto: [''],
      precioVenta: [''],
      marca: [''],
      observaciones: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number ){
    this.modalMode = 0;
    this.title='Consultar';

    this.dataService.getEntityDetail('producto', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Producto>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          proveedor: [this.detail.idProveedor],
          nombre: [this.detail.nombre],
          precioCosto: [this.detail.precioCosto],
          precioVenta: [this.detail.precioVenta],
          marca: [this.detail.idMarca],
          observaciones: [this.detail.observaciones]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
    this.entityModal.show();
  }


  openToModify(id: number){
    this.modalMode = 2;
    this.title='Modificar';
    this.dataService.getEntityDetail('producto', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Producto>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          proveedor: [this.detail.idProveedor],
          nombre: [this.detail.nombre],
          precioCosto: [this.detail.precioCosto],
          precioVenta: [this.detail.precioVenta],
          marca: [this.detail.idMarca],
          observaciones: [this.detail.observaciones]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }
  openToDelete(id: number, name: string){
    this.selId = id;
    this.selName = name;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('producto', '', this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  saveChanges() {
    console.log('Guardando cambios');
    const dto: ProductoDTO = {
      proveedor: this.modalForm.value.proveedor,
      nombre: this.modalForm.value.nombre,
      precioCosto: this.modalForm.value.precioCosto,
      precioVenta: this.modalForm.value.precioVenta,
      marca: this.modalForm.value.marca,
      observaciones: this.modalForm.value.observaciones
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('producto', '', dto)
        .subscribe(resp => {
          this.reload();
          this.entityModal.hide();
        }, error2 => {
          this.existsError = true;
          this.existsErrorTitle = 'Error al grabar registro.';
          const timer = setTimeout(() => this.existsError = false, 6000);
          console.error(JSON.stringify(error2));
        });

    } else if (this.modalMode === 2) {
      // se insertan los datos modificados con el servicio de edicion
      this.dataService.editEntity('producto', '', this.detail.id, dto)
        .subscribe(resp => {
          this.reload();
          this.entityModal.hide();
        }, error2 => {
          console.error(JSON.stringify(error2));
        });
    }

    // Recarga valores y los muestra en pantalla, queda pendiente pagineo
    this.reload();
    this.entityModal.show();

  }

  reload() {
    this.dataService.getAllItemsFromEntity( 'producto', '')
      .subscribe(resp => {
        this.productos = (<Producto[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

  dismiss() {
      this.entityModal.hide();
  }

  ngOnInit() {
  }

}
