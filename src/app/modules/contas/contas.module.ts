import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';

import { ContasRoutingModule } from './contas-routing.module';
import { ValidationModule } from '../shared/validation/validation.module';
import { EntrarComponent } from './entrar/entrar.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { AtualizarContaComponent } from './atualizar-conta/atualizar-conta.component';
import { AtualizarSenhaComponent } from './atualizar-senha/atualizar-senha.component';

@NgModule({
  declarations: [
    EntrarComponent,
    EsqueceuSenhaComponent,
    AtualizarContaComponent,
    AtualizarSenhaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    ContasRoutingModule,
    ValidationModule
  ]
})
export class ContasModule { }
