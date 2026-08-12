import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppFooterComponent {}
