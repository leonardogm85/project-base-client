import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  @Input() form: FormGroup;
  @Input() notificationResult: NotificationResult;

  @Output() protected save: EventEmitter<void> = new EventEmitter<void>();

  protected iconSave: IconDefinition = faSave;
  protected iconReturn: IconDefinition = faChevronLeft;

  protected onSave(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this.save.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
