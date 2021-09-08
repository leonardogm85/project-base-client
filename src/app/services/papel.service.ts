import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { RoleTable } from '../models/role-table';
import { RoleClaim } from '../models/role-claim';
import { MenuClaim } from '../models/menu-claim';
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
export class PapelService {

  private readonly _api: string = `${environment.apiBase}/papeis`;

  constructor(
    private _http: HttpClient,
    private _builder: FormBuilder
  ) { }

  obter(id: string): Observable<Role> {
    return this._http.get<Role>(`${this._api}/obter/${id}`).pipe(take(1));
  }

  adicionar(model: Role): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar`, model).pipe(take(1));
  }

  atualizar(model: Role): Observable<NotificationResult> {
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

  obterTabela(tableFilter: TableFilter): Observable<TableResult<RoleTable>> {
    return this._http.post<TableResult<RoleTable>>(`${this._api}/obter-tabela`, tableFilter).pipe(take(1));
  }

  adicionarAutorizacoes(model: RoleClaim): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar-autorizacoes`, model).pipe(take(1));
  }

  obterAutorizacoes(id: string): Observable<RoleClaim> {
    return this._http.get<RoleClaim>(`${this._api}/obter-autorizacoes/${id}`).pipe(take(1));
  }

  obterMenusAutorizados(id: string): Observable<MenuClaim[]> {
    return this._http.get<MenuClaim[]>(`${this._api}/obter-menus-autorizados/${id}`).pipe(take(1));
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
      concurrencyStamp: [null],
      name: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.PapelNomeDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.PapelNomeDeveTerUmTamanhoMaximo)
      ]],
      description: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.PapelDescricaoDeveSerPreenchido),
        StringContract.hasMaxLength(900, ValidationMessages.PapelDescricaoDeveTerUmTamanhoMaximo)
      ]]
    });
  }

  obterFormularioAutorizacao(): FormGroup {
    return this._builder.group({
      id: [null],
      concurrencyStamp: [null],
      name: [null],
      menus: this._builder.array([])
    });
  }

  obterFormularioMenu(): FormGroup {
    return this._builder.group({
      id: [null],
      description: [null],
      enabled: [null],
      code: [null],
      items: this._builder.array([])
    });
  }

  obterFormularioItem(): FormGroup {
    return this._builder.group({
      id: [null],
      description: [null],
      enabled: [null],
      code: [null],
      accesses: this._builder.array([])
    });
  }

  obterFormularioAcesso(): FormGroup {
    return this._builder.group({
      id: [null],
      description: [null],
      enabled: [null],
      code: [null]
    });
  }

}
