import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UnidadeMedida } from '../models/unidade-medida';
import { UnidadeMedidaTable } from '../models/unidade-medida-table';
import { TableFilter } from '../common/tables/table-filter';
import { TableResult } from '../common/tables/table-result';
import { SelectFilter } from '../common/selects/select-filter';
import { SelectResult } from '../common/selects/select-result';
import { NotificationResult } from '../common/validations/notifications/notification-result';
import { StringContract } from '../common/validations/contracts/string-contract';
import { ValidationMessages } from '../common/validations/constants/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {

  private readonly _api: string = `${environment.apiBase}/unidades-medida`;

  constructor(
    private _http: HttpClient,
    private _builder: FormBuilder
  ) { }

  obter(id: string): Observable<UnidadeMedida> {
    return this._http.get<UnidadeMedida>(`${this._api}/obter/${id}`).pipe(take(1));
  }

  adicionar(model: UnidadeMedida): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar`, model).pipe(take(1));
  }

  atualizar(model: UnidadeMedida): Observable<NotificationResult> {
    return this._http.put<NotificationResult>(`${this._api}/atualizar`, model).pipe(take(1));
  }

  remover(id: string): Observable<NotificationResult> {
    return this._http.delete<NotificationResult>(`${this._api}/remover/${id}`).pipe(take(1));
  }

  ativar(id: string): Observable<NotificationResult> {
    return this._http.patch<NotificationResult>(`${this._api}/ativar/${id}`, {}).pipe(take(1));
  }

  desativar(id: string): Observable<NotificationResult> {
    return this._http.patch<NotificationResult>(`${this._api}/desativar/${id}`, {}).pipe(take(1));
  }

  obterTabela(tableFilter: TableFilter): Observable<TableResult<UnidadeMedidaTable>> {
    return this._http.post<TableResult<UnidadeMedidaTable>>(`${this._api}/obter-tabela`, tableFilter).pipe(take(1));
  }

  obterSelecao(selectFilter: SelectFilter): Observable<SelectResult> {
    return this._http.post<SelectResult>(`${this._api}/obter-selecao`, selectFilter).pipe(take(1));
  }

  obterSelecaoPorIdentidades(...identidades: string[]): Observable<SelectResult> {
    return this._http.get<SelectResult>(`${this._api}/obter-selecao`, { params: new HttpParams({ fromObject: { identidades } }) }).pipe(take(1));
  }

  obterFormulario(): FormGroup {
    return this._builder.group({
      id: [null],
      versao: [null],
      nome: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.unidadeMedidaNomeDeveSerPreenchido),
        StringContract.hasMaxLength(50, ValidationMessages.unidadeMedidaNomeDeveTerUmTamanhoMaximo)
      ]],
      sigla: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.unidadeMedidaSiglaDeveSerPreenchido),
        StringContract.hasMaxLength(5, ValidationMessages.unidadeMedidaSiglaDeveTerUmTamanhoMaximo)
      ]]
    });
  }

}
