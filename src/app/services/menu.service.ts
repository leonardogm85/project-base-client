import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AccessMenu } from '../models/access-menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly _api: string = `${environment.apiBase}/menus`;

  constructor(private _http: HttpClient) { }

  obterMenusUsuarioAutenticado(): Observable<AccessMenu[]> {
    return this._http.get<AccessMenu[]>(`${this._api}/obter-menus-usuario-autenticado`).pipe(take(1));
  }

}
