import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedCreateDirective } from './authorized-create/authorized-create.directive';
import { AuthorizedReadDirective } from './authorized-read/authorized-read.directive';
import { AuthorizedUpdateDirective } from './authorized-update/authorized-update.directive';
import { AuthorizedDeleteDirective } from './authorized-delete/authorized-delete.directive';

@NgModule({
  declarations: [
    AuthorizedCreateDirective,
    AuthorizedReadDirective,
    AuthorizedUpdateDirective,
    AuthorizedDeleteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthorizedCreateDirective,
    AuthorizedReadDirective,
    AuthorizedUpdateDirective,
    AuthorizedDeleteDirective
  ]
})
export class AuthorizationModule { }
