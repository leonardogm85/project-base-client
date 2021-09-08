import { AccessClaim } from './access-claim';

export interface ItemClaim {
  id: number;
  description: string;
  accesses: AccessClaim[];
}
