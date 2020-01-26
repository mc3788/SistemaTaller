import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipodocumentoComponent } from './tipodocumento.component';

const routes: Routes = [{ path: '', component: TipodocumentoComponent,data:{title:'Tipos de documento'} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipodocumentoRoutingModule { }
