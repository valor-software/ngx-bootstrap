import {
  Directive, Input, Output, HostListener, EventEmitter, OnInit, ElementRef,
  Renderer, DynamicComponentLoader, ComponentRef, ReflectiveInjector, provide, ViewContainerRef
} from '@angular/core';
import {NgModel} from '@angular/common';
import {TypeaheadUtils} from './typeahead-utils';
import {TypeaheadContainerComponent} from './typeahead-container.component';
import {TypeaheadOptions} from './typeahead-options.class';

import {global} from '@angular/core/src/facade/lang';
/* tslint:disable */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;
/* tslint:enable */

// https://github.com/angular/angular/blob/master/modules/@angular/src/core/forms/directives/shared.ts
function setProperty(renderer:Renderer, elementRef:ElementRef, propName:string, propValue:any):void {
  renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
}

@Directive({
  selector: '[typeahead][ngModel]'
})
export class TypeaheadDirective implements OnInit {
  @Output() public typeaheadLoading:EventEmitter<boolean> = new EventEmitter(false);
  @Output() public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter(false);
  @Output() public typeaheadOnSelect:EventEmitter<{item:any}> = new EventEmitter(false);

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

  private debouncer:Function;
  private _matches:Array<any> = [];
  private placement:string = 'bottom-left';
  private popup:Promise<ComponentRef<any>>;

  private cd:NgModel;
  private viewContainerRef:ViewContainerRef;
  private element:ElementRef;
  private renderer:Renderer;
  private loader:DynamicComponentLoader;

  @HostListener('keyup', ['$event'])
  protected onChange(e:KeyboardEvent):void {
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

    // Ensure that we have typed enough characters before triggering the
    // matchers
    if (this.cd.model.toString().length >= this.typeaheadMinLength) {

      this.typeaheadLoading.emit(true);

      if (this.typeaheadAsync === true) {
        this.debouncer();
      }

      if (!this.typeaheadAsync) {
        this.processMatches();
        this.finalizeAsyncCall();
      }
    } else {
      // Not enough characters typed? Hide the popup.
      this.hide();
    }
  }

  @HostListener('focus', ['$event.target'])
  protected onFocus():void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);

      if (this.typeaheadAsync === true) {
        this.debouncer();
      }

      if (!this.typeaheadAsync) {
        this.processMatches();
        this.finalizeAsyncCall();
      }
    }
  }

  @HostListener('blur', ['$event.target'])
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

  public constructor(cd:NgModel, viewContainerRef:ViewContainerRef, element:ElementRef,
                     renderer:Renderer, loader:DynamicComponentLoader) {
    this.element = element;
    this.cd = cd;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.loader = loader;
  }

  public ngOnInit():void {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (this.typeaheadAsync === void 0 && typeof this.typeahead !== 'function') {
      this.typeaheadAsync = false;
    }

    // async should be true for any case of function
    if (typeof this.typeahead === 'function') {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync === true) {
      this.debouncer = this.debounce(() => {
        if (typeof this.typeahead === 'function') {
          this.typeahead()
            .then((matches:any[]) => {
              this._matches = [];

              for (let i = 0; i < matches.length; i++) {
                this._matches.push(matches[i]);
                if (this._matches.length > this.typeaheadOptionsLimit - 1) {
                  break;
                }
              }

              this.finalizeAsyncCall();
            });
        }

        // source is array
        if (typeof this.typeahead === 'object' && this.typeahead.length) {
          this.processMatches();
          this.finalizeAsyncCall();
        }
      }, 100);
    }
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
          ? TypeaheadUtils.latinize(this.cd.model)
          : this.cd.model).toString()
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

  public changeModel(value:any):void {
    let valueStr:string = ((typeof value === 'object' && this.typeaheadOptionField)
      ? value[this.typeaheadOptionField]
      : value).toString();
    this.cd.viewToModelUpdate(valueStr);
    setProperty(this.renderer, this.element, 'value', valueStr);
    this.hide();
  }

  public get matches():Array<any> {
    return this._matches;
  }

  private debounce(func:Function, wait:number):Function {
    let timeout:any;
    let args:Array<any>;
    let timestamp:number;
    let waitOriginal:number = wait;

    return function ():void {
      // save details of latest call
      args = [].slice.call(arguments, 0);
      timestamp = Date.now();

      // this trick is about implementing of 'typeaheadWaitMs'
      // in this case we have adaptive 'wait' parameter
      // we should use standard 'wait'('waitOriginal') in case of
      // popup is opened, otherwise - 'typeaheadWaitMs' parameter
      wait = this.container ? waitOriginal : this.typeaheadWaitMs;

      // this is where the magic happens
      let later = function ():void {

        // how long ago was the last call
        let last = Date.now() - timestamp;

        // if the latest call was less that the wait period ago
        // then we reset the timeout to wait for the difference
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
          // or if not we can null out the timer and run the latest
        } else {
          timeout = void 0;
          func.apply(this, args);
        }
      };

      // we only need to set the timer now if one isn't already running
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  }

  private processMatches():void {
    this._matches = [];

    if (!this.typeahead) {
      return;
    }

    if (!this.cd.model) {
      for (let i = 0; i < Math.min(this.typeaheadOptionsLimit, this.typeahead.length); i++) {
        this._matches.push(this.typeahead[i]);
      }
      return;
    }

    // If singleWords, break model here to not be doing extra work on each
    // iteration
    let normalizedQuery = (this.typeaheadLatinize
      ? TypeaheadUtils.latinize(this.cd.model)
      : this.cd.model).toString()
      .toLowerCase();
    normalizedQuery = this.typeaheadSingleWords
      ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
      : normalizedQuery;
    for (let i = 0; i < this.typeahead.length; i++) {
      let match:string;

      if (typeof this.typeahead[i] === 'object' &&
        this.typeahead[i][this.typeaheadOptionField]) {
        match = this.typeaheadLatinize
          ? TypeaheadUtils.latinize(this.typeahead[i][this.typeaheadOptionField].toString())
          : this.typeahead[i][this.typeaheadOptionField].toString();
      }

      if (typeof this.typeahead[i] === 'string') {
        match = this.typeaheadLatinize
          ? TypeaheadUtils.latinize(this.typeahead[i].toString())
          : this.typeahead[i].toString();
      }

      if (!match) {
        console.log('Invalid match type', typeof this.typeahead[i], this.typeaheadOptionField);
        continue;
      }

      if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
        this._matches.push(this.typeahead[i]);
        if (this._matches.length > this.typeaheadOptionsLimit - 1) {
          break;
        }
      }
    }

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
    this.typeaheadNoResults.emit(this.cd.model.toString().length >=
      this.typeaheadMinLength && this.matches.length <= 0);

    if (this._matches.length <= 0) {
      this.hide();
      return;
    }

    if (this.container && this._matches.length > 0) {
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.typeaheadLatinize
        ? TypeaheadUtils.latinize(this.cd.model)
        : this.cd.model).toString()
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
