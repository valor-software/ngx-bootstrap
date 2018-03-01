/* tslint:disable:max-file-line-count */
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ComponentLoader, ComponentLoaderFactory } from '../component-loader/index';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { getValueFromObject, latinize, tokenize } from './typeahead-utils';

@Directive({selector: '[typeahead]', exportAs: 'bs-typeahead'})
export class TypeaheadDirective implements OnInit, OnDestroy {
  /** options source, can be Array of strings, objects or
   * an Observable for external matching process
   */
  @Input() typeahead: any;
  /** minimal no of characters that needs to be entered before
   * typeahead kicks-in. When set to 0, typeahead shows on focus with full
   * list of options (limited as normal by typeaheadOptionsLimit)
   */
  @Input() typeaheadMinLength: number = void 0;
  /** minimal wait time after last character typed before typeahead kicks-in */
  @Input() typeaheadWaitMs: number;
  /** maximum length of options items list */
  @Input() typeaheadOptionsLimit: number;
  /** when options source is an array of objects, the name of field
   * that contains the options value, we use array item as option in case
   * of this field is missing. Supports nested properties and methods.
   */
  @Input() typeaheadOptionField: string;
  /** when options source is an array of objects, the name of field that
   * contains the group value, matches are grouped by this field when set.
   */
  @Input() typeaheadGroupField: string;
  /** should be used only in case of typeahead attribute is array.
   * If true - loading of options will be async, otherwise - sync.
   * true make sense if options array is large.
   */
  @Input() typeaheadAsync: boolean = void 0;
  /** match latin symbols.
   * If true the word súper would match super and vice versa.
   */
  @Input() typeaheadLatinize = true;
  /** Can be use to search words by inserting a single white space between each characters
   *  for example 'C a l i f o r n i a' will match 'California'.
   */
  @Input() typeaheadSingleWords = true;
  /** should be used only in case typeaheadSingleWords attribute is true.
   * Sets the word delimiter to break words. Defaults to space.
   */
  @Input() typeaheadWordDelimiters = ' ';
  /** should be used only in case typeaheadSingleWords attribute is true.
   * Sets the word delimiter to match exact phrase.
   * Defaults to simple and double quotes.
   */
  @Input() typeaheadPhraseDelimiters = '\'"';
  /** used to specify a custom item template.
   * Template variables exposed are called item and index;
   */
  @Input() typeaheadItemTemplate: TemplateRef<any>;
  /** used to specify a custom options list template.
   * Template variables: matches, itemTemplate, query
   */
  @Input() optionsListTemplate: TemplateRef<any>;
  /** specifies if typeahead is scrollable  */
  @Input() typeaheadScrollable = false;
  /** specifies number of options to show in scroll view  */
  @Input() typeaheadOptionsInScrollableView = 5;
  /** fired when 'busy' state of this component was changed,
   * fired on async mode only, returns boolean
   */
  @Output() typeaheadLoading = new EventEmitter<boolean>();
  /** fired on every key event and returns true
   * in case of matches are not detected
   */
  @Output() typeaheadNoResults = new EventEmitter<boolean>();
  /** fired when option was selected, return object with data of this option */
  @Output() typeaheadOnSelect = new EventEmitter<TypeaheadMatch>();
  /** fired when blur event occurres. returns the active item */
  @Output() typeaheadOnBlur = new EventEmitter<any>();

  /**
   * A selector specifying the element the typeahead should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;

  /** This attribute indicates that the dropdown should be opened upwards */
  @Input() dropup = false;

  // not yet implemented
  /** if false restrict model values to the ones selected from the popup only will be provided */
  // @Input() protected typeaheadEditable:boolean;
  /** if false the first match automatically will not be focused as you type */
  // @Input() protected typeaheadFocusFirst:boolean;
  /** format the ng-model result after selection */
  // @Input() protected typeaheadInputFormatter:any;
  /** if true automatically select an item when there is one option that exactly matches the user input */
  // @Input() protected typeaheadSelectOnExact:boolean;
  /**  if true select the currently highlighted match on blur */
  // @Input() protected typeaheadSelectOnBlur:boolean;
  /**  if false don't focus the input element the typeahead directive is associated with on selection */
    // @Input() protected typeaheadFocusOnSelect:boolean;

  _container: TypeaheadContainerComponent;
  isTypeaheadOptionsListActive = false;

  protected keyUpEventEmitter: EventEmitter<any> = new EventEmitter();
  protected _matches: TypeaheadMatch[];
  protected placement = 'bottom-left';
  // protected popup:ComponentRef<TypeaheadContainerComponent>;

  private _typeahead: ComponentLoader<TypeaheadContainerComponent>;
  private _subscriptions: Subscription[] = [];
  private _outsideClickListener: Function;

  constructor(private ngControl: NgControl,
              private element: ElementRef,
              viewContainerRef: ViewContainerRef,
              private renderer: Renderer2,
              cis: ComponentLoaderFactory,
              private changeDetection: ChangeDetectorRef) {
    this._typeahead = cis.createLoader<TypeaheadContainerComponent>(
      element,
      viewContainerRef,
      renderer
    );
  }

  ngOnInit(): void {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength =
      this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (
      this.typeaheadAsync === undefined &&
      !(this.typeahead instanceof Observable)
    ) {
      this.typeaheadAsync = false;
    }

    if (this.typeahead instanceof Observable) {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync) {
      this.asyncActions();
    } else {
      this.syncActions();
    }
  }

  @HostListener('input', ['$event'])
  onInput(e: any): void {
    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`), use either
    // `textContent` or `innerText` (depending on which one is supported, i.e.
    // Firefox or IE).
    const value =
      e.target.value !== undefined
        ? e.target.value
        : e.target.textContent !== undefined
        ? e.target.textContent
        : e.target.innerText;
    if (value != null && value.trim().length >= this.typeaheadMinLength) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(e.target.value);
    } else {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(false);
      this.hide();
    }
  }

  @HostListener('keyup', ['$event'])
  onChange(e: any): void {
    if (this._container) {
      // esc
      if (e.keyCode === 27) {
        this.hide();

        return;
      }

      // up
      if (e.keyCode === 38) {
        this._container.prevActiveMatch();

        return;
      }

      // down
      if (e.keyCode === 40) {
        this._container.nextActiveMatch();

        return;
      }

      // enter, tab
      if (e.keyCode === 13) {
        this._container.selectActiveMatch();

        return;
      }
    }
  }

  @HostListener('click')
  @HostListener('focus')
  onFocus(): void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this._container && !this._container.isFocused) {
      this.typeaheadOnBlur.emit(this._container.active);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: any): void {
    // no container - no problems
    if (!this._container) {
      return;
    }

    // if an item is visible - prevent form submission
    if (e.keyCode === 13) {
      e.preventDefault();

      return;
    }

    // if an item is visible - don't change focus
    if (e.keyCode === 9) {
      e.preventDefault();
      this._container.selectActiveMatch();

      return;
    }
  }

  changeModel(match: TypeaheadMatch): void {
    const valueStr: string = match.value;
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control).setValue(valueStr);
    this.changeDetection.markForCheck();
    this.hide();
  }

  get matches(): any[] {
    return this._matches;
  }

  show(): void {
    this._typeahead
      .attach(TypeaheadContainerComponent)
      // todo: add append to body, after updating positioning service
      .to(this.container)
      .position({attachment: `${this.dropup ? 'top' : 'bottom'} left`})
      .show({
        typeaheadRef: this,
        placement: this.placement,
        animation: false,
        dropup: this.dropup
      });

    this._outsideClickListener = this.renderer.listen('document', 'click', (e: MouseEvent) => {
      if (this.typeaheadMinLength === 0 && this.element.nativeElement.contains(e.target)) {
        return;
      }
      this.onOutsideClick();
    });

    this._container = this._typeahead.instance;
    this._container.parent = this;
    // This improves the speed as it won't have to be done for each list item
    const normalizedQuery = (this.typeaheadLatinize
      ? latinize(this.ngControl.control.value)
      : this.ngControl.control.value)
      .toString()
      .toLowerCase();
    this._container.query = this.typeaheadSingleWords
      ? tokenize(
        normalizedQuery,
        this.typeaheadWordDelimiters,
        this.typeaheadPhraseDelimiters
      )
      : normalizedQuery;
    this._container.matches = this._matches;
    this.element.nativeElement.focus();
  }

  hide(): void {
    if (this._typeahead.isShown) {
      this._typeahead.hide();
      this._outsideClickListener();
      this._container = null;
    }
  }

  onOutsideClick(): void {
    if (this._container && !this._container.isFocused) {
      this.hide();
    }
  }

  ngOnDestroy(): any {
    // clean up subscriptions
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._typeahead.dispose();
  }

  protected asyncActions(): void {
    this._subscriptions.push(
      this.keyUpEventEmitter
        .debounceTime(this.typeaheadWaitMs)
        .switchMap(() => this.typeahead)
        .subscribe((matches: any[]) => {
          this.finalizeAsyncCall(matches);
        })
    );
  }

  protected syncActions(): void {
    this._subscriptions.push(
      this.keyUpEventEmitter
        .debounceTime(this.typeaheadWaitMs)
        .mergeMap((value: string) => {
          const normalizedQuery = this.normalizeQuery(value);

          return Observable.from(this.typeahead)
            .filter((option: any) => {
              return (
                option &&
                this.testMatch(this.normalizeOption(option), normalizedQuery)
              );
            })
            .toArray();
        })
        .subscribe((matches: any[]) => {
          this.finalizeAsyncCall(matches);
        })
    );
  }

  protected normalizeOption(option: any): any {
    const optionValue: string = getValueFromObject(
      option,
      this.typeaheadOptionField
    );
    const normalizedOption = this.typeaheadLatinize
      ? latinize(optionValue)
      : optionValue;

    return normalizedOption.toLowerCase();
  }

  protected normalizeQuery(value: string): any {
    // If singleWords, break model here to not be doing extra work on each
    // iteration
    let normalizedQuery: any = (this.typeaheadLatinize
      ? latinize(value)
      : value)
      .toString()
      .toLowerCase();
    normalizedQuery = this.typeaheadSingleWords
      ? tokenize(
        normalizedQuery,
        this.typeaheadWordDelimiters,
        this.typeaheadPhraseDelimiters
      )
      : normalizedQuery;

    return normalizedQuery;
  }

  protected testMatch(match: string, test: any): boolean {
    let spaceLength: number;

    if (typeof test === 'object') {
      spaceLength = test.length;
      for (let i = 0; i < spaceLength; i += 1) {
        if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
          return false;
        }
      }

      return true;
    }

    return match.indexOf(test) >= 0;
  }

  protected finalizeAsyncCall(matches: any[]): void {
    this.prepareMatches(matches);

    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(!this.hasMatches());

    if (!this.hasMatches()) {
      this.hide();

      return;
    }

    if (this._container) {
      // This improves the speed as it won't have to be done for each list item
      const normalizedQuery = (this.typeaheadLatinize
        ? latinize(this.ngControl.control.value)
        : this.ngControl.control.value)
        .toString()
        .toLowerCase();
      this._container.query = this.typeaheadSingleWords
        ? tokenize(
          normalizedQuery,
          this.typeaheadWordDelimiters,
          this.typeaheadPhraseDelimiters
        )
        : normalizedQuery;
      this._container.matches = this._matches;
    } else {
      this.show();
    }
  }

  protected prepareMatches(options: any[]): void {
    const limited: any[] = options.slice(0, this.typeaheadOptionsLimit);

    if (this.typeaheadGroupField) {
      let matches: TypeaheadMatch[] = [];

      // extract all group names
      const groups = limited
        .map((option: any) =>
          getValueFromObject(option, this.typeaheadGroupField)
        )
        .filter((v: string, i: number, a: any[]) => a.indexOf(v) === i);

      groups.forEach((group: string) => {
        // add group header to array of matches
        matches.push(new TypeaheadMatch(group, group, true));

        // add each item of group to array of matches
        matches = matches.concat(
          limited
            .filter(
              (option: any) =>
                getValueFromObject(option, this.typeaheadGroupField) === group
            )
            .map(
              (option: any) =>
                new TypeaheadMatch(
                  option,
                  getValueFromObject(option, this.typeaheadOptionField)
                )
            )
        );
      });

      this._matches = matches;
    } else {
      this._matches = limited.map(
        (option: any) =>
          new TypeaheadMatch(
            option,
            getValueFromObject(option, this.typeaheadOptionField)
          )
      );
    }
  }

  protected hasMatches(): boolean {
    return this._matches.length > 0;
  }
}
