import { Component, Input } from '@angular/core';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';

import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { Notification } from 'src/app/common/validations/notifications/notification';
import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.css']
})
export class ValidationSummaryComponent {

  iconSummary: IconDefinition = faThumbsDown;

  @Input() result: NotificationResult;

  get invalid(): boolean {
    return ObjectValidation.isntNullOrUndefined(this.result) && this.result.invalid;
  }

  get notifications(): Notification[] {
    return ObjectValidation.isntNullOrUndefined(this.result) ? this.result.notifications : [];
  }

}
