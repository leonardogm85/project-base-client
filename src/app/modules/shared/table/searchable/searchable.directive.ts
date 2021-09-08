import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { TableSearch } from 'src/app/common/tables/table-search';
import { SearchType } from 'src/app/common/tables/search-type.enum';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';

@Directive({
  selector: 'input[searchable]'
})
export class SearchableDirective {

  @Input() searchable: string;
  @Input() searchValue: string;
  @Input() searchType: SearchType;

  @Output() protected search: EventEmitter<TableSearch> = new EventEmitter<TableSearch>();

  @HostListener('input', ['$event.target.value']) protected onInput(value: string): void {
    switch (this.searchType) {
      case SearchType.number:
        this.searchValue = value.replace('.', StringValidation.empty).replace(',', '.');
        break;
      default:
        this.searchValue = value;
        break;
    }

    this.search.emit({ column: this.searchable, value: this.searchValue });
  }

}
