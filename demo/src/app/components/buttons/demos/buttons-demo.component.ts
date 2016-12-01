import { Component } from '@angular/core';

@Component({
  selector: 'buttons-demo',
  templateUrl: './buttons-demo.component.html'
})
export class ButtonsDemoComponent {
  public singleModel:string = '1';
  public radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};
}
