export interface LoginResult {
  authenticated: boolean;
  created: Date;
  expires: Date;
  token: string;
  message: string;
}
