import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-dynamic-html',
  templateUrl: './dynamic-html.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverDynamicHtmlComponent {
  html = `<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;
}
