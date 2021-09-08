import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from 'src/app/common/validations/notifications/notification';

@Component({
  selector: 'app-modal-notify',
  templateUrl: './modal-notify.component.html',
  styleUrls: ['./modal-notify.component.css']
})
export class ModalNotifyComponent {

  @Input() title: string;
  @Input() notifications: Notification[];

  constructor(private _activeModal: NgbActiveModal) { }

  onClose(): void {
    this._activeModal.dismiss('Close click');
  }
  onOk(): void {
    this._activeModal.close('Ok click');
  }

}
