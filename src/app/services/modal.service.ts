import { Injectable } from '@angular/core';

import { Observable, from, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Notification } from '../common/validations/notifications/notification';
import { ModalConfirmComponent } from '../modules/shared/modal/modal-confirm/modal-confirm.component';
import { ModalAlertComponent } from '../modules/shared/modal/modal-alert/modal-alert.component';
import { ModalNotifyComponent } from '../modules/shared/modal/modal-notify/modal-notify.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _modal: NgbModal) { }

  confirm(message: string, title: string = 'Atenção ao confirmar comando!'): Observable<string> {
    const modalRef = this._modal.open(ModalConfirmComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return from(modalRef.result).pipe(catchError(() => empty()));
  }

  notify(notifications: Notification[], title: string = 'Erro ao executar comando!'): Observable<string> {
    const modalRef = this._modal.open(ModalNotifyComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.notifications = notifications;
    return from(modalRef.result).pipe(catchError(() => empty()));
  }

  alert(message: string, title: string = 'Atenção ao ler mensagem!'): void {
    const modalRef = this._modal.open(ModalAlertComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

}
