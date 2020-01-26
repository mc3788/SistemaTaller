import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';


@NgModule({
  declarations: [ProductoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
