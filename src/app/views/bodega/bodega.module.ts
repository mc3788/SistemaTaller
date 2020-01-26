import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { BodegaRoutingModule } from './bodega-routing.module';
import { BodegaComponent } from './bodega.component';


@NgModule({
  declarations: [BodegaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    BodegaRoutingModule
  ]
})
export class BodegaModule { }
