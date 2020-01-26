import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';


@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
