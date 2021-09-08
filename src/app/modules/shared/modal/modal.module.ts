import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalNotifyComponent } from './modal-notify/modal-notify.component';

@NgModule({
  declarations: [
    ModalAlertComponent,
    ModalConfirmComponent,
    ModalNotifyComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    FontAwesomeModule
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmComponent,
    ModalNotifyComponent
  ]
})
export class ModalModule { }
