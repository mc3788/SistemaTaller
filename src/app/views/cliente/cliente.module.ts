import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';


@NgModule({
  declarations: [ClienteComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
