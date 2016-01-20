import {
  Directive, Input, Output, HostListener,
  EventEmitter, OnInit,
  ElementRef, Renderer,
  DynamicComponentLoader, ComponentRef, Provider, Injector
} from 'angular2/core';
import {NgModel}from 'angular2/common';

import {Observable, Subject} from 'rxjs/Rx';

// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
function setProperty(renderer:Renderer, elementRef:ElementRef, propName:string, propValue:any) {
  renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
}

import {TypeaheadUtils} from './typeahead-utils';
import {TypeaheadContainer} from './typeahead-container.component';
import {TypeaheadOptions} from './typeahead-options.class';
import {TypeaheadEventBus} from './typeahead.event.bus.service';

@Directive({
  selector: 'typeahead[ngModel], [ngModel][typeahead]'
})
export class Typeahead implements OnInit {
  @Output() public typeaheadLoading:EventEmitter<boolean> = new EventEmitter();
  @Output() public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter();
  @Output() public typeaheadOnSelect:EventEmitter<{item: any}> = new EventEmitter();

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

  private keyUpEventEmitter:EventEmitter<any> = new EventEmitter();
  private _matches:Array<string>;
  private placement:string = 'bottom-left';
  private popup:Promise<ComponentRef>;

  constructor(private cd:NgModel,
              private element:ElementRef,
              private renderer:Renderer,
              private loader:DynamicComponentLoader,
              private eventBus:TypeaheadEventBus) {
  }

  private asyncActions() {
    this.keyUpEventEmitter
      .debounceTime(100)
      .subscribe(
        (value:string[]) => {
          this.eventBus.onValueChanged(value);
        }
      );

    this.typeahead
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

  private syncActions() {
    let syncSubject = new Subject();
    syncSubject.subscribe(
      (value:string) => {
        // If singleWords, break model here to not be doing extra work on each iteration
        let normalizedQuery:any =
          (this.typeaheadLatinize ? TypeaheadUtils.latinize(value) : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.typeaheadSingleWords ?
          TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) :
          normalizedQuery;

        Observable.fromArray(this.typeahead)
          .map((option:any) => {
            if (value.length < this.typeaheadMinLength) {
              return Observable.empty();
            }

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
          })
          .filter((option:any) => {
            return option && option.toLowerCase && this.testMatch(option.toLowerCase(), normalizedQuery);
          })
          .toArray()
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
    );

    this.keyUpEventEmitter
      .subscribe(syncSubject);
  }

  public get matches() {
    return this._matches;
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
    if (this.typeaheadAsync === null && !(this.typeahead instanceof Observable)) {
      this.typeaheadAsync = false;
    }

    if (this.typeahead instanceof Observable) {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync === true) {
      this.asyncActions();
    }

    if (this.typeaheadAsync === false) {
      this.syncActions();
    }
  }

  @HostListener('keyup', ['$event'])
  onChange(e:any) {
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

    this.typeaheadLoading.emit(true);
    this.keyUpEventEmitter.emit(e.target.value);
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
