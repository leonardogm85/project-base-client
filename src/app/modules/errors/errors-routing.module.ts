import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FailedComponent } from './failed/failed.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'failed', component: FailedComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
