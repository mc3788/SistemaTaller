import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Cliente} from '../../interface/bo/Cliente';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ClienteDTO} from '../../interface/dto/ClienteDTO';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  clientes: Cliente[];
  detail: Cliente;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder) {
    this.dataService.getAllItemsFromEntity('cliente', '')
    .subscribe(res => {
      this.clientes = (<Cliente[]>res);
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

  }

  openToAdd() {
    this.modalMode = 1;
    this.title='Agregar';
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
    this.modalMode = 0;
    this.title='Consultar';

    this.dataService.getEntityDetail('cliente', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Cliente>resp);
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
    
    this.dataService.getEntityDetail('cliente', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Cliente>resp);
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

  dismiss() {
      this.entityModal.hide();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('cliente', '', this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  saveChanges() {
    console.log('Guardando cambios');
    const dto: ClienteDTO = {
      nit: this.modalForm.value.nit,
      nombre: this.modalForm.value.nombre,
      telefono: this.modalForm.value.telefono,
      direccion: this.modalForm.value.direccion,
      observaciones: this.modalForm.value.observaciones
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('cliente', '', dto)
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
      this.dataService.editEntity('cliente', '', this.detail.id, dto)
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
  
  ngOnInit() {
  }

  reload() {
    this.dataService.getAllItemsFromEntity( 'cliente', '')
      .subscribe(resp => {
        this.clientes = (<Cliente[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

}
