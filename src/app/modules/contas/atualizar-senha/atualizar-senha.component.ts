import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContaService } from 'src/app/services/conta.service';
import { ToastService } from 'src/app/services/toast.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-atualizar-senha',
  templateUrl: './atualizar-senha.component.html',
  styleUrls: ['./atualizar-senha.component.css']
})
export class AtualizarSenhaComponent implements OnInit {

  iconUpdate: IconDefinition = faPencilAlt;
  iconSave: IconDefinition = faSave;

  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _contaService: ContaService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._contaService.obterFormularioAtualizarSenha();
  }

  onSubmit(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this._spinnerService.show();
      this._contaService.atualizarSenhaUsuarioAutenticado(this.form.value).pipe(
        finalize(() => this._spinnerService.hide())
      ).subscribe(n => {
        if (n.valid) {
          this.form.reset();
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
