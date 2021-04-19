export interface TypeaheadOrder {
  /** field for sorting */
  field?: string;
  /** ordering direction, could be 'asc' or 'desc' */
  direction: 'asc' | 'desc';
}
