import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Proveedor} from '../../interface/bo/Proveedor';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProveedorDTO} from '../../interface/dto/ProveedorDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  proveedores: Proveedor[];
  detail: Proveedor;

  public accesos: Acceso;

  selId: number;
  selName: string;


  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {

    this.dataService.getAllItemsFromEntity('proveedor', this.authService.token)
    .subscribe(res => {
    this.proveedores = (<Proveedor[]>res);
    }, error => {
        console.error(JSON.stringify(error));
    });
     // Inicializa el form construyendolo con los campos
     this.modalForm = this.formBuilder.group({
      nit: [''],
      nombre: [''],
      telefono: [''],
      direccion: [''],
      observaciones: ['']
    });
    console.log( this.authService.accesos )

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Proveedores');

  }

  openToAdd() {
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      nit: [''],
      nombre: [''],
      telefono: [''],
      direccion: [''],
      observaciones: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number){
    this.title='Consultar';
    this.modalMode = 0;

    this.dataService.getEntityDetail('proveedor', this.authService.token, id)
    .subscribe(resp => {
      // se convierten los datos recuperadps al objeto
      this.detail = (<Proveedor>resp);
      console.log(this.detail);
      // se ingresan los valores en el form y validaciones
      this.modalForm = this.formBuilder.group({
        nit: [this.detail.nit],
        nombre: [this.detail.nombre],
        telefono: [this.detail.telefono],
        direccion: [this.detail.direccion],
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
    this.dataService.getEntityDetail('proveedor', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Proveedor>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          nit: [this.detail.nit],
          nombre: [this.detail.nombre],
          telefono: [this.detail.telefono],
          direccion: [this.detail.direccion],
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
    this.dataService.deleteEntity('proveedor', this.authService.token, this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  dismiss() {
      this.entityModal.hide();
  }

  saveChanges() {
    console.log('Guardando cambios');
    const dto: ProveedorDTO = {
      nit: this.modalForm.value.nit,
      nombre: this.modalForm.value.nombre,
      telefono: this.modalForm.value.telefono,
      direccion: this.modalForm.value.direccion,
      observaciones: this.modalForm.value.observaciones
    };
    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('proveedor',this.authService.token, dto)
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
      this.dataService.editEntity('proveedor', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'proveedor', this.authService.token)
      .subscribe(resp => {
        this.proveedores = (<Proveedor[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

  ngOnInit() {
  }

}
