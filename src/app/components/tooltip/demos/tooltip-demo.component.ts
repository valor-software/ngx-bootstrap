import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tooltip-demo',
  templateUrl: './tooltip-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipDemoComponent {
  public dynamicTooltip:string = 'Hello, World!';
  public dynamicTooltipText:string = 'dynamic';
  public htmlTooltip:string = 'I\'ve been made <b>bold</b>!';
  public tooltipModel:any = {text: 'foo', index: 1};

  public tooltipStateChanged(state: boolean):void {
    console.log(`Tooltip is open: ${state}`);
  }
}
