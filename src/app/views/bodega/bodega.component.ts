import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Bodega} from '../../interface/bo/Bodega';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BodegaDTO} from '../../interface/dto/BodegaDTO';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements OnInit {
  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  bodegas: Bodega[];
  detail: Bodega;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;


  constructor(private dataService: DataService,
              public formBuilder: FormBuilder ) { 
      this.dataService.getAllItemsFromEntity('bodega', '')
      .subscribe(res => {
        this.bodegas = (<Bodega[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: [''],
      estado: [0]
    });
  }

  openToAdd() {
    this.modalMode = 1;
    this.title='Agregar';
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: [''],
      estado: [0]
    });
    
    this.entityModal.show();
  }
  
  openToVisualy(id: number){
    this.modalMode = 0;
    this.title='Consultar';

    this.dataService.getEntityDetail('bodega', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Bodega>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          observaciones: [this.detail.observaciones],
          estado: [0]

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
    this.dataService.getEntityDetail('bodega', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Bodega>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          observaciones: [this.detail.observaciones],
          estado: [this.detail.estado]
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
    this.dataService.deleteEntity('bodega', '', this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  saveChanges() {
    console.log('Guardando cambios');
    const dto: BodegaDTO = {
      descripcion: this.modalForm.value.descripcion,
      observaciones: this.modalForm.value.observaciones,
      estado: this.modalForm.value.estado
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('bodega', '', dto)
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
      this.dataService.editEntity('bodega', '', this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'bodega', '')
      .subscribe(resp => {
        this.bodegas = (<Bodega[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }


  ngOnInit() {
  }

}
