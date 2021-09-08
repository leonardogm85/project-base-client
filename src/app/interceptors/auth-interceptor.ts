import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _injetor: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (req.url.indexOf(environment.apiBase) !== -1) {
      const authService = this._injetor.get(AuthService);

      if (authService.isAuthenticated()) {
        request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.getAuthenticatedUserToken()}`
          }
        });
      }
    }

    return next.handle(request).pipe(
      retry(1)
    );
  }

}
