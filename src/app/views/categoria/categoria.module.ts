import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import {DirectivesModule} from '../../directives/directives.module';
import { FilterPipe } from '../../filter.pipe';


@NgModule({
  declarations: [CategoriaComponent,FilterPipe],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaRoutingModule,
    DirectivesModule
  ]
})
export class CategoriaModule { }
