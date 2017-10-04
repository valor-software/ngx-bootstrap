import { Component, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { isBs3 } from '../utils/theme-provider';
import { TypeaheadMatch } from './typeahead-match.class';
import { latinize } from './typeahead-utils';
import { TypeaheadDirective } from './typeahead.directive';

@Component({
  selector: 'typeahead-container',
  // tslint:disable-next-line
  templateUrl: './typeahead-container.component.html',
  host: {
    class: 'dropdown open',
    '[class.dropdown-menu]': 'isBs4',
    '[class.dropup]': 'dropup',
    style: 'position: absolute;display: block;'
  }
})
export class TypeaheadContainerComponent {
  parent: TypeaheadDirective;
  query: any;
  element: ElementRef;
  isFocused = false;
  top: string;
  left: string;
  display: string;
  placement: string;
  dropup: boolean;

  get isBs4(): boolean {
    return !isBs3();
  }

  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  constructor(element: ElementRef) {
    this.element = element;
  }

  get active(): TypeaheadMatch {
    return this._active;
  }

  get matches(): TypeaheadMatch[] {
    return this._matches;
  }

  set matches(value: TypeaheadMatch[]) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }
  }

  get optionsListTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.optionsListTemplate : undefined;
  }

  get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  selectActiveMatch(): void {
    this.selectMatch(this._active);
  }

  prevActiveMatch(): void {
    const index = this.matches.indexOf(this._active);
    this._active = this.matches[
      index - 1 < 0 ? this.matches.length - 1 : index - 1
      ];
    if (this._active.isHeader()) {
      this.prevActiveMatch();
    }
  }

  nextActiveMatch(): void {
    const index = this.matches.indexOf(this._active);
    this._active = this.matches[
      index + 1 > this.matches.length - 1 ? 0 : index + 1
      ];
    if (this._active.isHeader()) {
      this.nextActiveMatch();
    }
  }

  selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  hightlight(match: TypeaheadMatch, query: any): string {
    let itemStr: string = match.value;
    let itemStrHelper: string = (this.parent && this.parent.typeaheadLatinize
      ? latinize(itemStr)
      : itemStr).toLowerCase();
    let startIdx: number;
    let tokenLen: number;
    // Replaces the capture string with the same string inside of a "strong" tag
    if (typeof query === 'object') {
      const queryLen: number = query.length;
      for (let i = 0; i < queryLen; i += 1) {
        // query[i] is already latinized and lower case
        startIdx = itemStrHelper.indexOf(query[i]);
        tokenLen = query[i].length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr =
            `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
            `${itemStr.substring(startIdx + tokenLen)}`;
          itemStrHelper =
            `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
            `${itemStrHelper.substring(startIdx + tokenLen)}`;
        }
      }
    } else if (query) {
      // query is already latinized and lower case
      startIdx = itemStrHelper.indexOf(query);
      tokenLen = query.length;
      if (startIdx >= 0 && tokenLen > 0) {
        itemStr =
          `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
          `${itemStr.substring(startIdx + tokenLen)}`;
      }
    }

    return itemStr;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  focusLost(): void {
    this.isFocused = false;
  }

  isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    setTimeout(() => this.parent.typeaheadOnSelect.emit(value), 0);

    return false;
  }
}
