import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Perfil} from '../../interface/bo/Perfil';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilDTO} from '../../interface/dto/PerfilDTO';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import {Opcion} from '../../interface/bo/Opcion';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {
  title = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;
  existsError = false;
  existsErrorTitle = '';

  searchText = '';

// objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  perfiles: Perfil[];
  detail: Perfil;
  accesosPerfil: Acceso[];
  opcionesPerfil: Opcion[];

  public accesos: Acceso;

  selId: number;
  selName: string;


  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('visualModal') public visualModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService ) {
    this.dataService.getAllItemsFromEntity( 'perfil', this.authService.token )
        .subscribe( resp => {
          this.perfiles = (<Perfil[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

    this.dataService.getAllItemsFromEntity( 'acceso', this.authService.token )
    .subscribe( resp => {
      this.accesosPerfil = (<Acceso[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });

    this.dataService.getAllItemsFromEntity( 'opcion', this.authService.token )
    .subscribe( resp => {
      this.opcionesPerfil = (<Opcion[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      descripcion: ['', Validators.required ],
      observaciones: ['']
    });

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Categorias');
  }

  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      descripcion: [''],
      observaciones: ['']
    });
    this.entityModal.show();
  }
  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('perfil', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Perfil>resp);
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

  openToAccess(id: number) {
    this.submitted = false;
    this.modalMode = 3;
    this.title = 'Accesos';

    this.dataService.getListItems('acceso/permissions', this.authService.token, id)
    .subscribe( resp => {
      this.accesosPerfil = (<Acceso[]>resp);

    }, error => {
      console.error( JSON.stringify(error) );
    });

    this.visualModal.show();
  }


  openToModify(id: number) {
    this.submitted = false;
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('perfil', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Perfil>resp);

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
  openToDelete(id: number, name: string) {
    this.submitted = false;
    this.selId = id;
    this.selName = name;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('perfil', this.authService.token, this.selId)
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

    this.submitted = true;

    if (this.modalForm.invalid) {
      return;
    }

    const dto: PerfilDTO = {
      descripcion: this.modalForm.value.descripcion,
      observaciones: this.modalForm.value.observaciones
    };

    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('perfil', this.authService.token, dto)
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
      this.dataService.editEntity('perfil', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'perfil', this.authService.token)
      .subscribe(resp => {
        this.perfiles = (<Perfil[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }
}
