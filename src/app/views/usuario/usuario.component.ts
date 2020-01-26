import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Usuario} from '../../interface/Usuario';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  title='';

  usuarios : Usuario[];

  @ViewChild('entityModal') public entityModal: ModalDirective;

  constructor(private dataservice: DataService) { 
      this.dataservice.getAllItemsFromEntity('usuario',' ')
      .subscribe(res => {
        this.usuarios = (<Usuario[]>res);
      }, error => {
        console.error(JSON.stringify(error))
      });

  }

  openToAdd() {
    this.title='Agregar';
    this.entityModal.show();
  }
  openToVisualy(){
    this.title='Consultar';
    this.entityModal.show();
  }
  openToModify(){
    this.title='Modificar';
    this.entityModal.show();
  }
  openToDelete(){
    this.title='Eliminar';
    this.entityModal.show();
  }

  dismiss() {
      this.entityModal.hide();
  }

  ngOnInit() {
  }

}

