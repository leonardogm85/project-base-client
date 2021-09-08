import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Item } from '../models/item.enum';
import { Access } from '../models/access.enum';
import { ClaimTypes } from '../common/security/claim-types';
import { StringValidation } from '../common/validations/helpers/string-validation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _keyAuthenticatedUserToken: string = 'AuthenticatedUserToken';

  private _authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  private _decodedToken: any;

  addAuthenticatedUserToken(token: string): void {
    localStorage.setItem(this._keyAuthenticatedUserToken, token);
    this._authenticated$.next(true);
  }
  removeAuthenticatedUserToken(): void {
    localStorage.removeItem(this._keyAuthenticatedUserToken);
    this._authenticated$.next(false);
  }

  getAuthenticatedUserToken(): string {
    return localStorage.getItem(this._keyAuthenticatedUserToken);
  }

  isAuthenticated(): boolean {
    return StringValidation.isntNullOrWhiteSpace(this.getAuthenticatedUserToken());
  }

  getDecodedToken(): any {
    return this._decodedToken;
  }

  getUserId(): string {
    return this.isAuthenticated() ? this.getDecodedToken()[ClaimTypes.userId] : StringValidation.empty;
  }
  getUserName(): string {
    return this.isAuthenticated() ? this.getDecodedToken()[ClaimTypes.userName] : StringValidation.empty;
  }
  getUserEmail(): string {
    return this.isAuthenticated() ? this.getDecodedToken()[ClaimTypes.userEmail] : StringValidation.empty;
  }
  isUserAdministrator(): boolean {
    return this.isAuthenticated() ? this.getDecodedToken()[ClaimTypes.userAdministrator].toLocaleLowerCase() === true.toString() : false;
  }

  hasClaim(item: Item, access: Access): boolean {
    if (this.isAuthenticated()) {
      const decodedToken = this.getDecodedToken();

      if (decodedToken.hasOwnProperty(item.toString())) {
        return [...decodedToken[item.toString()]].some(v => v === access.toString());
      }
    }

    return false;
  }

  isAuthorized(item: Item, access: Access): boolean {
    if (this.isAuthenticated()) {
      const decodedToken = this.getDecodedToken();

      if (decodedToken[ClaimTypes.userAdministrator].toLocaleLowerCase() === true.toString()) {
        return true;
      }

      if (decodedToken.hasOwnProperty(item.toString())) {
        return [...decodedToken[item.toString()]].some(v => v === access.toString());
      }
    }

    return false;
  }

  onAuthenticated(): Observable<boolean> {
    return this._authenticated$.pipe(
      distinctUntilChanged(),
      tap(() => this._decodedToken = new JwtHelperService().decodeToken(this.getAuthenticatedUserToken()))
    );
  }

}
