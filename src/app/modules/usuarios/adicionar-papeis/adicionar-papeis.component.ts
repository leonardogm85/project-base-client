import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription, merge } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { UsuarioService } from 'src/app/services/usuario.service';
import { PapelService } from 'src/app/services/papel.service';
import { ToastService } from 'src/app/services/toast.service';
import { SelectService } from 'src/app/services/select.service';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-adicionar-papeis',
  templateUrl: './adicionar-papeis.component.html',
  styleUrls: ['./adicionar-papeis.component.css'],
  providers: [SelectService]
})
export class AdicionarPapeisComponent implements OnInit, OnDestroy {

  iconRole: IconDefinition = faBars;
  iconSave: IconDefinition = faSave;
  iconReturn: IconDefinition = faChevronLeft;

  form: FormGroup;
  notificationResult: NotificationResult;

  subscription: Subscription = new Subscription();

  get papelData(): KeyValue<string, string>[] {
    return this._papelSelectService.result.data;
  }
  get papelLoading(): boolean {
    return this._papelSelectService.loading;
  }

  constructor(
    private _usuarioService: UsuarioService,
    private _papelService: PapelService,
    private _toastService: ToastService,
    private _papelSelectService: SelectService,
    private _route: ActivatedRoute,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = this._usuarioService.obterFormularioPapel();
    this.patchValue();

    this.subscription.add(merge(
      this._papelSelectService.onLoad(i => this._papelService.obterSelecaoPorIdentidades(...i)),
      this._papelSelectService.onSelect(f => this._papelService.obterSelecao(f))
    ).subscribe(r => this._papelSelectService.setResult(r)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  patchValue(): void {
    this._usuarioService.obterPapeis(this._route.snapshot.paramMap.get('id')).subscribe(u => {
      this.form.patchValue(u);
      this._papelSelectService.loadEvent(...u.roles);
    });
  }

  getUserNameValue(): string {
    return this.form.get('name').value;
  }

  openPapel(): void {
    this._papelSelectService.openEvent();
  }
  scrollPapel(): void {
    this._papelSelectService.scrollEvent();
  }
  clearPapel(): void {
    this._papelSelectService.clearEvent();
  }
  searchPapel({ term }: { term: string }): void {
    this._papelSelectService.searchEvent(term);
  }
  closePapel(): void {
    this._papelSelectService.closeEvent();
  }

  onSave(): void {
    this.notificationResult = undefined;
    this._spinnerService.show();
    this._usuarioService.adicionarPapeis(this.form.value).pipe(
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
