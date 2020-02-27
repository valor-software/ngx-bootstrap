import { TemplateRef } from '@angular/core';

import { TypeaheadMatch } from '../typeahead-match.class';

/**
 * A context for the `optionsListTemplate`
 * input template in case you want to override default one
 */
export interface TypeaheadOptionListContext {
  /** All matches */
  matches: TypeaheadMatch[];
  /** Item template */
  itemTemplate: TemplateRef<TypeaheadOptionItemContext>;
  /** Search query */
  query: string[] | string;
  /** Typeahead template methods */
  $implicit: TypeaheadTemplateMethods;
}

/**
 * A context for the `typeaheadItemTemplate`
 * input template in case you want to override default one
 */
export interface TypeaheadOptionItemContext {
  /** Item */
  item: any;
  /** Item index */
  index: number;
  /** Typeahead match */
  match: TypeaheadMatch;
  /** Search query */
  query: string[] | string;
}

/**
 * Methods for `optionsListTemplate` context
 */
export interface TypeaheadTemplateMethods {
  /** Function to select an option by click event */
  selectMatch(value: TypeaheadMatch, e?: Event): void;
  /** Function to select an option by mouseenter event */
  selectActive(value: TypeaheadMatch): void;
  /** Function to check if an option is active */
  isActive(value: TypeaheadMatch): boolean;
}
