import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dynamic-content-rendering',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-content-rendering.html',
  styleUrls: ['./dynamic-content-rendering.css']
})
export class DynamicContentRenderingComponent {

  messages: string[] = [];

  message(s: string) {
    this.messages.push(s);
  }

}
