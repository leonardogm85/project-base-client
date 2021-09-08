export interface TableResult<T> {
  recordsTotal: number;
  recordsFiltered: number;
  data: T[];
}
