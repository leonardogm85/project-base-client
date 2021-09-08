import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrarComponent } from './entrar/entrar.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { AtualizarContaComponent } from './atualizar-conta/atualizar-conta.component';
import { AtualizarSenhaComponent } from './atualizar-senha/atualizar-senha.component';
import { AuthenticateGuard } from 'src/app/guards/authenticate.guard';

const routes: Routes = [
  { path: 'entrar', component: EntrarComponent },
  { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
  { path: 'atualizar-conta', component: AtualizarContaComponent, canActivate: [AuthenticateGuard] },
  { path: 'atualizar-senha', component: AtualizarSenhaComponent, canActivate: [AuthenticateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasRoutingModule { }
