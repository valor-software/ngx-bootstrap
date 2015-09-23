/// <reference path="../../../tsd.d.ts" />
import {
  Component, View, NgClass,
  CORE_DIRECTIVES, FORM_DIRECTIVES
} from 'angular2/angular2';

import {tooltip} from '../../../components/index';

// webpack html imports
let template = require('./tooltip-demo.html');

@Component({
  selector: 'tooltip-demo'
})
@View({
  template: template,
  directives: [tooltip, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass],
  styles: [`
    /* Specify styling for tooltip contents */
    .tooltip.customClass .tooltip-inner {
        color: #880000;
        background-color: #ffff66;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }
    /* Hide arrow */
    .tooltip.customClass .tooltip-arrow {
        display: none;
    }
  `]
})
export class TooltipDemo {
  public dynamicTooltip:string = 'Hello, World!';
  public dynamicTooltipText:string = 'dynamic';
  public htmlTooltip:string = 'I\'ve been made <b>bold</b>!';
}
