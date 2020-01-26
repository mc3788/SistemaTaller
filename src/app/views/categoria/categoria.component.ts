import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  title='';

  @ViewChild('entityModal') public entityModal: ModalDirective;

  constructor() { }

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
