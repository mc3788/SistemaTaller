import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";

import { TipodocumentoRoutingModule } from './tipodocumento-routing.module';
import { TipodocumentoComponent } from './tipodocumento.component';


@NgModule({
  declarations: [TipodocumentoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    TipodocumentoRoutingModule
  ]
})
export class TipodocumentoModule { }
