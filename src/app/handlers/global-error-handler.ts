import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ContaService } from '../services/conta.service';
import { ObjectValidation } from '../common/validations/helpers/object-validation';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private _injector: Injector) { }

  handleError(error: any): void {
    const router = this._injector.get(Router);
    const zone = this._injector.get(NgZone);

    if (error instanceof HttpErrorResponse) {
      if (ObjectValidation.isNullOrUndefined(error.url) || error.url.indexOf(environment.apiBase) === -1) {
        zone.run(() => router.navigate(['/errors/failed']));
      } else {
        switch (error.status) {
          case 401:
            this._injector.get(ContaService).logout();
            zone.run(() => router.navigate(['/contas/entrar']));
            break;
          case 403:
            zone.run(() => router.navigate(['/errors/forbidden']));
            break;
          case 404:
            zone.run(() => router.navigate(['/errors/not-found']));
            break;
          default:
            zone.run(() => router.navigate(['/errors/failed']));
            break;
        }
      }
    } else {
      zone.run(() => router.navigate(['/errors/failed']));
    }

    console.error(error);
  }

}
