import {
  Directive, Input, Output, HostListener, EventEmitter, OnInit, ElementRef, TemplateRef,
  Renderer, DynamicComponentLoader, ComponentRef, ReflectiveInjector, provide, ViewContainerRef
} from '@angular/core';
import {NgControl, FormControl} from '@angular/forms';
import {TypeaheadUtils} from './typeahead-utils';
import {TypeaheadContainerComponent} from './typeahead-container.component';
import {TypeaheadOptions} from './typeahead-options.class';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import {global} from '@angular/core/src/facade/lang';
/* tslint:disable */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;
/* tslint:enable */

@Directive({
  /* tslint:disable */
  selector: '[typeahead][ngModel],[typeahead][formControlName]'
  /* tslint:enable */
})
export class TypeaheadDirective implements OnInit {
  @Output() public typeaheadLoading:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() public typeaheadOnSelect:EventEmitter<{item:any}> = new EventEmitter<{item:any}>(false);

  @Input() public typeahead:any;
  @Input() public typeaheadMinLength:number = void 0;
  @Input() public typeaheadWaitMs:number;
  @Input() public typeaheadOptionsLimit:number;
  @Input() public typeaheadOptionField:string;
  @Input() public typeaheadAsync:boolean = void 0;
  @Input() public typeaheadLatinize:boolean = true;
  @Input() public typeaheadSingleWords:boolean = true;
  @Input() public typeaheadWordDelimiters:string = ' ';
  @Input() public typeaheadPhraseDelimiters:string = '\'"';
  @Input() public typeaheadItemTemplate:TemplateRef<any>;

  // not yet implemented
  // @Input() private typeaheadAppendToBody:boolean;
  // @Input() private typeaheadEditable:boolean;
  // @Input() private typeaheadFocusFirst:boolean;
  // @Input() private typeaheadInputFormatter:any;
  // @Input() private typeaheadSelectOnExact:boolean;
  // @Input() private typeaheadSelectOnBlur:boolean;
  // @Input() private typeaheadFocusOnSelect:boolean;

  public container:TypeaheadContainerComponent;
  public isTypeaheadOptionsListActive:boolean = false;

  private keyUpEventEmitter:EventEmitter<any> = new EventEmitter();
  private _matches:Array<string>;
  private placement:string = 'bottom-left';
  private popup:Promise<ComponentRef<any>>;

  private ngControl:NgControl;
  private viewContainerRef:ViewContainerRef;
  private element:ElementRef;
  private renderer:Renderer;
  private loader:DynamicComponentLoader;

  @HostListener('keyup', ['$event'])
  protected onChange(e:any):void {
    if (this.container) {
      // esc
      if (e.keyCode === 27) {
        this.hide();
        return;
      }

      // up
      if (e.keyCode === 38) {
        this.container.prevActiveMatch();
        return;
      }

      // down
      if (e.keyCode === 40) {
        this.container.nextActiveMatch();
        return;
      }

      // enter
      if (e.keyCode === 13) {
        this.container.selectActiveMatch();
        return;
      }
    }

    if (e.target.value.trim().length >= this.typeaheadMinLength) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(e.target.value);
    } else {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(false);
      this.hide();
    }
  }

  @HostListener('focus', ['$event.target'])
  protected onFocus():void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit('');
    }
  }

  @HostListener('blur')
  protected onBlur():void {
    if (this.container && !this.container.isFocused) {
      this.hide();
    }
  }

  @HostListener('keydown', ['$event'])
  protected onKeydown(e:KeyboardEvent):void {
    // no container - no problems
    if (!this.container) {
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

  public constructor(control:NgControl, viewContainerRef:ViewContainerRef, element:ElementRef,
                     renderer:Renderer, loader:DynamicComponentLoader) {
    this.element = element;
    this.ngControl = control;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.loader = loader;
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

  public changeModel(value:any):void {
    let valueStr:string = ((typeof value === 'object' && this.typeaheadOptionField)
      ? value[this.typeaheadOptionField]
      : value).toString();
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control as FormControl).updateValue(valueStr);
    this.hide();
  }

  public get matches():Array<any> {
    return this._matches;
  }

  public show(matches:Array<any>):void {
    let options = new TypeaheadOptions({
      typeaheadRef: this,
      placement: this.placement,
      animation: false
    });

    let binding = ReflectiveInjector.resolve([
      provide(TypeaheadOptions, {useValue: options})
    ]);

    this.popup = this.loader
      .loadNextToLocation(TypeaheadContainerComponent, this.viewContainerRef, binding)
      .then((componentRef:ComponentRef<any>) => {
        componentRef.instance.position(this.viewContainerRef.element);
        this.container = componentRef.instance;
        this.container.parent = this;
        // This improves the speedas it won't have to be done for each list item
        let normalizedQuery = (this.typeaheadLatinize
          ? TypeaheadUtils.latinize(this.ngControl.control.value)
          : this.ngControl.control.value).toString()
          .toLowerCase();
        this.container.query = this.typeaheadSingleWords
          ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
          : normalizedQuery;
        this.container.matches = matches;
        this.container.field = this.typeaheadOptionField;
        this.element.nativeElement.focus();
        return componentRef;
      });
  }

  public hide():void {
    if (this.container) {
      this.popup.then((componentRef:ComponentRef<any>) => {
        componentRef.destroy();
        this.container = void 0;
        return componentRef;
      });
    }
  }

  private asyncActions():void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap(() => this.typeahead)
      .subscribe(
        (matches:string[]) => {
          this._matches = matches.slice(0, this.typeaheadOptionsLimit);
          this.finalizeAsyncCall();
        },
        (err:any) => {
          console.error(err);
        }
      );
  }

  private syncActions():void {
    this.keyUpEventEmitter
      .debounceTime(this.typeaheadWaitMs)
      .mergeMap((value:string) => {
        let normalizedQuery = this.normalizeQuery(value);

        return Observable.from(this.typeahead)
          .filter((option:any) => {
            return option && this.testMatch(this.prepareOption(option).toLowerCase(), normalizedQuery);
          })
          .toArray();
      })
      .subscribe(
        (matches:string[]) => {
          this._matches = matches.slice(0, this.typeaheadOptionsLimit);
          this.finalizeAsyncCall();
        },
        (err:any) => {
          console.error(err);
        }
      );
  }

  private prepareOption(option:any):any {
    let match:any;

    if (typeof option === 'object' &&
      option[this.typeaheadOptionField]) {
      match = this.typeaheadLatinize ?
        TypeaheadUtils.latinize(option[this.typeaheadOptionField].toString()) :
        option[this.typeaheadOptionField].toString();
    }

    if (typeof option === 'string') {
      match = this.typeaheadLatinize ?
        TypeaheadUtils.latinize(option.toString()) :
        option.toString();
    }

    return match;
  }

  private normalizeQuery(value:string):any {
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

  private testMatch(match:string, test:any):boolean {
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

  private finalizeAsyncCall():void {
    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(this.matches.length <= 0);

    if (this._matches.length <= 0) {
      this.hide();
      return;
    }

    if (this.container && this._matches.length > 0) {
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.typeaheadLatinize
        ? TypeaheadUtils.latinize(this.ngControl.control.value)
        : this.ngControl.control.value).toString()
        .toLowerCase();
      this.container.query = this.typeaheadSingleWords
        ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
        : normalizedQuery;
      this.container.matches = this._matches;
    }

    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

}
