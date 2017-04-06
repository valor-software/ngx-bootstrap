import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdownMenu],[dropdownMenu]',
  exportAs: 'bs-dropdown-menu'
})
export class BsDropdownMenuDirective {
  constructor(_state: BsDropdownState,
              _viewContainer: ViewContainerRef,
              _templateRef: TemplateRef<any>) {
    _state.resolveDropdownMenu({
      templateRef: _templateRef,
      viewContainer: _viewContainer
    });
  }
}
