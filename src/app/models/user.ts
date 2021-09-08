export interface User {
  id: string;
  active: boolean;
  concurrencyStamp: string;
  name: string;
  email: string;
  phoneNumber: string;
  administrator: boolean;
  password: string;
}
