import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditoscajaComponent } from './creditoscaja.component';

const routes: Routes = [{ path: '', component: CreditoscajaComponent, data:{title:'Abonos'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditoscajaRoutingModule { }
