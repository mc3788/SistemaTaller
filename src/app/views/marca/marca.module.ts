import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";


import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './marca.component';


@NgModule({
  declarations: [MarcaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    MarcaRoutingModule
  ]
})
export class MarcaModule { }
