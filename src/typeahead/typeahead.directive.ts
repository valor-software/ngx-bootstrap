import {
  ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input,
  OnInit, Output,
  ReflectiveInjector, Renderer, TemplateRef, ViewContainerRef, OnDestroy
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadOptions } from './typeahead-options.class';
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

/* tslint:disable-next-line */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;

@Directive({
  /* tslint:disable */
  selector: '[typeahead][ngModel],[typeahead][formControlName]'
  /* tslint:enable */
})
export class TypeaheadDirective implements OnInit, OnDestroy {
  @Output() public typeaheadLoading:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadOnSelect:EventEmitter<TypeaheadMatch> = new EventEmitter<TypeaheadMatch>(false);

  @Input() public typeahead:any;
  @Input() public typeaheadMinLength:number = void 0;
  @Input() public typeaheadWaitMs:number;
  @Input() public typeaheadOptionsLimit:number;
  @Input() public typeaheadOptionField:string;
  @Input() public typeaheadGroupField:string;
  @Input() public typeaheadAsync:boolean = void 0;
  @Input() public typeaheadLatinize:boolean = true;
  @Input() public typeaheadSingleWords:boolean = true;
  @Input() public typeaheadWordDelimiters:string = ' ';
  @Input() public typeaheadPhraseDelimiters:string = '\'"';
  @Input() public typeaheadItemTemplate:TemplateRef<any>;

  /**
   * A selector specifying the element the typeahead should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string;

  // not yet implemented
  // @Input() protected typeaheadEditable:boolean;
  // @Input() protected typeaheadFocusFirst:boolean;
  // @Input() protected typeaheadInputFormatter:any;
  // @Input() protected typeaheadSelectOnExact:boolean;
  // @Input() protected typeaheadSelectOnBlur:boolean;
  // @Input() protected typeaheadFocusOnSelect:boolean;

  public _container:TypeaheadContainerComponent;
  public isTypeaheadOptionsListActive:boolean = false;

  protected keyUpEventEmitter:EventEmitter<any> = new EventEmitter();
  protected _matches:TypeaheadMatch[];
  protected placement:string = 'bottom-left';
  // protected popup:ComponentRef<TypeaheadContainerComponent>;

  protected ngControl:NgControl;
  protected viewContainerRef:ViewContainerRef;
  protected element:ElementRef;
  protected renderer:Renderer;

  private _typeahead: ComponentLoader<TypeaheadContainerComponent>;

  @HostListener('keyup', ['$event'])
  public onChange(e:any):void {
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

      // enter
      if (e.keyCode === 13) {
        this._container.selectActiveMatch();
        return;
      }
    }

    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`, use `innerText`.
    const value = e.target.value !== undefined ? e.target.value : e.target.innerText;
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
  public onFocus():void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit('');
    }
  }

  @HostListener('blur')
  public onBlur():void {
    if (this._container && !this._container.isFocused) {
      this.hide();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(e:KeyboardEvent):void {
    // no container - no problems
    if (!this._container) {
      return;
    }

    // if items is visible - prevent form submition
    if (e.keyCode === 13) {
      e.preventDefault();
      return;
    }

    // if tab default browser behavior will select next input field, and therefore we should close the items list
    if (e.keyCode === 9) {
      this.hide();
      return;
    }
  }

  public constructor(control:NgControl, viewContainerRef:ViewContainerRef, element:ElementRef, renderer:Renderer, cis: ComponentLoaderFactory) {
    this.element = element;
    this.ngControl = control;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this._typeahead = cis
      .createLoader<TypeaheadContainerComponent>(element, viewContainerRef, renderer);
  }

  public ngOnInit():void {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
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

  public changeModel(match:TypeaheadMatch):void {
    let valueStr:string = match.value;
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control as FormControl).setValue(valueStr);
    this.hide();
  }

  public get matches():any[] {
    return this._matches;
  }

  public show():void {
    this._typeahead
      .attach(TypeaheadContainerComponent)
      // todo: add append to body, after updating positioning service
      // .to(this.container)
      // .position({attachment: 'bottom left'})
      .show({
        typeaheadRef: this,
        placement: this.placement,
        animation: false
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

  public hide():void {
    if (this._typeahead.isShown) {
      this._typeahead.hide();
      this._container = null;
    }
  }

  public ngOnDestroy():any {
    this._typeahead.dispose();
  }

  protected asyncActions():void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap(() => this.typeahead)
      .subscribe(
        (matches:any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err:any) => {
          console.error(err);
        }
      );
  }

  protected syncActions():void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap((value:string) => {
        let normalizedQuery = this.normalizeQuery(value);

        return Observable.from(this.typeahead)
          .filter((option:any) => {
            return option && this.testMatch(this.normalizeOption(option), normalizedQuery);
          })
          .toArray();
      })
      .subscribe(
        (matches:any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err:any) => {
          console.error(err);
        }
      );
  }

  protected normalizeOption(option:any):any {
    let optionValue:string = TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField);
    let normalizedOption = this.typeaheadLatinize ? TypeaheadUtils.latinize(optionValue) : optionValue;

    return normalizedOption.toLowerCase();
  }

  protected normalizeQuery(value:string):any {
    // If singleWords, break model here to not be doing extra work on each iteration
    let normalizedQuery:any =
      (this.typeaheadLatinize ? TypeaheadUtils.latinize(value) : value)
        .toString()
        .toLowerCase();
    normalizedQuery = this.typeaheadSingleWords ?
      TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) :
      normalizedQuery;

    return normalizedQuery;
  }

  protected testMatch(match:string, test:any):boolean {
    let spaceLength:number;

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

  protected finalizeAsyncCall(matches:any[]):void {
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

  protected prepareMatches(options:any[]):void {
    let limited:any[] = options.slice(0, this.typeaheadOptionsLimit);

    if (this.typeaheadGroupField) {
      let matches:TypeaheadMatch[] = [];

      // extract all group names
      let groups = limited
        .map((option:any) => TypeaheadUtils.getValueFromObject(option, this.typeaheadGroupField))
        .filter((v:string, i:number, a:any[]) => a.indexOf(v) === i);

      groups.forEach((group:string) => {
        // add group header to array of matches
        matches.push(new TypeaheadMatch(group, group, true));

        // add each item of group to array of matches
        matches = matches.concat(limited
          .filter((option:any) => TypeaheadUtils.getValueFromObject(option, this.typeaheadGroupField) === group)
          .map((option:any) => new TypeaheadMatch(option, TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField))));
      });

      this._matches = matches;
    } else {
      this._matches = limited.map((option:any) => new TypeaheadMatch(option, TypeaheadUtils.getValueFromObject(option, this.typeaheadOptionField)));
    }
  }

  protected hasMatches():boolean {
    return this._matches.length > 0;
  }
}
