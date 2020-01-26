import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component';


@NgModule({
  declarations: [ProveedorComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    ProveedorRoutingModule
  ]
})
export class ProveedorModule { }
