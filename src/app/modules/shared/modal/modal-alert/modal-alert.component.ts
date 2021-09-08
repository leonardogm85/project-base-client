import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent {

  @Input() title: string;
  @Input() message: string;

  constructor(private _activeModal: NgbActiveModal) { }

  onClose(): void {
    this._activeModal.dismiss('Close click');
  }
  onOk(): void {
    this._activeModal.close('Ok click');
  }

}
