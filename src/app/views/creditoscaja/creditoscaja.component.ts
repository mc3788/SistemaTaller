import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {CreditoCaja} from '../../interface/bo/CreditoCaja';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditoCajaDTO} from '../../interface/dto/CreditoCajaDTO';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';

@Component({
  selector: 'app-creditoscaja',
  templateUrl: './creditoscaja.component.html',
  styleUrls: ['./creditoscaja.component.css']
})
export class CreditoscajaComponent implements OnInit {

  title = '';
  searchText = '';

  submitted = false;

  // 0: View, 1: Add, 2: Modify
  modalMode = 0;

  existsError = false;
  existsErrorTitle = '';
  fechaIni='';
  fechaFin='';

  // objecto que controla validaciones y valores del form
  modalForm: FormGroup;

  creditosCaja: CreditoCaja[];
  detail: CreditoCaja;

  public accesos: Acceso;

  selId: number;
  selName: string;
  selDocumento: number;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;

  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {

    this.dataService.getListDate('creditoCaja/filtrofecha', this.authService.token, this.firstDay(), this.lastDay())
    .subscribe( res => {
      this.creditosCaja = (<CreditoCaja[]>res);
      console.log(this.creditosCaja);
    }, error => {
      console.error( JSON.stringify(error) );
    });
  
      // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      idCierre: [''],
      noDocumento: ['', Validators.required],
      monto: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.fechaFin=this.lastDay();
    this.fechaIni=this.firstDay();

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Abonos');

  }
get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      fecha: [this.currentDate()],
      idCierre: [''],
      noDocumento: [''],
      monto: [''],
      descripcion: [''],
      tipo: ['']
    });

    this.entityModal.show();
  }

  currentDate() {
    // const currentDate = new Date();
    // return currentDate.toISOString().slice(0,-1);
    const dp = new DatePipe('es-GT');
    const p = 'yyyy-MM-dd';
    const dtr = dp.transform( new Date(), p );
    return dtr;
  }

  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('creditoCaja', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<CreditoCaja>resp);

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
  openToModify(id: number) {
    this.submitted = false;
    this.modalMode = 2;
    this.title = 'Modificar';

    this.dataService.getEntityDetail('creditoCaja', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<CreditoCaja>resp);

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
  openToDelete(id: number, name: string, documento: number) {
    this.submitted = false;
    this.selId = id;
    this.selName = name;
    this.selDocumento = documento;
    this.title = 'Eliminar';
    this.deleteModal.show();
  }

  deleteReg( ) {
    this.dataService.deleteEntity('creditoCaja', this.authService.token, this.selId)
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
    this.submitted = true;

    if (this.modalForm.invalid) {
      return;
    }

    const dto: CreditoCajaDTO = {
      fecha: this.modalForm.value.fecha,
      noDocumento: this.modalForm.value.noDocumento,
      monto: this.modalForm.value.monto,
      descripcion: this.modalForm.value.descripcion,
      tipo: this.modalForm.value.tipo
    };


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('creditoCaja', this.authService.token, dto)
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
      this.dataService.editEntity('creditoCaja', this.authService.token, this.detail.id, dto)
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
    this.dataService.getListDate('creditoCaja/filtrofecha', this.authService.token, this.fechaIni, this.fechaFin)
    .subscribe( res => {
      this.creditosCaja = (<CreditoCaja[]>res);
    }, error => {
      console.error( JSON.stringify(error) );
    });
  }

  filtroFechas() {
    this.dataService.getListDate('creditoCaja/filtrofecha', this.authService.token, this.fechaIni, this.fechaFin)
    .subscribe( resp => {
      this.creditosCaja = (<CreditoCaja[]>resp);
      console.log(this.creditosCaja);
    }, error => {
      console.error( JSON.stringify(error) );
    });
  }
  firstDay(){
    const dp = new DatePipe('es-GT');
    var pd= new Date();
    const p = 'yyyy-MM-dd';
    return dp.transform( new Date(pd.getFullYear(), pd.getMonth(), 1), p );
  }

  lastDay(){
    const dp = new DatePipe('es-GT');
    var pd= new Date();
    const p = 'yyyy-MM-dd';
    return dp.transform( new Date(pd.getFullYear(), pd.getMonth() + 1, 0), p );
  }

}
