import { ItemClaim } from './item-claim';

export interface MenuClaim {
  id: number;
  description: string;
  items: ItemClaim[];
}
