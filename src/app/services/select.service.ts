import { Injectable } from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { filter, tap, debounceTime, switchMap, finalize } from 'rxjs/operators';

import { SelectFilter } from '../common/selects/select-filter';
import { SelectResult } from '../common/selects/select-result';
import { StringValidation } from '../common/validations/helpers/string-validation';

@Injectable()
export class SelectService {

  private _open$: Subject<void> = new Subject<void>();
  private _scroll$: Subject<void> = new Subject<void>();
  private _clear$: Subject<void> = new Subject<void>();
  private _search$: Subject<string> = new Subject<string>();
  private _load$: Subject<any[]> = new Subject<any[]>();

  filter: SelectFilter = { start: 1, length: 20 };
  result: SelectResult = { data: [] };

  loading: boolean = false;
  open: boolean = false;

  openEvent(): void {
    this._open$.next();
  }
  scrollEvent(): void {
    this._scroll$.next();
  }
  clearEvent(): void {
    this._clear$.next();
  }
  searchEvent(search: string): void {
    this._search$.next(search);
  }
  closeEvent(): void {
    this.open = false;
  }
  loadEvent(...identities: any[]): void {
    this._load$.next(identities);
  }

  onSelect(getSelect: (selectFilter: SelectFilter) => Observable<SelectResult>): Observable<SelectResult> {
    const open$ = this._open$.pipe(
      filter(() => !this.open),
      tap(() => {
        this.open = true;
        this.setFilter(StringValidation.empty);
      })
    );
    const clear$ = this._clear$.pipe(
      filter(() => this.open && StringValidation.isntNullOrEmpty(this.filter.search)),
      tap(() => this.setFilter(StringValidation.empty))
    );
    const scrol$ = this._scroll$.pipe(
      filter(() => this.open && this.result.recordsFiltered > (this.filter.start * this.filter.length)),
      tap(() => ++this.filter.start)
    );
    const search$ = this._search$.pipe(
      tap(search => {
        this.open = true;
        this.setFilter(search);
      }),
      debounceTime(500)
    );
    return merge(open$, scrol$, clear$, search$).pipe(
      tap(() => this.loading = true),
      switchMap(() => getSelect(this.filter)),
      tap(() => this.loading = false),
      finalize(() => this.loading = false)
    );
  }
  onLoad(getSelectById: (...identities: any[]) => Observable<SelectResult>): Observable<SelectResult> {
    return this._load$.pipe(
      filter(() => !this.open),
      tap(() => { this.setFilter(StringValidation.empty); this.loading = true; }),
      switchMap(i => getSelectById(i)),
      tap(() => this.loading = false),
      finalize(() => this.loading = false)
    );
  }

  setFilter(search: string): void {
    this.filter.start = 1;
    this.filter.search = search;
    this.result.recordsFiltered = undefined;
    this.result.data = [];
  }
  setResult(result: SelectResult): void {
    if (this.filter.start === 1) {
      this.result = result;
    } else {
      this.result.data = this.result.data.concat(result.data);
    }
  }

}
