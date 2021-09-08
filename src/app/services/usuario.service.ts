import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserTable } from '../models/user-table';
import { UserClaim } from '../models/user-claim';
import { MenuClaim } from '../models/menu-claim';
import { UserRole } from '../models/user-role';
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
export class UsuarioService {

  private readonly _api: string = `${environment.apiBase}/usuarios`;

  constructor(
    private _http: HttpClient,
    private _builder: FormBuilder
  ) { }

  obter(id: string): Observable<User> {
    return this._http.get<User>(`${this._api}/obter/${id}`).pipe(take(1));
  }

  adicionar(model: User): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar`, model).pipe(take(1));
  }

  atualizar(model: User): Observable<NotificationResult> {
    return this._http.put<NotificationResult>(`${this._api}/atualizar`, model).pipe(take(1));
  }

  ativar(id: string): Observable<NotificationResult> {
    return this._http.patch<NotificationResult>(`${this._api}/ativar/${id}`, {}).pipe(take(1));
  }

  desativar(id: string): Observable<NotificationResult> {
    return this._http.patch<NotificationResult>(`${this._api}/desativar/${id}`, {}).pipe(take(1));
  }

  obterTabela(tableFilter: TableFilter): Observable<TableResult<UserTable>> {
    return this._http.post<TableResult<UserTable>>(`${this._api}/obter-tabela`, tableFilter).pipe(take(1));
  }

  adicionarAutorizacoes(model: UserClaim): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar-autorizacoes`, model).pipe(take(1));
  }

  obterAutorizacoes(id: string): Observable<UserClaim> {
    return this._http.get<UserClaim>(`${this._api}/obter-autorizacoes/${id}`).pipe(take(1));
  }

  obterMenusAutorizados(id: string): Observable<MenuClaim[]> {
    return this._http.get<MenuClaim[]>(`${this._api}/obter-menus-autorizados/${id}`).pipe(take(1));
  }

  adicionarPapeis(model: UserRole): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar-papeis`, model).pipe(take(1));
  }

  obterPapeis(id: string): Observable<UserRole> {
    return this._http.get<UserRole>(`${this._api}/obter-papeis/${id}`).pipe(take(1));
  }

  obterNomePapeis(id: string): Observable<string[]> {
    return this._http.get<string[]>(`${this._api}/obter-nomes-papeis/${id}`).pipe(take(1));
  }

  obterSelecao(selectFilter: SelectFilter): Observable<SelectResult> {
    return this._http.post<SelectResult>(`${this._api}/obter-selecao`, selectFilter).pipe(take(1));
  }

  obterSelecaoPorIdentidades(...identidades: string[]): Observable<SelectResult> {
    return this._http.get<SelectResult>(`${this._api}/obter-selecao`, { params: new HttpParams({ fromObject: { identidades } }) }).pipe(take(1));
  }

  enviarTokenConfirmacaoPorEmail(id: string): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/enviar-token-confirmacao-por-email/${id}`, {}).pipe(take(1));
  }

  obterFormulario(): FormGroup {
    return this._builder.group({
      id: [null],
      concurrencyStamp: [null],
      name: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.usuarioNomeDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.usuarioNomeDeveTerUmTamanhoMaximo)
      ]],
      email: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.usuarioEmailDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.usuarioEmailDeveTerUmTamanhoMaximo),
        StringContract.isEmail(ValidationMessages.usuarioEmailDeveSerValido)
      ]],
      phoneNumber: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.usuarioTelefoneDeveSerPreenchido),
        StringContract.isPhone(ValidationMessages.usuarioTelefoneDeveSerValido)
      ]],
      password: [null, [
        StringContract.conditionalIsNullOrEmpty('id', [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.usuarioSenhaDeveSerPreenchido),
          StringContract.hasMinLength(6, ValidationMessages.usuarioSenhaDeveTerUmTamanhoMinimo),
          StringContract.hasMaxLength(100, ValidationMessages.usuarioSenhaDeveTerUmTamanhoMaximo)
        ])
      ]],
      confirmPassword: [null, [
        StringContract.conditionalIsNullOrEmpty('id', [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.usuarioSenhaConfirmacaoDeveSerPreenchido),
          StringContract.areEquals('password', ValidationMessages.usuarioSenhaConfirmacaoDeveSerIgualSenha)
        ])
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

  obterFormularioPapel(): FormGroup {
    return this._builder.group({
      id: [null],
      concurrencyStamp: [null],
      name: [null],
      roles: [null]
    });
  }

}
