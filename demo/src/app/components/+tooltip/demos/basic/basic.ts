import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Popper } from 'ngx-bootstrap/popper';

@Component({
  selector: 'demo-tooltip-basic',
  templateUrl: './basic.html'
})
export class DemoTooltipBasicComponent implements AfterViewInit {

  @ViewChild('exampleTooltip') exampleTooltip: ElementRef;
  @ViewChild('tooltip') tooltip: ElementRef;

  ngAfterViewInit() {
    const instance = new Popper(this.exampleTooltip.nativeElement, this.tooltip.nativeElement, {
      placement: 'right'
    });
  }
}
