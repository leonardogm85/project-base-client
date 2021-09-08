import { Component, Input, Output, EventEmitter, Inject, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Subscription, merge } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Produto } from 'src/app/models/produto';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { SelectService } from 'src/app/services/select.service';
import { MaskTypes } from 'src/app/common/mask/mask-types';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';

const provideSelectService = { unidadeMedida: 'unidadeMedida', fornecedor: 'fornecedor' };

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [
    { provide: provideSelectService.unidadeMedida, useClass: SelectService },
    { provide: provideSelectService.fornecedor, useClass: SelectService }
  ]
})
export class FormularioComponent implements OnInit, OnChanges, OnDestroy {

  @Input() model: Produto;
  @Input() form: FormGroup;
  @Input() notificationResult: NotificationResult;

  @Output() protected save: EventEmitter<void> = new EventEmitter<void>();

  protected subscription: Subscription = new Subscription();

  protected iconSave: IconDefinition = faSave;
  protected iconReturn: IconDefinition = faChevronLeft;

  protected maskValor: string = MaskTypes.decimal;

  protected get unidadeMedidaData(): KeyValue<string, string>[] {
    return this._unidadeMedidaSelectService.result.data;
  }
  protected get unidadeMedidaLoading(): boolean {
    return this._unidadeMedidaSelectService.loading;
  }

  protected get fornecedorData(): KeyValue<string, string>[] {
    return this._fornecedorSelectService.result.data;
  }
  protected get fornecedorLoading(): boolean {
    return this._fornecedorSelectService.loading;
  }

  constructor(
    private _unidadeMedidaService: UnidadeMedidaService,
    private _fornecedorService: FornecedorService,
    @Inject(provideSelectService.unidadeMedida) private _unidadeMedidaSelectService: SelectService,
    @Inject(provideSelectService.fornecedor) private _fornecedorSelectService: SelectService
  ) { }

  ngOnInit(): void {
    this.subscription.add(merge(
      this._unidadeMedidaSelectService.onLoad(i => this._unidadeMedidaService.obterSelecaoPorIdentidades(i)),
      this._unidadeMedidaSelectService.onSelect(f => this._unidadeMedidaService.obterSelecao(f))
    ).subscribe(r => this._unidadeMedidaSelectService.setResult(r)));

    this.subscription.add(merge(
      this._fornecedorSelectService.onLoad(i => this._fornecedorService.obterSelecaoPorIdentidades(i)),
      this._fornecedorSelectService.onSelect(f => this._fornecedorService.obterSelecao(f))
    ).subscribe(r => this._fornecedorSelectService.setResult(r)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changeModel = changes['model'];

    if (ObjectValidation.isntNullOrUndefined(changeModel) && ObjectValidation.isntNullOrUndefined(changeModel.currentValue)) {
      const currentModel = changeModel.currentValue as Produto;

      this._unidadeMedidaSelectService.loadEvent(currentModel.unidadeMedidaId);
      this._fornecedorSelectService.loadEvent(currentModel.fornecedorId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected openUnidadeMedida(): void {
    this._unidadeMedidaSelectService.openEvent();
  }
  protected scrollUnidadeMedida(): void {
    this._unidadeMedidaSelectService.scrollEvent();
  }
  protected clearUnidadeMedida(): void {
    this._unidadeMedidaSelectService.clearEvent();
  }
  protected searchUnidadeMedida({ term }: { term: string }): void {
    this._unidadeMedidaSelectService.searchEvent(term);
  }
  protected closeUnidadeMedida(): void {
    this._unidadeMedidaSelectService.closeEvent();
  }

  protected openFornecedor(): void {
    this._fornecedorSelectService.openEvent();
  }
  protected scrollFornecedor(): void {
    this._fornecedorSelectService.scrollEvent();
  }
  protected clearFornecedor(): void {
    this._fornecedorSelectService.clearEvent();
  }
  protected searchFornecedor({ term }: { term: string }): void {
    this._fornecedorSelectService.searchEvent(term);
  }
  protected closeFornecedor(): void {
    this._fornecedorSelectService.closeEvent();
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
