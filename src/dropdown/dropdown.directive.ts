/* tslint:disable:max-file-line-count */
import {
  ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output
} from '@angular/core';

import { isBs3 } from '../utils/ng2-bootstrap-config';
import { dropdownService } from './dropdown.service';
import { DropdownConfig } from './dropdown.config';

/**
 * Mark dropdown content with this directive
 */
@Directive({
  selector: '[dropdown]',
  exportAs: 'bs-dropdown',
  //tslint:disable-next-line
  host: {'[class.show]': 'isOpen && !isBs3'}
})
export class DropdownDirective implements OnInit, OnDestroy {
  /** if `true` dropdown will be opened */
  @HostBinding('class.open')
  @HostBinding('class.active')
  @Input()
  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = !!value;

    // todo: implement after porting position
    // if (this.appendToBody && this.menuEl) {
    //
    // }

    // todo: $animate open<->close transitions, as soon as ng2Animate will be
    // ready
    if (this.isOpen) {
      this.focusToggleElement();
      dropdownService.open(this);
    } else {
      dropdownService.close(this);
      this.selectedOption = void 0;
    }
    this.onToggle.emit(this.isOpen);
    this.isOpenChange.emit(this.isOpen);
    this._changeDetector.markForCheck();
    // todo: implement call to setIsOpen if set and function
  }

  /** behaviour vary:
   * - nonInput - (default) automatically closes the dropdown when any of its elements is clicked — as long as the clicked element is not an input or a textarea.
   * - always - automatically closes the dropdown when any of its elements is clicked
   * - outsideClick - closes the dropdown automatically only when the user clicks any element outside the dropdown
   * - disabled - disables the auto close. You can then control the open/close status of the dropdown manually, by using is-open. Please notice that the dropdown will still close if the toggle is clicked, the esc key is pressed or another dropdown is open
   */
  @Input() public autoClose: string;
  /** if true will enable navigation of dropdown list elements with the arrow keys */
  @Input() public keyboardNav: boolean;
  // enum string: ['always', 'outsideClick', 'disabled']
  /** Allows to attach dropdown to body, will be replaced with container="body" */
  @Input() public appendToBody: boolean;

  /** fired when dropdown toggles, $event:boolean equals dropdown isOpen state */
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  /** fired when isOpen value changes */
  @Output() public isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @HostBinding('class.dropdown') public addClass: boolean = true;

  public get isBs3(): boolean {
    return isBs3();
  }

  // index of selected element
  public selectedOption: number;
  // drop menu html
  public menuEl: ElementRef;
  // drop down toggle element
  public toggleEl: ElementRef;
  public el: ElementRef;
  protected _isOpen: boolean;

  protected _changeDetector: ChangeDetectorRef;

  public constructor(el: ElementRef, ref: ChangeDetectorRef, config: DropdownConfig) {
    // @Query('dropdownMenu', {descendants: false})
    // dropdownMenuList:QueryList<ElementRef>) {
    this.el = el;
    this._changeDetector = ref;
    Object.assign(this, config);
    // todo: bind to route change event
  }

  public ngOnInit(): void {
    if (this.isOpen) {
      // todo: watch for event get-isOpen?
    }
  }

  public ngOnDestroy(): void {
    if (this.appendToBody && this.menuEl) {
      this.menuEl.nativeElement.remove();
    }
  }

  public set dropDownMenu(dropdownMenu: { el: ElementRef }) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;

    if (this.appendToBody) {
      window.document.body.appendChild(this.menuEl.nativeElement);
    }
  }

  public set dropDownToggle(dropdownToggle: { el: ElementRef }) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
  }

  public show():void {
    this.isOpen = true;
  }

  public hide():void {
    this.isOpen = false;
  }

  public toggle(open?: boolean): boolean {
    return this.isOpen = arguments.length ? !!open : !this.isOpen;
  }

  public focusDropdownEntry(keyCode: number): void {
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
      default:
        break;
    }

    elems[this.selectedOption].focus();
  }

  public focusToggleElement(): void {
    if (this.toggleEl) {
      this.toggleEl.nativeElement.focus();
    }
  }
}
