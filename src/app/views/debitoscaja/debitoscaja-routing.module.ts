import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebitoscajaComponent } from './debitoscaja.component';

const routes: Routes = [{ path: '', component: DebitoscajaComponent, data:{title:'Gastos'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitoscajaRoutingModule { }
