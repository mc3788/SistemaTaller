import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorComponent } from './proveedor.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [ProveedorComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProveedorRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class ProveedorModule { }
