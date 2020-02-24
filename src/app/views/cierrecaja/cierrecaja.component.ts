import { Component, OnInit,ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {CierreCaja} from '../../interface/bo/CierreCaja';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CierreCajaDTO} from '../../interface/dto/CierreCajaDTO';
import {Perfil} from '../../interface/bo/Perfil';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cierrecaja',
  templateUrl: './cierrecaja.component.html',
  styleUrls: ['./cierrecaja.component.css']
})
export class CierrecajaComponent implements OnInit {

  title = '';

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  cierresCaja: CierreCaja[];
  detail: CierreCaja;
  perfiles: Perfil[];

  public accesos: Acceso;

  selId: number;
  selName: string;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) { 
    this.dataService.getAllItemsFromEntity('cierreCaja', this.authService.token)
    .subscribe(res => {
    this.cierresCaja = (<CierreCaja[]>res);
    }, error => {
      console.error(error);
      this.dataService.validError( error );
    });
    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      fechaCierre: [''],
      observaciones: ['']
    });

    console.log( this.authService.accesos )

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Cierre de Caja');
    
  }

  ngOnInit() {
  }

  openToAdd() {
    this.modalMode = 1;
    this.title = 'Cierre mensual';
    this.modalForm = this.formBuilder.group({
      fechaCierre: [this.currentDate()],
      observaciones: ['']
    });
    this.entityModal.show();
  }


  saveChanges() {
    console.log('Guardando cambios');
    const dto: CierreCajaDTO = {
      mes: this.modalForm.value.fechaCierre.substring(5,7),
      anio: this.modalForm.value.fechaCierre.substring(0,4),
      observaciones: this.modalForm.value.observaciones
    };

    console.log('Guardando cambios: ' + dto);


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('cierreCaja', this.authService.token, dto)
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
      this.dataService.editEntity('cierreCaja', this.authService.token, this.detail.id, dto)
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
    this.dataService.getAllItemsFromEntity( 'cierreCaja', this.authService.token)
      .subscribe(resp => {
        this.cierresCaja = (<CierreCaja[]> resp);
      }, error => {
        console.error( JSON.stringify(error) );
      });
  }

  currentDate(){
    // const currentDate = new Date();
    // return currentDate.toISOString().slice(0,-1);
    let dp = new DatePipe('es-GT');
    let p = "yyyy-MM";
    let dtr = dp.transform( new Date(), p );
    return dtr;
  }

  dismiss() {
      this.entityModal.hide();
  }

}
