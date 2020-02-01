import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Perfil} from '../../interface/bo/Perfil';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PerfilDTO} from '../../interface/dto/PerfilDTO';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {
  title='';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;
  existsError = false;
  existsErrorTitle = '';
 
// objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  perfiles: Perfil[];
  detail: Perfil;

  selId: number;
  selName: string;


  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
    public formBuilder: FormBuilder ) { 
    this.dataService.getAllItemsFromEntity( 'perfil', '' )
        .subscribe( resp => {
          this.perfiles = (<Perfil[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: ['']
    });

  }

  openToAdd() {
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number){
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('perfil', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Perfil>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
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
    this.title = 'Modificar';

    this.dataService.getEntityDetail('perfil', '', id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Perfil>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          descripcion: [this.detail.descripcion],
          observaciones: [this.detail.observaciones]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }
  openToDelete(id: number,name: string){
    this.selId = id;
    this.selName = name;
    this.title='Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('perfil', '', this.selId)
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
    const dto: PerfilDTO = {
      descripcion: this.modalForm.value.descripcion,
      observaciones: this.modalForm.value.observaciones
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('perfil', '', dto)
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
      this.dataService.editEntity('perfil', '', this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'perfil', '')
      .subscribe(resp => {
        this.perfiles = (<Perfil[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }
}
