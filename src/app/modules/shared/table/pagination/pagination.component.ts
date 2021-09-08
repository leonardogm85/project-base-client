import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() start: number;
  @Input() length: number;
  @Input() recordsFiltered: number;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  maxSize: number = 5;
  rotate: boolean = true;
  ellipses: boolean = false;
  boundaryLinks: boolean = true;

  onPage(page: number): void {
    this.page.emit(page);
  }

}
