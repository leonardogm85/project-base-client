import { AccessItem } from './access-item';

export interface AccessMenu {
  id: number;
  description: string;
  order: number;
  items: AccessItem[];
  code?: string;
}
