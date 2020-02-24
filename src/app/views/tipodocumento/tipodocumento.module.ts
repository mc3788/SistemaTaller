import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { TipodocumentoRoutingModule } from './tipodocumento-routing.module';
import { TipodocumentoComponent } from './tipodocumento.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [TipodocumentoComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TipodocumentoRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class TipodocumentoModule { }
