import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {PipesModule} from '../../containers/pipes/pipes.module';
import { CierrecajaRoutingModule } from './cierrecaja-routing.module';
import { CierrecajaComponent } from './cierrecaja.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [CierrecajaComponent],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CierrecajaRoutingModule,
    DirectivesModule,
    PipesModule
  ]
})
export class CierrecajaModule { }
