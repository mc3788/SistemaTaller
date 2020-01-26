import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebitoscajaRoutingModule } from './debitoscaja-routing.module';
import { DebitoscajaComponent } from './debitoscaja.component';


@NgModule({
  declarations: [DebitoscajaComponent],
  imports: [
    CommonModule,
    DebitoscajaRoutingModule
  ]
})
export class DebitoscajaModule { }
