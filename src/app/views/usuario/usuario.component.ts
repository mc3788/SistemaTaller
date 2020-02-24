import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Usuario} from '../../interface/bo/Usuario';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsuarioDTO} from '../../interface/dto/UsuarioDTO';
import {Perfil} from '../../interface/bo/Perfil';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  title = '';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  usuarios: Usuario[];
  detail: Usuario;
  perfiles: Perfil[];

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {
    this.dataService.getAllItemsFromEntity('usuario', this.authService.token)
      .subscribe(res => {
        this.usuarios = (<Usuario[]>res);
      }, error => {
        console.error(error);
        this.dataService.validError( error );
      });

    this.dataService.getAllItemsFromEntity( 'perfil', this.authService.token )
        .subscribe( resp => {
          this.perfiles = (<Perfil[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      usuario: [''],
      perfil: [''],
      nombre: [''],
      password: [''],
      estado: [0]
    });

    console.log( this.authService.accesos )

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Usuarios');

  }

  ngOnInit() {
  }

  openToAdd() {
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      usuario: [''],
      perfil: [''],
      nombre: [''],
      password: [''],
      estado: [0]
    });
    this.entityModal.show();
  }
  openToVisualy( id: number ) {
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('usuario', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Usuario>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          usuario: [this.detail.usuario],
          perfil: [this.detail.idPerfil],
          nombre: [this.detail.nombre],
          estado: [this.detail.estado]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });

    this.entityModal.show();
  }

  openToModify( id: number) {
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('usuario', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<Usuario>resp);
        console.log(this.detail);
        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          usuario: [this.detail.usuario],
          perfil: [this.detail.idPerfil],
          nombre: [this.detail.nombre],
          estado: [this.detail.estado]
        });

        this.entityModal.show();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  openToDelete( id: number, name: string) {
    this.selId = id;
    this.selName = name;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('usuario', this.authService.token, this.selId)
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
    const dto: UsuarioDTO = {
      usuario: this.modalForm.value.usuario,
      nombre: this.modalForm.value.nombre,
      idPerfil: this.modalForm.value.perfil,
      estado: this.modalForm.value.estado,
      password: this.modalForm.value.password
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('usuario', this.authService.token, dto)
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
      this.dataService.editEntity('usuario', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'usuario', this.authService.token)
      .subscribe(resp => {
        this.usuarios = (<Usuario[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }


}

