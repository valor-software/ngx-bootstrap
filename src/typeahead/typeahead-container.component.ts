import {
  Component, ElementRef, TemplateRef, ViewEncapsulation, HostListener
} from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { latinize } from './typeahead-utils';

@Component({
  selector: 'typeahead-container',
  // tslint:disable-next-line
  template: `
<!-- inject options list template -->
<template [ngTemplateOutlet]="optionsListTemplate || (isBs4 ? bs4Template : bs3Template)"
  [ngOutletContext]="{matches:matches, itemTemplate:itemTemplate, query:query}"></template>

<!-- default options item template -->
<template #bsItemTemplate let-match="match" let-query="query"><span [innerHtml]="hightlight(match, query)"></span></template>

<!-- Bootstrap 3 options list template -->
<template #bs3Template>
<ul class="dropdown-menu">
  <template ngFor let-match let-i="index" [ngForOf]="matches">
    <li *ngIf="match.isHeader()" class="dropdown-header">{{match}}</li>
    <li *ngIf="!match.isHeader()" [class.active]="isActive(match)" (mouseenter)="selectActive(match)">
      <a href="#" (click)="selectMatch(match, $event)" tabindex="-1">
        <template [ngTemplateOutlet]="itemTemplate || bsItemTemplate" 
          [ngOutletContext]="{item:match.item, index:i, match:match, query:query}"></template>
      </a>
    </li>
  </template>
</ul>
</template>

<!-- Bootstrap 4 options list template -->
<template #bs4Template >
<template ngFor let-match let-i="index" [ngForOf]="matches">
   <h6 *ngIf="match.isHeader()" class="dropdown-header">{{match}}</h6>
   <template [ngIf]="!match.isHeader()">
      <button
        class="dropdown-item"
        (click)="selectMatch(match, $event)"
        (mouseenter)="selectActive(match)"
        [class.active]="isActive(match)">
          <template [ngTemplateOutlet]="itemTemplate || bsItemTemplate" 
            [ngOutletContext]="{item:match.item, index:i, match:match, query:query}"></template>
      </button>
  </template>
</template>
</template>
`,
  // tslint:disable
  host: {
    'class': 'dropdown open',
    '[class.dropdown-menu]':'isBs4',
    style: 'position: absolute;display: block;'
  },
  // tslint: enable
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainerComponent {
  public parent: TypeaheadDirective;
  public query: any;
  public element: ElementRef;
  public isFocused: boolean = false;
  public top: string;
  public left: string;
  public display: string;
  public placement: string;
  public focusFirst: boolean = true;

  public get isBs4():boolean {
    return !isBs3();
  }

  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  public constructor(element: ElementRef) {
    this.element = element;
  }

  public get active(): TypeaheadMatch {
    return this._active;
  }

  public get matches(): TypeaheadMatch[] {
    return this._matches;
  }

  public set matches(value: TypeaheadMatch[]) {
    this._active=null;
    this._matches = value;

    if (this._matches.length > 0 && this.focusFirst) {
      this._active = this._matches[0];
      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }
  }

  public get optionsListTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.optionsListTemplate : undefined;
  }

  public get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  public selectActiveMatch(): void {
    if(this._active){
      this.selectMatch(this._active);
    }
  }

  public prevActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0
      ? this.matches.length - 1
      : index - 1];
    if (this._active.isHeader()) {
      this.prevActiveMatch();
    }

  }

  public nextActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1
      ? 0
      : index + 1];
    if (this._active.isHeader()) {
      this.nextActiveMatch();
    }
  }

  public selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  public hightlight(match: TypeaheadMatch, query: any): string {
    let itemStr: string = match.value;
    let itemStrHelper: string = (this.parent && this.parent.typeaheadLatinize
      ? latinize(itemStr)
      : itemStr).toLowerCase();
    let startIdx: number;
    let tokenLen: number;
    // Replaces the capture string with the same string inside of a "strong" tag
    if (typeof query === 'object') {
      let queryLen: number = query.length;
      for (let i = 0; i < queryLen; i += 1) {
        // query[i] is already latinized and lower case
        startIdx = itemStrHelper.indexOf(query[i]);
        tokenLen = query[i].length;
        if (startIdx >= 0 && tokenLen > 0) {
          itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
          itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
        }
      }
    } else if (query) {
      // query is already latinized and lower case
      startIdx = itemStrHelper.indexOf(query);
      tokenLen = query.length;
      if (startIdx >= 0 && tokenLen > 0) {
        itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
      }
    }
    return itemStr;
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  public focusLost(): void {
    this.isFocused = false;
  }

  public isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  public selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.parent.changeModel(value);
    setTimeout(() =>
      this.parent.typeaheadOnSelect.emit(value), 0
    );
    return false;
  }
}
