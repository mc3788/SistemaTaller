import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';


@NgModule({
  declarations: [InventarioComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }
