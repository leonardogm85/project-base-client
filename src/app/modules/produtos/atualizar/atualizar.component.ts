import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ToastService } from 'src/app/services/toast.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

  iconUpdate: IconDefinition = faPencilAlt;

  model: Produto;
  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _produtoService: ProdutoService,
    private _toastService: ToastService,
    private _route: ActivatedRoute,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._produtoService.obterFormulario();
    this.patchValue();
  }

  patchValue(): void {
    this._produtoService.obter(this._route.snapshot.paramMap.get('id')).subscribe(m => this.form.patchValue(this.model = m));
  }

  onSubmit(): void {
    this._spinnerService.show();
    this._produtoService.atualizar(this.form.value).pipe(
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
  }

}
