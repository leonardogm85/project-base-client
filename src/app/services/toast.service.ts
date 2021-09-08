import { Injectable } from '@angular/core';

import { Toast } from '../common/toasts/toast';
import { ToastType } from '../common/toasts/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _toasts: Toast[] = [];

  success(message: string): void {
    this.add({ message: message, type: ToastType.Success });
  }
  error(message: string): void {
    this.add({ message: message, type: ToastType.Error });
  }
  warning(message: string): void {
    this.add({ message: message, type: ToastType.Warning });
  }

  get(): Toast[] {
    return this._toasts.slice();
  }
  add(toast: Toast): void {
    this._toasts.push(toast);
  }
  remove(index: number): void {
    this._toasts.splice(index, 1);
  }

}
