import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {TOOLTIP_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./tooltip-demo.html');

@Component({
  selector: 'tooltip-demo',
  template: template,
  directives: [TOOLTIP_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipDemoComponent {
  public dynamicTooltip:string = 'Hello, World!';
  public dynamicTooltipText:string = 'dynamic';
  public htmlTooltip:string = 'I\'ve been made <b>bold</b>!';
}
