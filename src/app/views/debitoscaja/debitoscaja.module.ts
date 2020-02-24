import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {PipesModule} from '../../containers/pipes/pipes.module';
import { DebitoscajaRoutingModule } from './debitoscaja-routing.module';
import { DebitoscajaComponent } from './debitoscaja.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [DebitoscajaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DebitoscajaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class DebitoscajaModule { }
