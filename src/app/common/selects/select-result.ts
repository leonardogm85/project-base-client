import { KeyValue } from '@angular/common';

export interface SelectResult {
  recordsFiltered?: number;
  data: KeyValue<any, string>[];
}
