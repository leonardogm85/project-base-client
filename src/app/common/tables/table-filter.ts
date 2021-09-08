import { TableSort } from './table-sort';
import { TableSearch } from './table-search';

export interface TableFilter {
  start: number;
  length: number;
  sort?: TableSort;
  searches?: TableSearch[];
}
