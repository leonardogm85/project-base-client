import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContaService } from 'src/app/services/conta.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  iconUser: IconDefinition = faUser;

  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _contaService: ContaService,
    private _router: Router,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._contaService.obterFormularioLogin();
  }

  onSubmit(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this._spinnerService.show();
      this._contaService.login(this.form.value).pipe(
        finalize(() => this._spinnerService.hide())
      ).subscribe(n => {
        if (n.valid) {
          this._router.navigate(['/home']);
        } else {
          this.notificationResult = n;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
