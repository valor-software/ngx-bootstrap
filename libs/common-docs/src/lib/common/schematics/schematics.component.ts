import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'schematics',
  templateUrl: './schematics.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SchematicsComponent {
  name = `Schematics of ngx-bootstrap`;
  src = 'https://github.com/valor-software/ngx-bootstrap';
}
