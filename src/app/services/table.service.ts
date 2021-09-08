import { Injectable, QueryList } from '@angular/core';

import { Subject, Observable, merge, BehaviorSubject } from 'rxjs';
import { tap, switchMap, debounceTime, finalize } from 'rxjs/operators';

import { TableFilter } from '../common/tables/table-filter';
import { TableResult } from '../common/tables/table-result';
import { TableSort } from '../common/tables/table-sort';
import { TableSearch } from '../common/tables/table-search';
import { ObjectValidation } from '../common/validations/helpers/object-validation';
import { StringValidation } from '../common/validations/helpers/string-validation';
import { SortableDirective } from '../modules/shared/table/sortable/sortable.directive';

@Injectable()
export class TableService<T> {

  private _sort$: Subject<TableSort> = new Subject<TableSort>();
  private _page$: Subject<number> = new Subject<number>();
  private _search$: Subject<TableSearch> = new Subject<TableSearch>();

  private _update$: BehaviorSubject<TableFilter> = new BehaviorSubject<TableFilter>({ start: 1, length: 20 });

  filter: TableFilter;
  result: TableResult<T>;

  loading: boolean = false;

  sortEvent(sort: TableSort, columns: QueryList<SortableDirective>): void {
    columns
      .filter(s => s.arentEquals(sort.column))
      .forEach(s => s.unsorted());
    this._sort$.next(sort);
  }
  pageEvent(page: number): void {
    this._page$.next(page);
  }
  searchEvent(search: TableSearch): void {
    this._search$.next(search);
  }
  updateEvent(): void {
    this._update$.next(this.filter);
  }

  onTable(getTable: (tableFilter: TableFilter) => Observable<TableResult<T>>): Observable<TableResult<T>> {
    const sort$ = this._sort$.pipe(
      tap(s => this.filter.sort = s)
    );
    const page$ = this._page$.pipe(
      tap(p => this.filter.start = p)
    );
    const search$ = this._search$.pipe(
      debounceTime(500),
      tap(s => {
        if (ObjectValidation.isNullOrUndefined(this.filter.searches)) {
          this.filter.searches = [];
        } else {
          const index = this.filter.searches.findIndex(f => f.column === s.column);

          if (index !== -1) {
            this.filter.searches.splice(index, 1);
          }
        }

        if (StringValidation.isntNullOrWhiteSpace(s.value)) {
          this.filter.searches.push(s);
        }

        this.filter.start = 1;
      })
    );
    const update$ = this._update$.pipe(
      tap(f => this.filter = f)
    );
    return merge(update$, sort$, page$, search$).pipe(
      tap(() => this.loading = true),
      switchMap(() => getTable(this.filter)),
      tap(() => this.loading = false),
      finalize(() => this.loading = false)
    );
  }

  setResult(result: TableResult<T>): void {
    this.result = result;
  }

}
