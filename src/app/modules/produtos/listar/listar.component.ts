import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTable, faSearch, faPencilAlt, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProdutoTable } from 'src/app/models/produto-table';
import { ProdutoService } from 'src/app/services/produto.service';
import { TableService } from 'src/app/services/table.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';
import { TableFilter } from 'src/app/common/tables/table-filter';
import { TableResult } from 'src/app/common/tables/table-result';
import { TableSort } from 'src/app/common/tables/table-sort';
import { TableSearch } from 'src/app/common/tables/table-search';
import { SearchType } from 'src/app/common/tables/search-type.enum';
import { MaskTypes } from 'src/app/common/mask/mask-types';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';
import { SortableDirective } from '../../shared/table/sortable/sortable.directive';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [TableService]
})
export class ListarComponent implements OnInit, OnDestroy {

  @ViewChildren(SortableDirective) sortableColumns: QueryList<SortableDirective>;

  iconCreate: IconDefinition = faPlus;
  iconTable: IconDefinition = faTable;
  iconRead: IconDefinition = faSearch;
  iconUpdate: IconDefinition = faPencilAlt;
  iconRemove: IconDefinition = faTrashAlt;
  iconActivate: IconDefinition = faCheck;
  iconDeactivate: IconDefinition = faBan;

  subscription: Subscription = new Subscription();

  get tableFilter(): TableFilter {
    return this._tableService.filter;
  }
  get tableResult(): TableResult<ProdutoTable> {
    return this._tableService.result;
  }

  maskValor: string = MaskTypes.decimal;

  searchTypeNumber: SearchType = SearchType.number;

  constructor(
    private _produtoService: ProdutoService,
    private _tableService: TableService<ProdutoTable>,
    private _modalService: ModalService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this._tableService.onTable(f => this._produtoService.obterTabela(f)).subscribe(r => this._tableService.setResult(r)));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSort(tableSort: TableSort): void {
    this._tableService.sortEvent(tableSort, this.sortableColumns);
  }
  onPage(tablePage: number): void {
    this._tableService.pageEvent(tablePage);
  }
  onSearch(tableSearch: TableSearch): void {
    this._tableService.searchEvent(tableSearch);
  }

  onActivate(id: string): void {
    this.confirm(() => this._produtoService.ativar(id), ValidationMessages.confirmarAtivacaoRegistro, ValidationMessages.registroAtivado);
  }
  onDeactivate(id: string): void {
    this.confirm(() => this._produtoService.desativar(id), ValidationMessages.confirmarDesativacaoRegistro, ValidationMessages.registroDesativado);
  }
  onDelete(id: string): void {
    this.confirm(() => this._produtoService.remover(id), ValidationMessages.confirmarRemocaoRegistro, ValidationMessages.registroRemovido);
  }

  confirm(command: () => Observable<NotificationResult>, confirmMessagem: string, successMessage: string): void {
    this._modalService.confirm(confirmMessagem).pipe(
      tap(() => this._spinnerService.show()),
      switchMap(() => command()),
      finalize(() => this._spinnerService.hide())
    ).subscribe(n => {
      if (n.valid) {
        this._tableService.updateEvent();
        this._toastService.success(successMessage);
      } else {
        this._modalService.notify(n.notifications);
        this._toastService.error(ValidationMessages.falhouAoExecutarComando);
      }
    });
  }

}
