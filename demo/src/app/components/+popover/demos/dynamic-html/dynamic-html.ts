import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-dynamic-html',
  templateUrl: './dynamic-html.html'
})
export class DemoPopoverDynamicHtmlComponent {
  public html: string = `
<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;
}
