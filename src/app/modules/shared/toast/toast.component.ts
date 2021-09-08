import { Component } from '@angular/core';

import { ToastService } from 'src/app/services/toast.service';
import { Toast } from 'src/app/common/toasts/toast';
import { ToastType } from 'src/app/common/toasts/toast-type.enum';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { 'class': 'ngb-toasts' }
})
export class ToastComponent {

  autoHide: boolean = true;
  delay: number = 5000;

  constructor(private _toastService: ToastService) { }

  list(): Toast[] {
    return this._toastService.get();
  }

  remove(index: number): void {
    this._toastService.remove(index);
  }
  
  getClass(type: ToastType): string[] {
    switch (type) {
      case ToastType.Success:
        return ['bg-success', 'text-light'];
      case ToastType.Error:
        return ['bg-danger', 'text-light'];
      case ToastType.Warning:
        return ['bg-warning', 'text-dark'];
    }
  }

}
