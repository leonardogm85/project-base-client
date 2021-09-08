import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContaService } from 'src/app/services/conta.service';
import { ToastService } from 'src/app/services/toast.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { MaskTypes } from 'src/app/common/mask/mask-types';
import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-atualizar-conta',
  templateUrl: './atualizar-conta.component.html',
  styleUrls: ['./atualizar-conta.component.css']
})
export class AtualizarContaComponent implements OnInit {

  iconUpdate: IconDefinition = faPencilAlt;
  iconSave: IconDefinition = faSave;

  form: FormGroup;
  notificationResult: NotificationResult;

  maskPhoneNumber: string = MaskTypes.phoneNumber;

  constructor(
    private _contaService: ContaService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._contaService.obterFormularioAtualizarConta();
    this.patchValue();
  }

  onInputPhoneNumber(): void {
    const value = this.form.get('phoneNumber').value;

    this.maskPhoneNumber = ObjectValidation.isNullOrUndefined(value) ?
      StringValidation.empty :
      (StringValidation.onlyNumbers(value).length === 11 ? MaskTypes.mobileNumber : MaskTypes.phoneNumber);
  }

  patchValue(): void {
    this._contaService.obterContaUsuarioAutenticado().subscribe(m => {
      this.form.patchValue(m);
      this.onInputPhoneNumber();
    });
  }

  onSubmit(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this._spinnerService.show();
      this._contaService.atualizarContaUsuarioAutenticado(this.form.value).pipe(
        finalize(() => this._spinnerService.hide())
      ).subscribe(n => {
        if (n.valid) {
          this.patchValue();
          this._toastService.success(ValidationMessages.registroAtualizado);
        } else {
          this.notificationResult = n;
          this._toastService.error(ValidationMessages.falhouAoExecutarComando);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
