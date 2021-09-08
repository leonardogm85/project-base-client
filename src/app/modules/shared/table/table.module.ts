import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchableDirective } from './searchable/searchable.directive';
import { SortableDirective } from './sortable/sortable.directive';
import { InformationComponent } from './information/information.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    SearchableDirective,
    SortableDirective,
    InformationComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [
    SearchableDirective,
    SortableDirective,
    InformationComponent,
    PaginationComponent
  ]
})
export class TableModule { }
