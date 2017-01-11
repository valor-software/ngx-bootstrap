import { Component } from '@angular/core';
import { DropdownConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values

export function getDropdownConfig(): DropdownConfig {
  return Object.assign(new DropdownConfig(), {autoClose: 'disabled', keyboardNav: true});
}

@Component({
  selector: 'demo-dropdown-config',
  templateUrl: './config.html',
  providers: [{provide: DropdownConfig, useFactory: getDropdownConfig}]
})
export class DemoDropdownConfigComponent {
}
