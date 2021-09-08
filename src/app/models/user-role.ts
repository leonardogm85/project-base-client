export interface UserRole {
  id: string;
  concurrencyStamp: string;
  name: string;
  roles: string[];
}
