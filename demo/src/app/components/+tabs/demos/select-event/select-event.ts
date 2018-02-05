import { Component } from '@angular/core';
import {TabDirective} from "../../../../../../../src/tabs";

@Component({
  selector: 'demo-tabs-select-event',
  templateUrl: './select-event.html'
})
export class DemoTabsSelectEventComponent {
  onSelect(value: TabDirective): void {
    console.log(value.heading);
  }
}
