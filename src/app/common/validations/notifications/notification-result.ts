import { Notification } from './notification';

export interface NotificationResult {
  notifications: Notification[];
  valid: boolean;
  invalid: boolean;
}
