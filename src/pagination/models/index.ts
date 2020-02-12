export interface ConfigModel {
  align?: boolean;
  boundaryLinks: boolean;
  directionLinks: boolean;
  firstText: string;
  itemsPerPage: number;
  lastText: string;
  maxSize: number;
  nextText: string;
  pageBtnClass: string;
  previousText: string;
  rotate: boolean;
}
/**
 * Contain information about the page
 */
export interface PagesModel {
  /** Text, which is displayed in the link */
  text: string;
  /** Page number */
  number: number;
  /** If `true`, then this is the current page */
  active: boolean;
}

export interface PagerModel {
  itemsPerPage: number;
  previousText: string;
  nextText: string;
  pageBtnClass: string;
  align: boolean;
}

/**
 * A context for the
 * * `customPageTemplate`
 * * `customNextTemplate`
 * * `customPreviousTemplate`
 * * `customFirstTemplate`
 * * `customLastTemplate`
 * inputs for link templates in case you want to override one
 */
export interface PaginationLinkContext {
  /** The currently selected page number */
  currentPage: number;
  /** If `true`, the current link is disabled */
  disabled: boolean;
}

/**
 * A context for the `pageTemplate` inputs for link template
 */
export interface PaginationNumberLinkContext extends PaginationLinkContext {
  /** Contain the page information */
  $implicit: PagesModel;
}
