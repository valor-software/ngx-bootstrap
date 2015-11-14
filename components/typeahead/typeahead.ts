import {
  Directive,
  Component, View, Self, NgModel,
  EventEmitter, OnInit,
  ElementRef, DefaultValueAccessor,
  NgClass, NgStyle, Renderer, CORE_DIRECTIVES,
  ViewRef, ViewContainerRef, TemplateRef,
  DynamicComponentLoader, ComponentRef,
  ViewEncapsulation
} from 'angular2/angular2';

// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
function setProperty(renderer: Renderer, elementRef: ElementRef, propName: string, propValue: any) {
  renderer.setElementProperty(elementRef, propName, propValue);
}
import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/angular2';

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap-config';
import {positionService} from '../position';

const TEMPLATE:any = {
  [Ng2BootstrapTheme.BS4]: `
  <div class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
      <a href="#"
         *ng-for="#match of matches"
         (click)="selectMatch(match, $event)"
         [ng-class]="{active: isActive(match) }"
         (mouseenter)="selectActive(match)"
         class="dropdown-item"
         [inner-html]="hightlight(match, query)"></a>
  </div>
  `,
  [Ng2BootstrapTheme.BS3]: `
  <ul class="dropdown-menu"
      [ng-style]="{top: top, left: left, display: display}"
      style="display: block">
    <li *ng-for="#match of matches"
        [ng-class]="{active: isActive(match) }"
        (mouseenter)="selectActive(match)">
        <a href="#" (click)="selectMatch(match, $event)" tabindex="-1" [inner-html]="hightlight(match, query)"></a>
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
  selector: 'typeahead-container'
})
@View({
  template: TEMPLATE[Ng2BootstrapConfig.theme],
  directives: [CORE_DIRECTIVES, NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None
})
export class TypeaheadContainer {
  public parent:Typeahead;
  public query:string;
  private _matches:Array<string> = [];
  private _active:string;
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

  private selectActive(value:string) {
    this._active = value;
  }

  private isActive(value:any):boolean {
    return this._active === value;
  }

  private selectMatch(value:string, e:Event = null) {
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

  private escapeRegexp(queryToEscape:string) {
    // Regex: capture the whole query string and replace it with the string that will be used to match
    // the results, for example if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  private hightlight(item:string, query:string) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query ? item.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : item;
  };
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
    'async:typeaheadAsync'
  ],
  events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
  host: {
    '(keyup)': 'onChange($event)'
  }
})
export class Typeahead implements OnInit {
  public typeaheadLoading:EventEmitter<boolean> = new EventEmitter();
  public typeaheadNoResults:EventEmitter<boolean> = new EventEmitter();
  public typeaheadOnSelect:EventEmitter<{item: string}> = new EventEmitter();

  public container:TypeaheadContainer;

  public minLength:number;
  public waitMs:number;
  public optionsLimit:number;

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

  private debouncer:Function;
  private source:any;
  private _matches:Array<string> = [];
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
      for (let i = 0; i < this.source.length; i++) {
        let match:string;

        if (typeof this.source[i] === 'object' &&
          this.source[i][this.field]) {
          match = this.source[i][this.field];
        }

        if (typeof this.source[i] === 'string') {
          match = this.source[i];
        }

        if (!match) {
          console.log('Invalid match type', typeof this.source[i], this.field);
          continue;
        }

        if (match.toLowerCase().indexOf(this.cd.model.toString().toLowerCase()) >= 0) {
          this._matches.push(match);
          if (this._matches.length > this.optionsLimit - 1) {
            break;
          }
        }
      }
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
      this.container.query = this.cd.model;
      this.container.matches = this._matches;
    }

    if (!this.container && this._matches.length > 0) {
      this.show(this._matches);
    }
  }

  onInit() {
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
    this.cd.viewToModelUpdate(value);
    setProperty(this.renderer, this.element, 'value', value);
    this.hide();
  }

  show(matches:Array<string>) {
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
      this.container.query = this.cd.model;
      this.container.matches = matches;
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

export const typeahead:Array<any> = [Typeahead];
