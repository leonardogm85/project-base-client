import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { ContaService } from 'src/app/services/conta.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { StringContract } from 'src/app/common/validations/contracts/string-contract';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  iconUser: IconDefinition = faUser;

  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _contaService: ContaService,
    private _builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._builder.group({
      email: [null, [
        StringContract.isntNullOrWhiteSpace(ValidationMessages.contaEmailDeveSerPreenchido),
        StringContract.hasMaxLength(250, ValidationMessages.contaEmailDeveTerUmTamanhoMaximo),
        StringContract.isEmail(ValidationMessages.contaEmailDeveSerValido)
      ]]
    });
  }

  onSubmit(): void {
  }

}
