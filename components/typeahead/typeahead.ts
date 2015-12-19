import {
  Directive,
  Component, Self,
  EventEmitter, OnInit,
  ElementRef,
  Renderer,
  ViewRef, ViewContainerRef, TemplateRef,
  DynamicComponentLoader, ComponentRef,
  ViewEncapsulation
} from 'angular2/core';
import {
  CORE_DIRECTIVES,
  ControlValueAccessor,
  DefaultValueAccessor,
  NgModel }
from 'angular2/common';

// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
function setProperty(renderer: Renderer, elementRef: ElementRef, propName: string, propValue: any) {
  renderer.setElementProperty(elementRef, propName, propValue);
}
import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/core';

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap-config';
import {positionService} from '../position';
import {TypeaheadUtils} from './typeahead-utils';

const TEMPLATE:any = {
  [Ng2BootstrapTheme.BS4]: `
  <div class="dropdown-menu"
      [ngStyle]="{top: top, left: left, display: display}"
      style="display: block">
      <a href="#"
         *ngFor="#match of matches"
         (click)="selectMatch(match, $event)"
         [ngClass]="{active: isActive(match) }"
         (mouseenter)="selectActive(match)"
         class="dropdown-item"
         [innerHtml]="hightlight(match, query)"></a>
  </div>
  `,
  [Ng2BootstrapTheme.BS3]: `
  <ul class="dropdown-menu"
      [ngStyle]="{top: top, left: left, display: display}"
      style="display: block">
    <li *ngFor="#match of matches"
        [ngClass]="{active: isActive(match) }"
        (mouseenter)="selectActive(match)">
        <a href="#" (click)="selectMatch(match, $event)" tabindex="-1" [innerHtml]="hightlight(match, query)"></a>
    </li>
  </ul>
  `
};

export class TypeaheadOptions {
  public placement:string;
  public animation:boolean;

  constructor(options:TypeaheadOptions) {
    Object.assign(this, options);
  }
}

@Component({
  selector: 'typeahead-container',
  directives: [CORE_DIRECTIVES],
  template: TEMPLATE[Ng2BootstrapConfig.theme],
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainer {
  public parent:Typeahead;
  public query:any;
  private _matches:Array<any> = [];
  private _field:string;
  private _active:any;
  private top:string;
  private left:string;
  private display:string;
  private placement:string;

  constructor(public element:ElementRef, options:TypeaheadOptions) {
    Object.assign(this, options);
  }

  public get matches():Array<string> {
    return this._matches;
  }

  public set matches(value:Array<string>) {
    this._matches = value;

    if (this._matches.length > 0) {
      this._active = this._matches[0];
    }
  }

  public set field(value:string) {
    this._field = value;
  }

  public position(hostEl:ElementRef) {
    this.display = 'block';
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
  }

  public selectActiveMatch() {
    this.selectMatch(this._active);
  }

  public prevActiveMatch() {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
  }

  public nextActiveMatch() {
    let index = this.matches.indexOf(this._active);
    this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
  }

  private selectActive(value:any) {
    this._active = value;
  }

  private isActive(value:any):boolean {
    return this._active === value;
  }

  private selectMatch(value:any, e:Event = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.parent.changeModel(value);
    this.parent.typeaheadOnSelect.next({
      item: value
    });
    return false;
  }

  private hightlight(item:any, query:string) {
    let itemStr:string = (typeof item === 'object' && this._field ? item[this._field] : item).toString();
    let itemStrHelper:string = (this.parent.latinize ? TypeaheadUtils.latinize(itemStr) : itemStr).toLowerCase();
    let startIdx:number;
    let tokenLen:number;

    // Replaces the capture string with the same string inside of a "strong" tag
    if (typeof query === 'object') {
      let queryLen:number = query.length;
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
}

// todo: options loading by http not yet implemented
@Directive({
  selector: 'typeahead, [typeahead]',
  properties: [
    'source:typeahead',
    // todo: not yet implemented
    'appendToBody:typeaheadAppendToBody',
    // todo: not yet implemented
    'editable:typeaheadEditable',
    // todo: not yet implemented
    'focusFirst:typeaheadFocusFirst',
    // todo: not yet implemented
    'inputFormatter:typeaheadInputFormatter',
    'minLength:typeaheadMinLength',
    // todo: not yet implemented
    'selectOnExact:typeaheadSelectOnExact',
    // todo: not yet implemented
    'templateUrl:typeaheadTemplateUrl',
    // todo: not yet implemented
    'popupTemplateUrl:typeaheadPopupTemplateUrl',
    'waitMs:typeaheadWaitMs',
    'optionsLimit:typeaheadOptionsLimit',
    // todo: not yet implemented
    'selectOnBlur:typeaheadSelectOnBlur',
    // todo: not yet implemented
    'focusOnSelect:typeaheadFocusOnSelect',
    'field:typeaheadOptionField',
    'async:typeaheadAsync',
    'latinize:typeaheadLatinize',
    'singleWords:typeaheadSingleWords',
    'wordDelimiters:typeaheadWordDelimiters',
    'phraseDelimiters:typeaheadPhraseDelimiters'
  ],
  events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
  host: {
    '(keyup)': 'onChange($event)'
  }
})
export class Typeahead implements OnInit {
  public typeaheadLoading:EventEmitter<boolean> = new EventEmitter();
  public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter();
  public typeaheadOnSelect:EventEmitter<{item: any}> = new EventEmitter();

  public container:TypeaheadContainer;

  public minLength:number;
  public waitMs:number;
  public optionsLimit:number;
  public latinize:boolean = true;
  public singleWords:boolean = true;

  private appendToBody:boolean;
  private editable:boolean;
  private focusFirst:boolean;
  private inputFormatter:any;
  private selectOnExact:boolean;
  private templateUrl:string;
  private popupTemplateUrl:string;
  private selectOnBlur:boolean;
  private focusOnSelect:boolean;
  private field:string;
  private async:boolean = null;
  private wordDelimiters:string = ' ';
  private phraseDelimiters:string = '\'"';

  private debouncer:Function;
  private source:any;
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
      wait = this.container ? waitOriginal : this.waitMs;

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
    if (this.cd.model.toString().length >= this.minLength) {
      // If singleWords, break model here to not be doing extra work on each iteration
      let normalizedQuery = (this.latinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      normalizedQuery = this.singleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.wordDelimiters, this.phraseDelimiters) : normalizedQuery;
      for (let i = 0; i < this.source.length; i++) {
        let match:string;

        if (typeof this.source[i] === 'object' &&
          this.source[i][this.field]) {
          match = this.latinize ? TypeaheadUtils.latinize(this.source[i][this.field].toString()) : this.source[i][this.field].toString();
        }

        if (typeof this.source[i] === 'string') {
          match = this.latinize ? TypeaheadUtils.latinize(this.source[i].toString()) : this.source[i].toString();
        }

        if (!match) {
          console.log('Invalid match type', typeof this.source[i], this.field);
          continue;
        }

        if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
          this._matches.push(this.source[i]);
          if (this._matches.length > this.optionsLimit - 1) {
            break;
          }
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
    this.typeaheadLoading.next(false);
    this.typeaheadNoResults.next(this.cd.model.toString().length >=
      this.minLength && this.matches.length <= 0);

    if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
      this.hide();
      return;
    }

    if (this.container && this._matches.length > 0) {
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.latinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      this.container.query = this.singleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.wordDelimiters, this.phraseDelimiters) : normalizedQuery;
      this.container.matches = this._matches;
    }

    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

  ngOnInit() {
    this.optionsLimit = this.optionsLimit || 20;
    this.minLength = this.minLength || 1;
    this.waitMs = this.waitMs || 0;

    // async should be false in case of array
    if (this.async === null && typeof this.source !== 'function') {
      this.async = false;
    }

    // async should be true for any case of function
    if (typeof this.source === 'function') {
      this.async = true;
    }

    if (this.async === true) {
      this.debouncer = this.debounce(() => {
        if (typeof this.source === 'function') {
          this.source().then((matches:any[]) => {
            this._matches = [];
            if (this.cd.model.toString().length >= this.minLength) {
              for (let i = 0; i < matches.length; i++) {
                this._matches.push(matches[i]);
                if (this._matches.length > this.optionsLimit - 1) {
                  break;
                }
              }
            }

            this.finalizeAsyncCall();
          });
        }

        // source is array
        if (typeof this.source === 'object' && this.source.length) {
          this.processMatches();
          this.finalizeAsyncCall();
        }
      }, 100);
    }
  }

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

    this.typeaheadLoading.next(true);

    if (this.async === true) {
      this.debouncer();
    }

    if (this.async === false) {
      this.processMatches();
      this.finalizeAsyncCall();
    }
  }

  public changeModel(value:any) {
    let valueStr:string = ((typeof value === 'object' && this.field) ? value[this.field] : value).toString();
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
      bind(TypeaheadOptions).toValue(options)
    ]);

    this.popup = this.loader
      .loadNextToLocation(TypeaheadContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
      componentRef.instance.position(this.element);
      this.container = componentRef.instance;
      this.container.parent = this;
      // This improves the speedas it won't have to be done for each list item
      let normalizedQuery = (this.latinize ? TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
      this.container.query = this.singleWords ? TypeaheadUtils.tokenize(normalizedQuery, this.wordDelimiters, this.phraseDelimiters) : normalizedQuery;
      this.container.matches = matches;
      this.container.field = this.field;
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
