import { Component } from '@angular/core';
import {CierreCaja} from '../../interface/bo/CierreCaja';
import { DataService } from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {Acceso} from '../../interface/bo/Acceso';
import { getFullYear } from 'ngx-bootstrap';
import { animation } from '@angular/animations';
import { newArray } from '@angular/compiler/src/util';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  private cierresCaja: CierreCaja[];
  public accesos: Acceso;
  public gasto: Array<number> = [];
  public abono: Array<number> = [];

  constructor(private dataService: DataService,
    private authService: AuthService) {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    this.dataService.getListItems('cierreCaja/gastosAbonos', this.authService.token, anio)
    .subscribe(res => {
    this.cierresCaja = (<CierreCaja[]>res);
      for ( const item of this.cierresCaja ) {
        this.gasto.push(item.montoCredito);
        this.abono.push(item.montoDebito);
      }
    }, error => {
    console.error(error);
    this.dataService.validError( error );
  });
  this.accesos = this.authService.accesos.find( a => a.opcion === 'Dashboard');
}

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;


  public barChartData: any[] = [
    {data: this.gasto, label: 'Gastos'},
    {data: this.abono, label: 'Abonos'}
  ];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
