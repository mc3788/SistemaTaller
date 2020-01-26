import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesinventarioComponent } from './transaccionesinventario.component';

const routes: Routes = [{ path: '', component: TransaccionesinventarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesinventarioRoutingModule { }
