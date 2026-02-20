export interface TypeaheadDataset {
  /** Dataset name for grouping and identification */
  name: string;
  /** Data source for this dataset */
  source: any[] | Observable<any[]>;
  /** Field to display from objects in this dataset */
  displayField?: string;
  /** Field to use for searching in this dataset */
  searchField?: string;
  /** Maximum number of results from this dataset */
  limit?: number;
  /** Custom template for items in this dataset */
  itemTemplate?: any;
  /** Header text to show above results from this dataset */
  header?: string;
  /** Custom CSS class for items in this dataset */
  itemClass?: string;
}