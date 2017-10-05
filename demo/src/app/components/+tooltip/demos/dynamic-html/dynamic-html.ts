import { Component } from '@angular/core';

@Component({
  selector: 'demo-tooltip-dynamic-html',
  templateUrl: './dynamic-html.html'
})
export class DemoTooltipDynamicHtmlComponent {
  html: string = `
<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;
}
