import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSave, faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { TipoPessoa } from 'src/app/models/tipo-pessoa.enum';
import { TipoPessoaService } from 'src/app/services/tipo-pessoa.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { ToastService } from 'src/app/services/toast.service';
import { ZipCodeResult } from 'src/app/common/zip-code/zip-code-result';
import { SelectResult } from 'src/app/common/selects/select-result';
import { MaskTypes } from 'src/app/common/mask/mask-types';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';
import { ZipCodeValidation } from 'src/app/common/validations/helpers/zip-code-validation';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() notificationResult: NotificationResult;

  @Output() protected save: EventEmitter<void> = new EventEmitter<void>();

  protected iconSave: IconDefinition = faSave;
  protected iconReturn: IconDefinition = faChevronLeft;
  protected iconSearch: IconDefinition = faSearch;

  protected selectResult: SelectResult;
  protected zipCodeResult: ZipCodeResult;

  protected maskCep: string = MaskTypes.zipCode;
  protected maskNumero: string = MaskTypes.integer;

  protected get maskDocumento(): string {
    switch (this.form.get('tipoPessoa').value) {
      case TipoPessoa.pessoaFisica:
        return MaskTypes.cpf;
      case TipoPessoa.pessoaJuridica:
        return MaskTypes.cnpj;
      default:
        return StringValidation.empty;
    }
  }
  protected get maskCelular(): string {
    return this.modifyPhoneMask(this.form.get('celular').value);
  }
  protected get maskTelefone(): string {
    return this.modifyPhoneMask(this.form.get('telefone').value);
  }

  constructor(
    private _tipoPessoaService: TipoPessoaService,
    private _zipCodeService: ZipCodeService,
    private _toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.selectResult = this._tipoPessoaService.obterSelecao();
  }

  protected modifyPhoneMask(value: string): string {
    return ObjectValidation.isNullOrUndefined(value) ?
      StringValidation.empty :
      (StringValidation.onlyNumbers(value).length === 11 ? MaskTypes.mobileNumber : MaskTypes.phoneNumber);
  }

  protected clearValueDocument(): void {
    this.form.get('documento').setValue(StringValidation.empty);
  }

  protected findAddressByZipCode(): void {
    this._spinnerService.show();
    this.zipCodeResult = undefined;
    this._zipCodeService.getByZipCode(this.form.get('endereco.cep').value).pipe(
      finalize(() => {
        if (ObjectValidation.isNullOrUndefined(this.zipCodeResult)) {
          this.form.get('endereco').reset({ cep: this.form.get('endereco.cep').value });
        } else {
          this.form.get('endereco').reset({
            cep: ZipCodeValidation.addMask(this.zipCodeResult.zipCode),
            logradouro: this.zipCodeResult.street,
            bairro: this.zipCodeResult.district,
            cidade: this.zipCodeResult.town,
            estado: this.zipCodeResult.state
          });
        }

        this._spinnerService.hide();
      })
    ).subscribe(z => this.zipCodeResult = z, () => this._toastService.error(ValidationMessages.falhouAoExecutarComando));
  }

  protected onSave(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this.save.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
