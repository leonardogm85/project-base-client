import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { AuthorizeGuard } from './guards/authorize.guard';
import { Item } from './models/item.enum';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'unidades-medida',
    loadChildren: () => import('./modules/unidades-medida/unidades-medida.module').then(m => m.UnidadesMedidaModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.unidadesMedida }
  },
  {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.clientes }
  },
  {
    path: 'fornecedores',
    loadChildren: () => import('./modules/fornecedores/fornecedores.module').then(m => m.FornecedoresModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.fornecedores }
  },
  {
    path: 'produtos',
    loadChildren: () => import('./modules/produtos/produtos.module').then(m => m.ProdutosModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.produtos }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.usuarios }
  },
  {
    path: 'papeis',
    loadChildren: () => import('./modules/papeis/papeis.module').then(m => m.PapeisModule),
    canLoad: [AuthenticateGuard],
    canActivateChild: [AuthorizeGuard],
    data: { item: Item.papeis }
  },
  {
    path: 'contas',
    loadChildren: () => import('./modules/contas/contas.module').then(m => m.ContasModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'errors/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
