import {
  Directive, OnInit, OnDestroy,
  EventEmitter, ElementRef
} from 'angular2/angular2';

import {DropdownMenuInterface, DropdownToggleInterface} from './dropdown.interfaces';
import {dropdownService, ALWAYS} from './dropdown-service';

@Directive({
  selector: '[dropdown]',
  properties: ['isOpen', 'autoClose', 'keyboardNav', 'dropdownAppendToBody'],
  events: ['onToggle'],
  host: {
    '[class.dropdown]': 'true',
    '[class.open]': 'isOpen'
  }
})
export class Dropdown implements OnInit, OnDestroy {
  private _isOpen:boolean;
  // enum string: ['always', 'outsideClick', 'disabled']
  private dropdownAppendToBody:boolean;
  private onToggle:EventEmitter<boolean> = new EventEmitter();

  public autoClose:string;
  public keyboardNav:boolean;
  // index of selected element
  public selectedOption:number;
  // drop menu html
  public menuEl:ElementRef;
  // drop down toggle element
  public toggleEl:ElementRef;
  // not implemented:
  private dropdownMenuTemplateUrl:string;

  constructor(public el:ElementRef) {
    // todo: bind to route change event
  }

  onInit() {
    this.autoClose = this.autoClose || ALWAYS;
    this.keyboardNav = typeof this.keyboardNav !== 'undefined';
    this.dropdownAppendToBody = typeof this.dropdownAppendToBody !== 'undefined';
    if (this.isOpen) {
      // todo: watch for event get-is-open?
    }
  }

  onDestroy() {
    if (this.dropdownAppendToBody && this.menuEl) {
      this.menuEl.nativeElement.remove();
    }
  }

  public set dropDownMenu(dropdownMenu:DropdownMenuInterface) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;

    if (dropdownMenu.templateUrl) {
      this.dropdownMenuTemplateUrl = dropdownMenu.templateUrl;
    }

    if (this.dropdownAppendToBody) {
      window.document.body.appendChild(this.menuEl.nativeElement);
    }
  }

  public set dropDownToggle(dropdownToggle:DropdownToggleInterface) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
  }

  public toggle(open?:boolean):boolean {
    return this.isOpen = arguments.length ? !!open : !this.isOpen;
  }

  get isOpen():boolean {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = !!value;

    // todo: implement after porting position
    if (this.dropdownAppendToBody && this.menuEl) {

    }

    // todo: $animate open<->close transitions, as soon as ng2Animate will be ready
    if (this.isOpen) {
      if (this.dropdownMenuTemplateUrl) {
        // todo: implement template url option
      }

      this.focusToggleElement();
      dropdownService.open(this);
    } else {
      if (this.dropdownMenuTemplateUrl) {
        // todo: implement template url option
      }

      dropdownService.close(this);
      this.selectedOption = null;
    }
    this.onToggle.next(this.isOpen);
    // todo: implement call to setIsOpen if set and function
  }

  public focusDropdownEntry(keyCode:number) {
    // If append to body is used.
    let hostEl = this.menuEl ?
      this.menuEl.nativeElement :
      this.el.nativeElement.getElementsByTagName('ul')[0];

    if (!hostEl) {
      // todo: throw exception?
      return;
    }

    let elems = hostEl.getElementsByTagName('a');
    if (!elems || !elems.length) {
      // todo: throw exception?
      return;
    }

    // todo: use parseInt to detect isNumber?
    // todo: or implement selectedOption as a get\set pair with parseInt on set
    switch (keyCode) {
      case (40):
        if (typeof this.selectedOption !== 'number') {
          this.selectedOption = 0;
          break;
        }

        if (this.selectedOption === elems.length - 1) {
          break;
        }

        this.selectedOption++;
        break;
      case (38):
        if (typeof this.selectedOption !== 'number') {
          return;
        }

        if (this.selectedOption === 0) {
          // todo: return?
          break;
        }

        this.selectedOption--;
        break;
    }

    elems[this.selectedOption].focus();
  }

  public focusToggleElement() {
    if (this.toggleEl) {
      this.toggleEl.nativeElement.focus();
    }
  }
}
