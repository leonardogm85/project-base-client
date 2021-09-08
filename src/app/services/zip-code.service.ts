import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ZipCodeResult } from '../common/zip-code/zip-code-result';
import { ZipCodeValidation } from '../common/validations/helpers/zip-code-validation';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  private readonly _api: string = environment.apiZipCode;

  constructor(private _http: HttpClient) { }

  getByZipCode(zipCode: string): Observable<ZipCodeResult> {
    if (ZipCodeValidation.valid(zipCode)) {
      const withoutMask = ZipCodeValidation.removeMask(zipCode);
      return this._http.get<any>(`${this._api}/${withoutMask}/json`)
        .pipe(
          take(1),
          filter(z => !('erro' in z)),
          map(z => ({ zipCode: zipCode, street: z.logradouro, district: z.bairro, town: z.localidade, state: z.uf }))
        );
    }

    return empty();
  }

}
