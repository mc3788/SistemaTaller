import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { CreditoscajaRoutingModule } from './creditoscaja-routing.module';
import { CreditoscajaComponent } from './creditoscaja.component';


@NgModule({
  declarations: [CreditoscajaComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    CreditoscajaRoutingModule
  ]
})
export class CreditoscajaModule { }
