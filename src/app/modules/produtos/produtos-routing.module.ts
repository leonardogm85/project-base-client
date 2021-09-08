import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { Access } from 'src/app/models/access.enum';

const routes: Routes = [
  { path: 'listar', component: ListarComponent, data: { access: Access.read } },
  { path: 'adicionar', component: AdicionarComponent, data: { access: Access.create } },
  { path: 'atualizar/:id', component: AtualizarComponent, data: { access: Access.update } },
  { path: 'visualizar/:id', component: VisualizarComponent, data: { access: Access.read } },
  { path: '', pathMatch: 'full', redirectTo: 'listar' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
