import { MenuClaim } from './menu-claim';

export interface UserClaim {
  id: string;
  concurrencyStamp: string;
  name: string;
  menus: MenuClaim[];
}
