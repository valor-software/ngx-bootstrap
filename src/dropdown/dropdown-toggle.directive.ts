import {
  Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit
} from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

/* tslint:disable-next-line */
const MouseEvent = (global as any).MouseEvent as MouseEvent;

/** Mark element which can toggle dropdown visibility with this directive */
@Directive({
  selector: '[dropdownToggle]',
  exportAs: 'bs-dropdown-toggle'
})
export class DropdownToggleDirective implements OnInit {
  /** if true dropdown toggle will be disabled */
  @HostBinding('class.disabled')
  @Input() public isDisabled:boolean = false;

  /** if true the dropdown-toggle class will be added to the element */
  @HostBinding('class.dropdown-toggle')
  @Input() public addToggleClass:boolean = true;

  @HostBinding('attr.aria-haspopup')
  public addClass:boolean = true;

  public dropdown:DropdownDirective;
  public el:ElementRef;

  public constructor(@Host() dropdown:DropdownDirective, el:ElementRef) {
    this.dropdown = dropdown;
    this.el = el;
  }

  public ngOnInit():void {
    this.dropdown.dropDownToggle = this;
  }

  @HostBinding('attr.aria-expanded')
  public get isOpen():boolean {
    return this.dropdown.isOpen;
  }

  @HostListener('click', ['$event'])
  public toggleDropdown(event:MouseEvent):boolean {
    event.stopPropagation();

    if (!this.isDisabled) {
      this.dropdown.toggle();
    }
    return false;
  }
}
