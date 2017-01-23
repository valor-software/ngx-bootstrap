import {
  Component, ElementRef, TemplateRef, ViewEncapsulation, HostListener, Renderer, ViewChildren, ViewChild, QueryList
} from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { TypeaheadUtils } from './typeahead-utils';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
import { Utils } from './../utils/utils.class'

@Component({
  selector: 'typeahead-container',
  // tslint:disable-next-line
  template: `
  <template [ngIf]="!isBs4"><ul #ulElement class="dropdown-menu">
    <template ngFor let-match let-i="index" [ngForOf]="matches">
      <li #liElements *ngIf="match.isHeader()" class="dropdown-header">{{match}}</li>
      <li #liElements *ngIf="!match.isHeader()"
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
  </ul></template>
  <template [ngIf]="isBs4">
    <template ngFor let-match let-i="index" [ngForOf]="matches">
       <h6 *ngIf="match.isHeader()" class="dropdown-header">{{match}}</h6>
       <template [ngIf]="!match.isHeader() && !itemTemplate">
          <button #liElements
            class="dropdown-item"
            (click)="selectMatch(match, $event)"
            (mouseenter)="selectActive(match)"
            [class.active]="isActive(match)"
            [innerHtml]="hightlight(match, query)"></button>
      </template>
      <template [ngIf]="!match.isHeader() && itemTemplate">
        <button #liElements
           class="dropdown-item"
           (click)="selectMatch(match, $event)"
           (mouseenter)="selectActive(match)"
           [class.active]="isActive(match)">
          <template [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{item: match.item, index: i}">
          </template>
         </button>
      </template>
    </template>
  </template>
`,
  // tslint:disable
  host: {
    'class': 'dropdown open',
    '[class.dropdown-menu]': 'isBs4',
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

  public get isBs4(): boolean {
    return !isBs3();
  }

  protected _active: TypeaheadMatch;
  protected _matches: TypeaheadMatch[] = [];

  @ViewChild('ulElement')
  private ulElement: ElementRef;

  @ViewChildren('liElements')
  private liElements: QueryList<ElementRef>;

  private optionHeight: number;
  private ulPaddingTop: number;
  private height: number;
  private guiHeight: string;
  private : boolean = false;

  

  public constructor(element: ElementRef, private renderer: Renderer) {
    this.element = element;
  }

  public get matches(): TypeaheadMatch[] {
    return this._matches;
  }

  public set matches(value: TypeaheadMatch[]) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
      if (this._active.isHeader()) {
        this.nextActiveMatch();
      }
    }
  }

  public get typeaheadScrollable(): boolean {
    return this.parent ? this.parent.typeaheadScrollable : false;
  }
  

  public get typeaheadOptionsInScrollableView(): number {
    return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
  }
  

  public get itemTemplate(): TemplateRef<any> {
    return this.parent ? this.parent.typeaheadItemTemplate : undefined;
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
    if (this.typeaheadScrollable) {
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
    if (this.typeaheadScrollable) {
      this.scrollNext(index);
    }
  }

  public selectActive(value: TypeaheadMatch): void {
    this.isFocused = true;
    this._active = value;
  }

  public hightlight(match: TypeaheadMatch, query: any): string {
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

  ngAfterViewInit(): void {
    if(!this.ulElement){
        this.ulElement = this.element;
    }
    if (this.typeaheadScrollable && this.liElements.first) {
      const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
      const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
      this.ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0').replace('px', ''));
      var ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '').replace('px', ''));
      this.optionHeight = parseFloat((liStyles['height'] ? liStyles['height'] : '0').replace('px', ''));
      this.height = this.typeaheadOptionsInScrollableView * this.optionHeight;
      this.guiHeight = (this.height + this.ulPaddingTop + ulPaddingBottom) + 'px';
    }
    this.refreshSize();
  }


  refreshSize(): void {
    if (this.typeaheadScrollable) {
      if (this._matches.length > this.typeaheadOptionsInScrollableView) {
        this.setElementToBeScrollable();
      }
      else {
        this.setElementToBeNotScrollable();
      }
    }
    else {
      this.setElementToBeNotScrollable();
    }
  }

  scrollPrevious(index: number): void {
    if (index === 0) {
      this.scrollToBottom();
      return;
    }
    if (this.liElements) {
      var liElement = this.liElements.toArray()[index - 1];
      if (liElement) {
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
      var liElement = this.liElements.toArray()[index + 1];
      if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
        this.ulElement.nativeElement.scrollTop =
          liElement.nativeElement.offsetTop -
          this.ulElement.nativeElement.offsetHeight +
          liElement.nativeElement.offsetHeight;
      }
    }
  }


  private isScrolledIntoView = function (elem: HTMLElement) {
    var containerViewTop = this.ulElement.nativeElement.scrollTop;
    var containerViewBottom = containerViewTop + this.ulElement.nativeElement.offsetHeight;
    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.offsetHeight;
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
  };



}
