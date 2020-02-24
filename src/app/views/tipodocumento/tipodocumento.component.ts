import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {TipoDocumento} from '../../interface/bo/TipoDocumento';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TipoDocumentoDTO} from '../../interface/dto/TipoDocumentoDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css']
})
export class TipodocumentoComponent implements OnInit {

  title='';
  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  tiposDocumentos: TipoDocumento[];
  detail: TipoDocumento;

  public accesos: Acceso;

  selId: number;
  selName: string;


  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService ) {
    this.dataService.getAllItemsFromEntity('tipoDocumento', this.authService.token)
    .subscribe(res => {
      this.tiposDocumentos = (<TipoDocumento[]>res);
    }, error => {
      console.error(JSON.stringify(error));
    });

     // Inicializa el form construyendolo con los campos
     this.modalForm = this.formBuilder.group({
      descripcion: [''],
      operacion: ['']
    });
    this.accesos = this.authService.accesos.find( a => a.opcion === 'Tipos Documento');

  }

  openToAdd() {
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      operacion: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number){
    this.modalMode = 0;
    this.title='Consultar';
    this.dataService.getEntityDetail('tipoDocumento', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<TipoDocumento>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          operacion: [this.detail.operacion]
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
    
    this.dataService.getEntityDetail('tipoDocumento', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<TipoDocumento>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          operacion: [this.detail.operacion]
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
    this.dataService.deleteEntity('tipoDocumento', this.authService.token, this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }
  saveChanges() {
    console.log('Guardando cambios');
    const dto: TipoDocumentoDTO = {
      descripcion: this.modalForm.value.descripcion,
      operacion: this.modalForm.value.operacion
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('tipoDocumento', this.authService.token, dto)
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
      this.dataService.editEntity('tipoDocumento', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'tipoDocumento', this.authService.token)
      .subscribe(resp => {
        this.tiposDocumentos = (<TipoDocumento[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }
  
}