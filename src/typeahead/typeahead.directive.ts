import {
  Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  Renderer, TemplateRef, ViewContainerRef, OnDestroy
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadUtils } from './typeahead-utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { TypeaheadMatch } from './typeahead-match.class';
import { ComponentLoaderFactory, ComponentLoader } from '../component-loader';

@Directive({selector: '[typeahead]'})
export class TypeaheadDirective implements OnInit, OnDestroy {
  /** options source, can be Array of strings, objects or an Observable for external matching process */
  @Input() public typeahead: any;
  /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
  @Input() public typeaheadMinLength: number = void 0;
  /** minimal wait time after last character typed before typeahead kicks-in */
  @Input() public typeaheadWaitMs: number;
  /** maximum length of options items list */
  @Input() public typeaheadOptionsLimit: number;
  /** when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. */
  @Input() public typeaheadOptionField: string;
  /** when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. */
  @Input() public typeaheadGroupField: string;
  /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
  @Input() public typeaheadAsync: boolean = void 0;
  /** match latin symbols. If true the word súper would match super and vice versa. */
  @Input() public typeaheadLatinize: boolean = true;
  /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
  @Input() public typeaheadSingleWords: boolean = true;
  /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
  @Input() public typeaheadWordDelimiters: string = ' ';
  /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
  @Input() public typeaheadPhraseDelimiters: string = '\'"';
  /** used to specify a custom item template. Template variables exposed are called item and index; */
  @Input() public typeaheadItemTemplate: TemplateRef<any>;
  /** used to specify a custom options list template. Template variables: matches, itemTemplate, query */
  @Input() public optionsListTemplate: TemplateRef<any>;
  /** used to set whether or not the first typeahead option is automatically made active */
  @Input() public typeaheadFocusFirst: boolean = true;
  /** use to set keys to be ignored by typeahead */
  @Input() public typeaheadIgnoreKeys: number[] = [];
  /** use to set keys to hide typeahead */
  @Input() public typeaheadEscapeKeys: number[] = [];
  /** use to set keys to select match in typeahead */
  @Input() public typeaheadSelectKeys: number[] = [];
  

  /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
  @Output() public typeaheadLoading: EventEmitter<boolean> = new EventEmitter();
  /** fired on every key event and returns true in case of matches are not detected */
  @Output() public typeaheadNoResults: EventEmitter<boolean> = new EventEmitter();
  /** fired when option was selected, return object with data of this option */
  @Output() public typeaheadOnSelect: EventEmitter<TypeaheadMatch> = new EventEmitter();
  /** fired when blur event occurres. returns the active item */
  @Output() public typeaheadOnBlur: EventEmitter<any> = new EventEmitter();

  /**
   * A selector specifying the element the typeahead should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string;

  // not yet implemented
  /** if false restrict model values to the ones selected from the popup only will be provided */
  // @Input() protected typeaheadEditable:boolean;
  /** format the ng-model result after selection */
  // @Input() protected typeaheadInputFormatter:any;
  /** if true automatically select an item when there is one option that exactly matches the user input */
  // @Input() protected typeaheadSelectOnExact:boolean;
  /**  if true select the currently highlighted match on blur */
  // @Input() protected typeaheadSelectOnBlur:boolean;
  /**  if false don't focus the input element the typeahead directive is associated with on selection */
    // @Input() protected typeaheadFocusOnSelect:boolean;

  public _container: TypeaheadContainerComponent;
  public isTypeaheadOptionsListActive: boolean = false;

  protected keyUpEventEmitter: EventEmitter<any> = new EventEmitter();
  protected _matches: TypeaheadMatch[];
  protected placement: string = 'bottom-left';
  // protected popup:ComponentRef<TypeaheadContainerComponent>;

  protected ngControl: NgControl;
  protected viewContainerRef: ViewContainerRef;
  protected element: ElementRef;
  protected renderer: Renderer;

  private _typeahead: ComponentLoader<TypeaheadContainerComponent>;

  @HostListener('keyup', ['$event'])
  public onChange(e: any): void {
    if (this._container) {
      // Ignore keys set to ignore by user
      if(this.typeaheadIgnoreKeys.find(k => k===e.keyCode)){
        return;
      }

      // Set user defined select keys
      if (this.typeaheadSelectKeys.find(k => k===e.keyCode)){
        this._container.selectActiveMatch();
        return;
      }

      // Set user defined escape keys
      if(this.typeaheadEscapeKeys.find(k => k===e.keyCode)){
        this.hide();
        return;
      }

      //Set default actions for keys
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

      // enter
      if (e.keyCode === 13){
        if(!this._container.active){
          return;
        }
        this._container.selectActiveMatch();
        return;
      }

      // tab
      if (e.keyCode === 9 && this._container.active){
        e.preventDefault();
        this._container.selectActiveMatch();
        return;
      }
    }
    //Don't include enter as an input to trigger typeahead
    if(e.keyCode===13){
      return;
    }
    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`, use `innerText`.
    const value = e.target.value !== undefined
      ? e.target.value
      : e.target.innerText;
    if (value.trim().length >= this.typeaheadMinLength) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(e.target.value);
    } else {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(false);
      this.hide();
    }
  }

  @HostListener('focus')
  public onFocus(): void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit('');
    }
  }

  @HostListener('blur')
  public onBlur(): void {
    if (this._container && !this._container.isFocused) {
      this.typeaheadOnBlur.emit(this._container.active);
      this.hide();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(e: KeyboardEvent): void {
    // no container - no problems
    if (!this._container) {
      return;
    }

    // if a match is selected and the key pressed is defined by the user to have a fucntion, then ignore the key's normal function
    if ((this.typeaheadSelectKeys.find(k => k === e.keyCode) || this.typeaheadEscapeKeys.find(k => k===e.keyCode))
         && this._container.active){
      e.preventDefault();
      return;
    }

    // if items is visible - prevent form submition
    if (e.keyCode === 13) {
      if(this._container.active){
        e.preventDefault();
        return;
      } else{
        this.hide();
        return;
      }
    }
  }

  public constructor(control: NgControl, viewContainerRef: ViewContainerRef, element: ElementRef, renderer: Renderer, cis: ComponentLoaderFactory) {
    this.element = element;
    this.ngControl = control;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this._typeahead = cis
      .createLoader<TypeaheadContainerComponent>(element, viewContainerRef, renderer);
  }

  public ngOnInit(): void {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength = this.typeaheadMinLength === void 0
      ? 1
      : this.typeaheadMinLength;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable)) {
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

  public changeModel(match: TypeaheadMatch): void {
    let valueStr: string = match.value;
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control as FormControl).setValue(valueStr);
    this.hide();
  }

  public get matches(): any[] {
    return this._matches;
  }

  public show(): void {
    this._typeahead
      .attach(TypeaheadContainerComponent)
      // todo: add append to body, after updating positioning service
      .to(this.container)
      .position({attachment: 'bottom left'})
      .show({
        typeaheadRef: this,
        placement: this.placement,
        animation: false,
        focusFirst: this.typeaheadFocusFirst
      });

    this._container = this._typeahead.instance;
    this._container.parent = this;
    // This improves the speed as it won't have to be done for each list item
    let normalizedQuery = (this.typeaheadLatinize
      ? TypeaheadUtils.latinize(this.ngControl.control.value)
      : this.ngControl.control.value).toString()
      .toLowerCase();
    this._container.query = this.typeaheadSingleWords
      ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
      : normalizedQuery;
    this._container.matches = this._matches;
    this.element.nativeElement.focus();
  }

  public hide(): void {
    if (this._typeahead.isShown) {
      this._typeahead.hide();
      this._container = null;
    }
  }

  public ngOnDestroy(): any {
    this._typeahead.dispose();
  }

  protected asyncActions(): void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap(() => this.typeahead)
      .subscribe(
        (matches: any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  protected syncActions(): void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap((value: string) => {
        let normalizedQuery = this.normalizeQuery(value);

        return Observable.from(this.typeahead)
          .filter((option: any) => {
            return option && this.testMatch(this.normalizeOption(option), normalizedQuery);
          })
          .toArray();
      })
      .subscribe(
        (matches: any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  protected normalizeOption(option: any): any {
    let optionValue: string = TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField);
    let normalizedOption = this.typeaheadLatinize
      ? TypeaheadUtils.latinize(optionValue)
      : optionValue;

    return normalizedOption.toLowerCase();
  }

  protected normalizeQuery(value: string): any {
    // If singleWords, break model here to not be doing extra work on each
    // iteration
    let normalizedQuery: any =
      (this.typeaheadLatinize ? TypeaheadUtils.latinize(value) : value)
        .toString()
        .toLowerCase();
    normalizedQuery = this.typeaheadSingleWords
      ?
      TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
      :
      normalizedQuery;

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
    } else {
      return match.indexOf(test) >= 0;
    }
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
      let normalizedQuery = (this.typeaheadLatinize
        ? TypeaheadUtils.latinize(this.ngControl.control.value)
        : this.ngControl.control.value).toString()
        .toLowerCase();
      this._container.query = this.typeaheadSingleWords
        ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
        : normalizedQuery;
      this._container.matches = this._matches;
    } else {
      this.show();
    }
  }

  protected prepareMatches(options: any[]): void {
    let limited: any[] = options.slice(0, this.typeaheadOptionsLimit);

    if (this.typeaheadGroupField) {
      let matches: TypeaheadMatch[] = [];

      // extract all group names
      let groups = limited
        .map((option: any) => TypeaheadUtils.getValueFromObject(option, this.typeaheadGroupField))
        .filter((v: string, i: number, a: any[]) => a.indexOf(v) === i);

      groups.forEach((group: string) => {
        // add group header to array of matches
        matches.push(new TypeaheadMatch(group, group, true));

        // add each item of group to array of matches
        matches = matches.concat(limited
          .filter((option: any) => TypeaheadUtils.getValueFromObject(option, this.typeaheadGroupField) === group)
          .map((option: any) => new TypeaheadMatch(option, TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField))));
      });

      this._matches = matches;
    } else {
      this._matches = limited.map((option: any) => new TypeaheadMatch(option, TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField)));
    }
  }

  protected hasMatches(): boolean {
    return this._matches.length > 0;
  }
}
