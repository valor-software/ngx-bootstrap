import { Component, ElementRef, TemplateRef, ViewEncapsulation, ViewChildren, QueryList, ViewChild, Renderer, AfterViewInit } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';
import { positionService } from '../position';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadUtils } from './typeahead-utils';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';

const bs4 = `
  <div ref-ulElement class="dropdown-menu"
       [ngStyle]="{top: top, left: left, display: 'block', 'width': 'auto', 'overflow-x': 'hidden'}"
       (mouseleave)="focusLost()">
    <template ngFor let-match let-i="index" [ngForOf]="matches">
       <h6 ref-liElement *ngIf="match.isHeader()" class="dropdown-header">{{match}}</h6>
       <div ref-liElement *ngIf="!match.isHeader() && !itemTemplate">
          <a href="#"
            class="dropdown-item"
            (click)="selectMatch(match, $event)"
            (mouseenter)="selectActive(match)"
            [class.active]="isActive(match)"
            [innerHtml]="hightlight(match, query)"></a>
      </div>
      <div ref-liElement *ngIf="!match.isHeader() && itemTemplate">
        <a href="#"
         class="dropdown-item"
         (click)="selectMatch(match, $event)"
         (mouseenter)="selectActive(match)"
         [class.active]="isActive(match)">
          <template [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{item: match.item, index: i}">
          </template>
         </a>
      </div>
    </template>
  </div>
`;

const bs3 = `
  <ul ref-ulElement class="dropdown-menu"
      [ngStyle]="{top: top, left: left, display: 'block', 'width': 'auto', 'overflow-x': 'hidden'}"
      (mouseleave)="focusLost()">
    <template ngFor let-match let-i="index" [ngForOf]="matches">
      <li ref-liElement *ngIf="match.isHeader()" class="dropdown-header">{{match}}</li>
      <li ref-liElement *ngIf="!match.isHeader()"
        [class.active]="isActive(match)"
        (mouseenter)="selectActive(match)">
        <a href="#"
           *ngIf="!itemTemplate"
           (click)="selectMatch(match, $event)"
           tabindex="-1"
           [innerHtml]="hightlight(match, query)"></a>
        <a href="#"
           *ngIf="itemTemplate"
           (click)="selectMatch(match, $event)"
           tabindex="-1">
            <template [ngTemplateOutlet]="itemTemplate"
                      [ngOutletContext]="{item: match.item, index: i}">
            </template>
        </a>
      </li>
    </template>
  </ul>
`;
let isBS4 = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS4;

@Component({
  selector: 'typeahead-container',
  template: isBS4 ? bs4 : bs3,
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainerComponent implements AfterViewInit {
  public parent: TypeaheadDirective;
  public query: any;
  public element: ElementRef;
  public isFocused: boolean = false;
  public top: string;
  public left: string;
  public optionsInScrollableView: number;
  public scrollable: boolean;

  private _active: TypeaheadMatch;
  private _matches: Array<TypeaheadMatch> = [];
  private placement: string;
  private optionHeight: number;
  private ulPaddingTop: number;
  private height: number;
  private guiHeight: string;

  @ViewChildren('liElement') private liElements: QueryList<ElementRef>;
  @ViewChild('ulElement') private ulElement: ElementRef;
  public constructor(element: ElementRef, options: TypeaheadOptions, private renderer: Renderer) {
    this.element = element;
    Object.assign(this, options);

  }

  public get matches(): Array<TypeaheadMatch> {
    return this._matches;
  }

  public get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
  }

  public set matches(value: Array<TypeaheadMatch>) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }
  }

  public position(hostEl: ElementRef): void {
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
  }

  public ngAfterViewInit(): void {

    if (this.scrollable && this.liElements.first) {
      this.ulPaddingTop = parseFloat(positionService.getStyle(this.ulElement.nativeElement, 'padding-top').replace('px', ''));
      const ulPaddingBottom = parseFloat(positionService.getStyle(this.ulElement.nativeElement,'padding-bottom').replace('px', ''));

      this.optionHeight = parseFloat(positionService.getStyle(this.liElements.first.nativeElement, 'height').replace('px', ''));

      this.height = this.optionsInScrollableView * this.optionHeight;
      this.guiHeight = (this.height + this.ulPaddingTop + ulPaddingBottom) + 'px';
    }
    this.refreshSize();
  }

  public refreshSize(): void {
    if (this.scrollable) {
      if (this._matches.length > this.optionsInScrollableView) {
        this.setElementToBeScrollable();

      } else {
        this.setElementToBeNotScrollable();
      }
    } else {
      this.setElementToBeNotScrollable();
    }
  }

  public selectActiveMatch(): void {
    this.selectMatch(this._active);
  }

  public prevActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0
      ? this.matches.length - 1
      : index - 1];
    if (this._active.isHeader()) {
      return this.prevActiveMatch();
    }

    if (this.scrollable) {
      this.scrollPrevious(index);
    }
  }

  public nextActiveMatch(): void {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1
      ? 0
      : index + 1];

    if (this._active.isHeader()) {
      return this.nextActiveMatch();
    }

    if (this.scrollable) {
      this.scrollNext(index);
    }
  }

  protected selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  protected hightlight(match: TypeaheadMatch, query: any): string {
    let itemStr: string = match.value;
    let itemStrHelper: string = (this.parent && this.parent.typeaheadLatinize
      ? TypeaheadUtils.latinize(itemStr)
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

  public focusLost(): void {
    this.isFocused = false;
  }

  public isActive(value: TypeaheadMatch): boolean {
    return this._active === value;
  }

  private selectMatch(value: TypeaheadMatch, e: Event = void 0): boolean {
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

  private scrollPrevious(index: number): void {
    if (index === 0) {
      this.scrollToBottom();
      return;
    }
    if (this.liElements) {
      const liElement = this.liElements.toArray()[index - 1];
      if (liElement) {
        this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
      }

    }
  }

  private scrollNext(index: number): void {
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

  private isScrolledIntoView(elem: HTMLElement): boolean {
    const containerViewTop = this.ulElement.nativeElement.scrollTop;
    const containerViewBottom = containerViewTop + this.ulElement.nativeElement.offsetHeight;
    const elemTop = elem.offsetTop;
    const elemBottom = elemTop + elem.offsetHeight;
    return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
  }

  private scrollToBottom(): void {
    this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
  }

  private scrollToTop(): void {
    this.ulElement.nativeElement.scrollTop = 0;
  }

  private setElementToBeScrollable(): void {
    this.renderer.setElementStyle(this.ulElement.nativeElement, 'height', this.guiHeight);
    this.renderer.setElementStyle(this.ulElement.nativeElement, 'overflow-y', 'scroll');
  }

  private setElementToBeNotScrollable(): void {
    this.renderer.setElementStyle(this.ulElement.nativeElement, 'height', 'auto');
    this.renderer.setElementStyle(this.ulElement.nativeElement, 'overflow-y', 'auto');
  }

}
