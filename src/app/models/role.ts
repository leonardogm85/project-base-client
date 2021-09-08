export interface Role {
  id: string;
  active: boolean;
  concurrencyStamp: string;
  name: string;
  description: string;
}
