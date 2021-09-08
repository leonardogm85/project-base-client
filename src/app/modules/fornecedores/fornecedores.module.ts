import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListarComponent } from './listar/listar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { TableModule } from '../shared/table/table.module';
import { ValidationModule } from '../shared/validation/validation.module';
import { AuthorizationModule } from '../shared/authorization/authorization.module';

@NgModule({
  declarations: [
    AdicionarComponent,
    AtualizarComponent,
    FormularioComponent,
    ListarComponent,
    VisualizarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    FornecedoresRoutingModule,
    TableModule,
    ValidationModule,
    AuthorizationModule
  ]
})
export class FornecedoresModule { }
