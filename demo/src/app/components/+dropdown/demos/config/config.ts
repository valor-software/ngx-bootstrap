import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ng2-bootstrap/dropdown';

@Component({
  selector: 'demo-dropdown-config',
  templateUrl: './config.html',
  providers: [{provide: BsDropdownConfig, useValue: {autoClose: false}}]
})
export class DemoDropdownConfigComponent {
}
