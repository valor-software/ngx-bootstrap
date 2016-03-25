import {
  Directive, Input, Output, HostListener,
  EventEmitter, OnInit,
  ElementRef, Renderer,
  DynamicComponentLoader, ComponentRef, Provider, Injector
} from 'angular2/core';
import {NgModel}from 'angular2/common';

// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
function setProperty(renderer:Renderer, elementRef:ElementRef, propName:string, propValue:any) {
  renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
}

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap-config';
import {positionService} from '../position';
import {TypeaheadUtils} from './typeahead-utils';
import {TypeaheadContainer} from './typeahead-container.component';
import {TypeaheadOptions} from './typeahead-options.class';

@Directive({
  selector: 'typeahead[ngModel], [ngModel][typeahead]'
})
export class Typeahead implements OnInit {
  @Output() public typeaheadLoading:EventEmitter<boolean> = new EventEmitter(false);
  @Output() public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter(false);
  @Output() public typeaheadOnSelect:EventEmitter<{item: any}> = new EventEmitter(false);

  @Input() public typeahead:any;
  @Input() public typeaheadMinLength:number;
  @Input() public typeaheadWaitMs:number;
  @Input() public typeaheadOptionsLimit:number;
  @Input() public typeaheadOptionField:string;
  @Input() public typeaheadAsync:boolean = null;
  @Input() public typeaheadLatinize:boolean = true;
  @Input() public typeaheadSingleWords:boolean = true;
  @Input() public typeaheadWordDelimiters:string = ' ';
  @Input() public typeaheadPhraseDelimiters:string = '\'"';

  // not yet implemented
  @Input() private typeaheadAppendToBody:boolean;
  @Input() private typeaheadEditable:boolean;
  @Input() private typeaheadFocusFirst:boolean;
  @Input() private typeaheadInputFormatter:any;
  @Input() private typeaheadSelectOnExact:boolean;
  @Input() private typeaheadSelectOnBlur:boolean;
  @Input() private typeaheadFocusOnSelect:boolean;

  public container:TypeaheadContainer;

  private debouncer:Function;
  private _matches:Array<any> = [];
  private placement:string = 'bottom-left';
  private popup:Promise<ComponentRef>;

  constructor(private cd:NgModel,
              private element:ElementRef,
              private renderer:Renderer,
              private loader:DynamicComponentLoader) {
  }

  public get matches() {
    return this._matches;
  }

  private debounce(func:Function, wait:number):Function {
    let timeout:any;
    let args:Array<any>;
    let timestamp:number;
    let waitOriginal:number = wait;

    return function () {
      // save details of latest call
      args = [].slice.call(arguments, 0);
      timestamp = Date.now();

      // this trick is about implementing of 'typeaheadWaitMs'
      // in this case we have adaptive 'wait' parameter
      // we should use standard 'wait'('waitOriginal') in case of
      // popup is opened, otherwise - 'typeaheadWaitMs' parameter
      wait = this.container ? waitOriginal : this.typeaheadWaitMs;

      // this is where the magic happens
      let later = function () {

        // how long ago was the last call
        let last = Date.now() - timestamp;

        // if the latest call was less that the wait period ago
        // then we reset the timeout to wait for the difference
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
          // or if not we can null out the timer and run the latest
        } else {
          timeout = null;
          func.apply(this, args);
        }
      };

      // we only need to set the timer now if one isn't already running
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  }

  private processMatches() {
    this._matches = [];

    // If singleWords, break model here to not be doing extra work on each iteration
    let normalizedQuery = (this.typeaheadLatinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
    normalizedQuery = this.typeaheadSingleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
    for (let i = 0; i < this.typeahead.length; i++) {
      let match:string;

      if (typeof this.typeahead[i] === 'object' &&
        this.typeahead[i][this.typeaheadOptionField]) {
        match = this.typeaheadLatinize ? TypeaheadUtils.latinize(this.typeahead[i][this.typeaheadOptionField].toString()) : this.typeahead[i][this.typeaheadOptionField].toString();
      }

      if (typeof this.typeahead[i] === 'string') {
        match = this.typeaheadLatinize ? TypeaheadUtils.latinize(this.typeahead[i].toString()) : this.typeahead[i].toString();
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

  private testMatch(match:string, test:any) {
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

  private finalizeAsyncCall() {
    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(this.cd.model.toString().length >=
      this.typeaheadMinLength && this.matches.length <= 0);

    if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
      this.hide();
      return;
    }

    if (this.container && this._matches.length > 0) {
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.typeaheadLatinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      this.container.query = this.typeaheadSingleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
      this.container.matches = this._matches;
    }

    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

  ngOnInit() {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength = this.typeaheadMinLength || 1;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (this.typeaheadAsync === null && typeof this.typeahead !== 'function') {
      this.typeaheadAsync = false;
    }

    // async should be true for any case of function
    if (typeof this.typeahead === 'function') {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync === true) {
      this.debouncer = this.debounce(() => {
        if (typeof this.typeahead === 'function') {
          this.typeahead().then((matches:any[]) => {
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

  @HostListener('keyup', ['$event'])
  onChange(e:KeyboardEvent) {
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

    // Ensure that we have typed enough characters before triggering the matchers
    if (this.cd.model.toString().length >= this.typeaheadMinLength) {

      this.typeaheadLoading.emit(true);

      if (this.typeaheadAsync === true) {
        this.debouncer();
      }

      if (this.typeaheadAsync === false) {
        this.processMatches();
        this.finalizeAsyncCall();
      }
    } else {
      // Not enough characters typed? Hide the popup.
      this.hide();
    }
  }

  public changeModel(value:any) {
    let valueStr:string = ((typeof value === 'object' && this.typeaheadOptionField) ? value[this.typeaheadOptionField] : value).toString();
    this.cd.viewToModelUpdate(valueStr);
    setProperty(this.renderer, this.element, 'value', valueStr);
    this.hide();
  }

  show(matches:Array<any>) {
    let options = new TypeaheadOptions({
      placement: this.placement,
      animation: false
    });

    let binding = Injector.resolve([
      new Provider(TypeaheadOptions, {useValue: options})
    ]);

    this.popup = this.loader
      .loadNextToLocation(TypeaheadContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
        componentRef.instance.position(this.element);
        this.container = componentRef.instance;
        this.container.parent = this;
        // This improves the speedas it won't have to be done for each list item
        let normalizedQuery = (this.typeaheadLatinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
        this.container.query = this.typeaheadSingleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
        this.container.matches = matches;
        this.container.field = this.typeaheadOptionField;
        this.element.nativeElement.focus();
        return componentRef;
      });
  }

  hide() {
    if (this.container) {
      this.popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        this.container = null;
        return componentRef;
      });
    }
  }
}
