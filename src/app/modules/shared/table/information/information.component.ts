import { Component, Input } from '@angular/core';

import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  @Input() start: number;
  @Input() length: number;
  @Input() recordsFiltered: number;
  @Input() recordsTotal: number;

  get startPage(): number {
    const value = ((this.start - 1) * this.length) + 1;

    if (value > this.recordsFiltered) {
      return this.recordsFiltered;
    }

    return value;
  }
  get endPage(): number {
    const value = ((this.start - 1) * this.length) + this.length;

    if (value > this.recordsFiltered) {
      return this.recordsFiltered;
    }

    return value;
  }
  get filtered(): boolean {
    return ObjectValidation.isntNullOrUndefined(this.recordsTotal) && this.recordsTotal > this.recordsFiltered;
  }

}
