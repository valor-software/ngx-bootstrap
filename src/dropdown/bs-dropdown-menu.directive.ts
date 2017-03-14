import { Directive, TemplateRef } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdownMenu],[dropdownMenu]',
  exportAs: 'bs-dropdown-menu'
})
export class BsDropdownMenuDirective {
  constructor(private _state: BsDropdownState,
              private _templateRef: TemplateRef<any>) {
    _state.resolveDropdownMenu(_templateRef);
  }
}
