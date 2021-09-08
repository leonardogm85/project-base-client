import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent {

  @Input() title: string;
  @Input() message: string;

  constructor(private _activeModal: NgbActiveModal) { }

  onClose(): void {
    this._activeModal.dismiss('Close click');
  }
  onCancel(): void {
    this._activeModal.dismiss('Cancel click');
  }
  onConfirm(): void {
    this._activeModal.close('Confirm click');
  }

}
