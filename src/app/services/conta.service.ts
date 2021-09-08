import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SignIn } from '../models/sign-in';
import { UpdatePassword } from '../models/update-password';
import { Account } from '../models/account';
import { AuthService } from './auth.service';
import { LoginResult } from '../common/login/login-result';
import { NotificationResult } from '../common/validations/notifications/notification-result';
import { StringContract } from '../common/validations/contracts/string-contract';
import { ValidationMessages } from '../common/validations/constants/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly _api: string = `${environment.apiBase}/contas`;

  constructor(
    private _authService: AuthService,
    private _http: HttpClient,
    private _builder: FormBuilder
  ) { }

  login(model: SignIn): Observable<NotificationResult> {
    return this._http.post<LoginResult>(`${this._api}/login`, model).pipe(
      take(1),
      tap(r => {
        if (r.authenticated) {
          this._authService.addAuthenticatedUserToken(r.token);
        }
      }),
      map(r => {
        if (r.authenticated) {
          return { invalid: false, valid: true, notifications: [] };
        } else {
          return { invalid: true, valid: false, notifications: [{ message: r.message }] };
        }
      })
    );
  }

  logout(): void {
    this._authService.removeAuthenticatedUserToken();
  }

  obterContaUsuarioAutenticado(): Observable<Account> {
    return this._http.get<Account>(`${this._api}/obter-conta-usuario-autenticado`).pipe(take(1));
  }

  atualizarContaUsuarioAutenticado(model: Account): Observable<NotificationResult> {
    return this._http.put<NotificationResult>(`${this._api}/atualizar-conta-usuario-autenticado`, model).pipe(take(1));
  }

  atualizarSenhaUsuarioAutenticado(model: UpdatePassword): Observable<NotificationResult> {
    return this._http.put<NotificationResult>(`${this._api}/atualizar-senha-usuario-autenticado`, model).pipe(take(1));
  }

  obterFormularioLogin(): FormGroup {
    return this._builder.group({
      email: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaEmailDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.contaEmailDeveTerUmTamanhoMaximo),
        StringContract.isEmail(ValidationMessages.contaEmailDeveSerValido)
      ]],
      password: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaSenhaDeveSerPreenchido),
        StringContract.hasMaxLength(100, ValidationMessages.contaSenhaDeveTerUmTamanhoMaximo)
      ]],
      isPersistent: [false]
    });
  }

  obterFormularioAtualizarConta(): FormGroup {
    return this._builder.group({
      id: [null],
      concurrencyStamp: [null],
      name: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaNomeDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.contaNomeDeveTerUmTamanhoMaximo)
      ]],
      email: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaEmailDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.contaEmailDeveTerUmTamanhoMaximo),
        StringContract.isEmail(ValidationMessages.contaEmailDeveSerValido)
      ]],
      phoneNumber: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaTelefoneDeveSerPreenchido),
        StringContract.isPhone(ValidationMessages.contaTelefoneDeveSerValido)
      ]]
    });
  }

  obterFormularioAtualizarSenha(): FormGroup {
    return this._builder.group({
      oldPassword: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaSenhaAtualDeveSerPreenchido),
        StringContract.hasMinLength(6, ValidationMessages.contaSenhaAtualDeveTerUmTamanhoMinimo),
        StringContract.hasMaxLength(100, ValidationMessages.contaSenhaAtualDeveTerUmTamanhoMaximo)
      ]],
      newPassword: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaSenhaNovaDeveSerPreenchido),
        StringContract.hasMinLength(6, ValidationMessages.contaSenhaNovaDeveTerUmTamanhoMinimo),
        StringContract.hasMaxLength(100, ValidationMessages.contaSenhaNovaDeveTerUmTamanhoMaximo)
      ]],
      confirmNewPassword: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaSenhaNovaConfirmacaoDeveSerPreenchido),
        StringContract.areEquals('newPassword', ValidationMessages.contaSenhaNovaConfirmacaoDeveSerIgualSenha)
      ]]
    });
  }

}
