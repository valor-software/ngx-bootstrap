import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  Renderer2
} from '@angular/core';

import { isBs3, Utils } from '../utils';
import { latinize } from './typeahead-utils';
import { TypeaheadMatch } from './typeahead-match.class';
import { TypeaheadDirective } from './typeahead.directive';

@Component({
  selector: 'typeahead-container',
  // tslint:disable-next-line
  templateUrl: './typeahead-container.component.html',
  host: {
    class: 'dropdown open',
    '[class.dropdown-menu]': 'isBs4',
    '[style.overflow-y]' : `isBs4 && needScrollbar ? 'scroll': 'visible'`,
    '[style.height]': `isBs4 && needScrollbar ? guiHeight: 'auto'`,
    '[style.visibility]': `typeaheadScrollable ? 'hidden' : 'visible'`,
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
  guiHeight: string;
  needScrollbar: boolean;

  get isBs4(): boolean {
    return !isBs3();
  }

  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  @ViewChild('ulElement')
  private ulElement: ElementRef;

  @ViewChildren('liElements')
  private liElements: QueryList<ElementRef>;

  constructor(element: ElementRef, private renderer: Renderer2) {
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
    this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
    if (this.typeaheadScrollable) {
      setTimeout(() => {
        this.setScrollableMode();
      });
    }

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

  get typeaheadScrollable(): boolean {
    return this.parent ? this.parent.typeaheadScrollable : false;
  }


  get typeaheadOptionsInScrollableView(): number {
    return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
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
    if (this.typeaheadScrollable) {
      this.scrollPrevious(index);
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
    if (this.typeaheadScrollable) {
      this.scrollNext(index);
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

  setScrollableMode(): void {
    if (!this.ulElement) {
      this.ulElement = this.element;
    }
    if (this.liElements.first) {
      const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
      const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
      const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '').replace('px', ''));
      const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0').replace('px', ''));
      const optionHeight = parseFloat((liStyles['height'] ? liStyles['height'] : '0').replace('px', ''));
      const height = this.typeaheadOptionsInScrollableView * optionHeight;
      this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
    }
    this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
  }

  scrollPrevious(index: number): void {
    if (index === 0) {
      this.scrollToBottom();

      return;
    }
    if (this.liElements) {
      const liElement = this.liElements.toArray()[index - 1];
      if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
        this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
      }
    }
  }

  scrollNext(index: number): void {
    if (index + 1 > this.matches.length - 1) {
      this.scrollToTop();

      return;
    }
    if (this.liElements) {
      const liElement = this.liElements.toArray()[index + 1];
      if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
        this.ulElement.nativeElement.scrollTop =
          liElement.nativeElement.offsetTop -
          this.ulElement.nativeElement.offsetHeight +
          liElement.nativeElement.offsetHeight;
      }
    }
  }


  private isScrolledIntoView = function (elem: HTMLElement) {
    const containerViewTop = this.ulElement.nativeElement.scrollTop;
    const containerViewBottom = containerViewTop + this.ulElement.nativeElement.offsetHeight;
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;

    return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
  };

  private scrollToBottom(): void {
    this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
  }

  private scrollToTop(): void {
    this.ulElement.nativeElement.scrollTop = 0;
  }
}
