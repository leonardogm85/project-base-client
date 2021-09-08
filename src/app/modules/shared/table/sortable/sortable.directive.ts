import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { TableSort } from 'src/app/common/tables/table-sort';
import { SortDirection } from 'src/app/common/tables/sort-direction.enum';

@Directive({
  selector: 'th[sortable]',
  host: { 'class': 'col-sortable' }
})
export class SortableDirective {

  @Input() sortable: string;
  @Input() sortDirection: SortDirection;

  @Output() protected sort: EventEmitter<TableSort> = new EventEmitter<TableSort>();

  @HostBinding('class.col-ascending') protected get ascending(): boolean {
    return this.sortDirection === SortDirection.Ascending;
  }
  @HostBinding('class.col-descending') protected get descending(): boolean {
    return this.sortDirection === SortDirection.Descending;
  }

  @HostListener('click') protected onClick(): void {
    if (this.ascending) {
      this.sortDirection = SortDirection.Descending;
    } else {
      this.sortDirection = SortDirection.Ascending;
    }

    this.sort.emit({ column: this.sortable, direction: this.sortDirection });
  }

  unsorted(): void {
    this.sortDirection = undefined;
  }

  arentEquals(comparer: string): boolean {
    return !this.areEquals(comparer);
  }

  areEquals(comparer: string): boolean {
    return this.sortable === comparer;
  }

}
