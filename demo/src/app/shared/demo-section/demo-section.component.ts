import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-section',
  templateUrl: 'demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() public name:string;
  @Input() public titleDoc:string;
  @Input() public src:string;
  @Input() public html:string;
  @Input() public ts:string;
  @Input() public doc:string;
}
