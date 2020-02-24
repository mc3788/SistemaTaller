import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from "ngx-bootstrap";
import {PipesModule} from '../../containers/pipes/pipes.module';
import { CreditoscajaRoutingModule } from './creditoscaja-routing.module';
import { CreditoscajaComponent } from './creditoscaja.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [CreditoscajaComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CreditoscajaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class CreditoscajaModule { }
