import { MenuClaim } from './menu-claim';

export interface RoleClaim {
  id: string;
  concurrencyStamp: string;
  name: string;
  menus: MenuClaim[];
}
