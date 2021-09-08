import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faList, faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { PapelService } from 'src/app/services/papel.service';
import { ToastService } from 'src/app/services/toast.service';
import { Guid } from 'src/app/common/guid/guid';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ValidationMessages } from 'src/app/common/validations/constants/validation-messages';

@Component({
  selector: 'app-adicionar-autorizacoes',
  templateUrl: './adicionar-autorizacoes.component.html',
  styleUrls: ['./adicionar-autorizacoes.component.css']
})
export class AdicionarAutorizacoesComponent implements OnInit {

  iconAutorize: IconDefinition = faList;
  iconSave: IconDefinition = faSave;
  iconReturn: IconDefinition = faChevronLeft;

  form: FormGroup;
  notificationResult: NotificationResult;

  constructor(
    private _papelService: PapelService,
    private _toastService: ToastService,
    private _route: ActivatedRoute,
    private _spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this._papelService.obterFormularioAutorizacao();
    this.patchValue();
  }

  patchValue(): void {
    this._papelService.obterAutorizacoes(this._route.snapshot.paramMap.get('id')).subscribe(p => {
      this.form.patchValue({ id: p.id, concurrencyStamp: p.concurrencyStamp, name: p.name });
      const menus = (this.form.get('menus') as FormArray);
      menus.clear();

      p.menus.forEach(m => {
        const menu = this._papelService.obterFormularioMenu();
        const items = (menu.get('items') as FormArray);
        items.clear();
        let menuEnabled = true;

        m.items.forEach(i => {
          const item = this._papelService.obterFormularioItem();
          const accesses = (item.get('accesses') as FormArray);
          accesses.clear();
          let itemEnabled = true;

          i.accesses.forEach(a => {
            const access = this._papelService.obterFormularioAcesso();

            if (itemEnabled) {
              itemEnabled = a.enabled;
            }

            access.patchValue({ id: a.id, description: a.description, enabled: a.enabled, code: Guid.newGuid() });
            accesses.push(access);
          });

          if (menuEnabled) {
            menuEnabled = itemEnabled;
          }

          item.patchValue({ id: i.id, description: i.description, enabled: itemEnabled, code: Guid.newGuid() });
          items.push(item);
        });

        menu.patchValue({ id: m.id, description: m.description, enabled: menuEnabled, code: Guid.newGuid() });
        menus.push(menu);
      });
    });
  }

  getMenus(): AbstractControl[] {
    return (this.form.get('menus') as FormArray).controls;
  }
  getItems(menu: AbstractControl): AbstractControl[] {
    return (menu.get('items') as FormArray).controls;
  }
  getAccesses(item: AbstractControl): AbstractControl[] {
    return (item.get('accesses') as FormArray).controls;
  }

  getRoleNameValue(): string {
    return this.form.get('name').value;
  }
  getDescriptionValue(control: AbstractControl): string {
    return control.get('description').value;
  }
  getCodeValue(control: AbstractControl): string {
    return control.get('code').value;
  }

  getEnabledControl(control: AbstractControl): AbstractControl {
    return control.get('enabled');
  }

  onMenu(menu: AbstractControl): void {
    const enabled = this.getEnabledControl(menu).value;
    this.getItems(menu).forEach(i => {
      this.getAccesses(i).forEach(a => this.getEnabledControl(a).setValue(enabled));
      this.getEnabledControl(i).setValue(enabled);
    });
  }
  onItem(item: AbstractControl): void {
    const menu = item.parent.parent;
    const enabled = this.getEnabledControl(item).value;
    let menuEnabled = false;

    this.getAccesses(item).forEach(a => this.getEnabledControl(a).setValue(enabled));

    if (enabled) {
      menuEnabled = this.getItems(menu).every(i => this.getEnabledControl(i).value);
    }

    this.getEnabledControl(menu).setValue(menuEnabled);
  }
  onAccess(access: AbstractControl): void {
    const item = access.parent.parent;
    const menu = item.parent.parent;
    let itemEnabled = false;
    let menuEnabled = false;

    if (this.getEnabledControl(access).value) {
      itemEnabled = this.getAccesses(item).every(a => this.getEnabledControl(a).value);

      if (itemEnabled) {
        menuEnabled = this.getItems(menu).every(i => this.getEnabledControl(i).value || i === item);
      }
    }

    this.getEnabledControl(item).setValue(itemEnabled);
    this.getEnabledControl(menu).setValue(menuEnabled);
  }

  onSave(): void {
    this.notificationResult = undefined;
    this._spinnerService.show();
    this._papelService.adicionarAutorizacoes(this.form.value).pipe(
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
