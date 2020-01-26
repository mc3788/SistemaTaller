import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesinventarioRoutingModule } from './transaccionesinventario-routing.module';
import { TransaccionesinventarioComponent } from './transaccionesinventario.component';


@NgModule({
  declarations: [TransaccionesinventarioComponent],
  imports: [
    CommonModule,
    TransaccionesinventarioRoutingModule
  ]
})
export class TransaccionesinventarioModule { }
