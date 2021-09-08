import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { ValidationSummaryComponent } from './validation-summary/validation-summary.component';

@NgModule({
  declarations: [
    ValidationMessageComponent,
    ValidationSummaryComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ValidationMessageComponent,
    ValidationSummaryComponent
  ]
})
export class ValidationModule { }
