import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';

@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
