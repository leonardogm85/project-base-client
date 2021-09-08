import { SortDirection } from './sort-direction.enum';

export interface TableSort {
  column: string;
  direction: SortDirection;
}
