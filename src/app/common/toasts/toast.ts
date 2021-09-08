import { ToastType } from './toast-type.enum';

export interface Toast {
  message: string;
  type: ToastType;
}
