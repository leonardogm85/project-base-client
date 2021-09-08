import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PapeisRoutingModule } from './papeis-routing.module';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListarComponent } from './listar/listar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { AdicionarAutorizacoesComponent } from './adicionar-autorizacoes/adicionar-autorizacoes.component';
import { TableModule } from '../shared/table/table.module';
import { ValidationModule } from '../shared/validation/validation.module';
import { AuthorizationModule } from '../shared/authorization/authorization.module';

@NgModule({
  declarations: [
    AdicionarComponent,
    AtualizarComponent,
    FormularioComponent,
    ListarComponent,
    VisualizarComponent,
    AdicionarAutorizacoesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    FontAwesomeModule,
    PapeisRoutingModule,
    TableModule,
    ValidationModule,
    AuthorizationModule
  ]
})
export class PapeisModule { }
