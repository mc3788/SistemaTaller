import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {DebitoCaja} from '../../interface/bo/DebitoCaja';
import { DataService } from '../../services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DebitoCajaDTO} from '../../interface/dto/DebitoCajaDTO';
import {Proveedor} from '../../interface/bo/Proveedor';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-debitoscaja',
  templateUrl: './debitoscaja.component.html',
  styleUrls: ['./debitoscaja.component.css']
})
export class DebitoscajaComponent implements OnInit {

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

  debitosCaja: DebitoCaja[];
  detail: DebitoCaja;
  proveedores: Proveedor[];

  public accesos: Acceso;

  selId: number;
  selName: string;
  selDocumento: number;

  @ViewChild('entityModal') public entityModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;


  constructor(private dataService: DataService,
              public formBuilder: FormBuilder,
              private authService: AuthService) {

    this.dataService.getListDate('debitoCaja/filtrofecha', this.authService.token, this.firstDay(), this.lastDay())
    .subscribe( resp => {
      this.debitosCaja = (<DebitoCaja[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });

    this.dataService.getAllItemsFromEntity( 'proveedor', this.authService.token )
        .subscribe( resp => {
          this.proveedores = (<Proveedor[]>resp);
        }, error => {
          console.error( JSON.stringify(error) );
        });

    // Inicializa el form construyendolo con los campos
    this.modalForm = this.formBuilder.group({
      fecha: [this.currentDate(), Validators.required],
      proveedor: ['', Validators.required],
      idCierre: [''],
      noOrden: [''],
      noFactura: [''],
      monto: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.fechaFin=this.lastDay();
    this.fechaIni=this.firstDay();

    this.accesos = this.authService.accesos.find( a => a.opcion === 'Gastos');

  }

  get f() { return this.modalForm.controls; }

  openToAdd() {
    this.submitted = false;
    this.modalMode = 1;
    this.title = 'Agregar';
    this.modalForm = this.formBuilder.group({
      fecha: [this.currentDate()],
      proveedor: [''],
      idCierre: [''],
      noOrden: [''],
      noFactura: [''],
      monto: [''],
      descripcion: ['']
    });
    this.entityModal.show();
  }

  openToVisualy(id: number) {
    this.submitted = false;
    this.modalMode = 0;
    this.title = 'Consultar';

    this.dataService.getEntityDetail('debitoCaja', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<DebitoCaja>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          fecha: [this.detail.fecha],
          proveedor: [this.detail.idProveedor],
          idCierre: [this.detail.idCierre],
          noOrden: [this.detail.noOrden],
          noFactura: [this.detail.noFactura],
          monto: [this.detail.monto],
          descripcion: [this.detail.descripcion]
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

    this.dataService.getEntityDetail('debitoCaja', this.authService.token, id)
      .subscribe(resp => {
        // se convierten los datos recuperadps al objeto
        this.detail = (<DebitoCaja>resp);

        // se ingresan los valores en el form y validaciones
        this.modalForm = this.formBuilder.group({
          fecha: [this.detail.fecha],
          proveedor: [this.detail.idProveedor],
          idCierre: [this.detail.idCierre],
          noOrden: [this.detail.noOrden],
          noFactura: [this.detail.noFactura],
          monto: [this.detail.monto],
          descripcion: [this.detail.descripcion]
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
    this.dataService.deleteEntity('debitoCaja', this.authService.token, this.selId)
      .subscribe(resp => {
        this.reload();
        this.deleteModal.hide();
      }, error2 => {
        console.error(JSON.stringify(error2));
      });
  }

  saveChanges() {
    this.submitted = true;

    if (this.modalForm.invalid) {
      return;
    }

    const dto: DebitoCajaDTO = {
      fecha: this.modalForm.value.fecha,
      idProveedor: this.modalForm.value.proveedor,
      noOrden: this.modalForm.value.noOrden,
      noFactura: this.modalForm.value.noFactura,
      monto: this.modalForm.value.monto,
      descripcion: this.modalForm.value.descripcion,
    };


    if (this.modalMode === 1) {
      // Servicio para guardar nueva entidad
      this.dataService.insertNewEntity('debitoCaja', this.authService.token, dto)
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
      this.dataService.editEntity('debitoCaja', this.authService.token, this.detail.id, dto)
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
    this.dataService.getListDate('debitoCaja/filtrofecha', this.authService.token, this.fechaIni, this.fechaFin)
    .subscribe( resp => {
      this.debitosCaja = (<DebitoCaja[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });
  }

  ngOnInit() {
  }

  currentDate() {
    const dp = new DatePipe('es-GT');
    const p = 'yyyy-MM-dd';
    return dp.transform( new Date(), p );
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

  dismiss() {
      this.entityModal.hide();
  }

  filtroFechas() {
    this.dataService.getListDate('debitoCaja/filtrofecha', this.authService.token, this.fechaIni, this.fechaFin)
    .subscribe( resp => {
      this.debitosCaja = (<DebitoCaja[]>resp);
    }, error => {
      console.error( JSON.stringify(error) );
    });
  }

}
