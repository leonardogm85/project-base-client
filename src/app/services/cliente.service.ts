import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { ClienteTable } from '../models/cliente-table';
import { TableFilter } from '../common/tables/table-filter';
import { TableResult } from '../common/tables/table-result';
import { SelectFilter } from '../common/selects/select-filter';
import { SelectResult } from '../common/selects/select-result';
import { NotificationResult } from '../common/validations/notifications/notification-result';
import { StringContract } from '../common/validations/contracts/string-contract';
import { NumberContract } from '../common/validations/contracts/number-contract';
import { ValidationMessages } from '../common/validations/constants/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly _api: string = `${environment.apiBase}/clientes`;

  constructor(
    private _http: HttpClient,
    private _builder: FormBuilder
  ) { }

  obter(id: string): Observable<Cliente> {
    return this._http.get<Cliente>(`${this._api}/obter/${id}`).pipe(take(1));
  }

  adicionar(model: Cliente): Observable<NotificationResult> {
    return this._http.post<NotificationResult>(`${this._api}/adicionar`, model).pipe(take(1));
  }

  atualizar(model: Cliente): Observable<NotificationResult> {
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

  obterTabela(tableFilter: TableFilter): Observable<TableResult<ClienteTable>> {
    return this._http.post<TableResult<ClienteTable>>(`${this._api}/obter-tabela`, tableFilter).pipe(take(1));
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
      tipoPessoa: [null, [
        StringContract.isntNullOrEmpty(ValidationMessages.pessoaTipoPessoaDeveSerPreenchido)
      ]],
      apelido: [null, [
        StringContract.hasMaxLength(250, ValidationMessages.pessoaApelidoDeveTerUmTamanhoMaximo)
      ]],
      nome: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.pessoaNomeDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.pessoaNomeDeveTerUmTamanhoMaximo)
      ]],
      documento: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.pessoaDocumentoDeveSerPreenchido),
        StringContract.isDocument(ValidationMessages.pessoaDocumentoDeveSerValido)
      ]],
      email: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.pessoaEmailDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.pessoaEmailDeveTerUmTamanhoMaximo),
        StringContract.isEmail(ValidationMessages.pessoaEmailDeveSerValido)
      ]],
      celular: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.pessoaCelularDeveSerPreenchido),
        StringContract.isPhone(ValidationMessages.pessoaCelularDeveSerValido)
      ]],
      telefone: [null, [
        StringContract.isPhone(ValidationMessages.pessoaTelefoneDeveSerValido)
      ]],
      endereco: this._builder.group({
        cep: [null, [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.enderecoCepDeveSerPreenchido),
          StringContract.isZipCode(ValidationMessages.enderecoCepDeveSerValido)
        ]],
        logradouro: [null, [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.enderecoLogradouroDeveSerPreenchido),
          StringContract.hasMaxLength(100, ValidationMessages.enderecoLogradouroDeveTerUmTamanhoMaximo)
        ]],
        numero: [null, [
          StringContract.isntNullOrEmpty(ValidationMessages.enderecoNumeroDeveSerPreenchido),
          NumberContract.isGreaterThan(0, ValidationMessages.enderecoNumeroDeveTerUmTamanhoMinimo),
          NumberContract.isLowerOrEqualsThan(999999999, ValidationMessages.enderecoNumeroDeveTerUmTamanhoMaximo)
        ]],
        complemento: [null, [
          StringContract.hasMaxLength(50, ValidationMessages.enderecoComplementoDeveTerUmTamanhoMaximo)
        ]],
        bairro: [null, [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.enderecoBairroDeveSerPreenchido),
          StringContract.hasMaxLength(100, ValidationMessages.enderecoBairroDeveTerUmTamanhoMaximo)
        ]],
        cidade: [null, [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.enderecoCidadeDeveSerPreenchido),
          StringContract.hasMaxLength(100, ValidationMessages.enderecoCidadeDeveTerUmTamanhoMaximo)
        ]],
        estado: [null, [
          StringContract.isntNullOrWhiteSpace(ValidationMessages.enderecoEstadoDeveSerPreenchido),
          StringContract.hasLength(2, ValidationMessages.enderecoEstadoDeveTerUmTamanhoExato)
        ]]
      })
    });
  }

}
