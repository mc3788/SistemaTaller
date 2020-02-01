import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {CreditoCaja} from '../../interface/bo/CreditoCaja';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreditoCajaDTO} from '../../interface/dto/CreditoCajaDTO';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creditoscaja',
  templateUrl: './creditoscaja.component.html',
  styleUrls: ['./creditoscaja.component.css']
})
export class CreditoscajaComponent implements OnInit {

  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  creditosCaja: CreditoCaja[];
  detail: CreditoCaja;

  selId: number;
  selName: string;
  selDocumento: number;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder ) { 
    this.dataService.getAllItemsFromEntity('creditoCaja', '')
      .subscribe(res => {
        this.creditosCaja = (<CreditoCaja[]>res);
      }, error => {
        console.error(JSON.stringify(error));
      });

      // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      fecha: [new Date()],
      idCierre: [''],
      noDocumento: [''],
      monto: [''],
      descripcion: [''],
      tipo: ['']
    });
              
  }

  openToAdd() {
    this.modalMode = 1;
    this.title='Agregar';
    this.modalForm = this.formBuilder.group({
      fecha: [this.currentDate()],
      idCierre: [''],
      noDocumento: [''],
      monto: [''],
      descripcion: [''],
      tipo: ['']
    });
    console.log(this.modalForm);
    this.entityModal.show();
  }

  currentDate(){
    // const currentDate = new Date();
    // return currentDate.toISOString().slice(0,-1);
    let dp = new DatePipe('es-GT');
    let p = "yyyy-MM-dd";
    let dtr = dp.transform( new Date(), p );
    return dtr;
  }

  openToVisualy(id: number){
    this.modalMode = 0;
    this.title='Consultar';

    this.dataService.getEntityDetail('creditoCaja', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<CreditoCaja>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          fecha: [this.detail.fecha],
          idCierre: [this.detail.idCierre],
          noDocumento: [this.detail.noDocumento],
          monto: [this.detail.monto],
          descripcion: [this.detail.descripcion],
          tipo: [this.detail.tipo]
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
    
    this.dataService.getEntityDetail('creditoCaja', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<CreditoCaja>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          fecha: [this.detail.fecha],
          idCierre: [this.detail.idCierre],
          noDocumento: [this.detail.noDocumento],
          monto: [this.detail.monto],
          descripcion: [this.detail.descripcion],
          tipo: [this.detail.tipo]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }
  openToDelete(id: number, name: string, documento: number){
    this.selId = id;
    this.selName = name;
    this.selDocumento = documento;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('creditoCaja', '', this.selId)
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

  ngOnInit() {
  }

  saveChanges() {
    console.log('Guardando cambios');
    const dto: CreditoCajaDTO = {
      usuario: this.modalForm.value.usuario,
      nombre: this.modalForm.value.nombre,
      idPerfil: this.modalForm.value.perfil,
      estado: this.modalForm.value.estado,
      password: this.modalForm.value.password
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('creditoCaja', '', dto)
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
      this.dataService.editEntity('creditoCaja', '', this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'creditoCaja', '')
      .subscribe(resp => {
        this.creditosCaja = (<CreditoCaja[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

}
