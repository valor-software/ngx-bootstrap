import { Component, Input } from '@angular/core';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: any;
}
