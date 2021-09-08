import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { ClienteService } from 'src/app/services/cliente.service';
import { ToastService } from 'src/app/services/toast.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent implements OnInit {

  iconCreate: IconDefinition = faPlus;

  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _clienteService: ClienteService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._clienteService.obterFormulario();
  }

  onSubmit(): void {
    this._spinnerService.show();
    this._clienteService.adicionar(this.form.value).pipe(
      finalize(() => this._spinnerService.hide())
    ).subscribe(n => {
      if (n.valid) {
        this.form.reset();
        this._toastService.success(ValidationMessages.registroAdicionado);
      } else {
        this.notificationResult = n;
        this._toastService.error(ValidationMessages.falhouAoExecutarComando);
      }
    });
  }

}
