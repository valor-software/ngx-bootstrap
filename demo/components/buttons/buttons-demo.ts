import { Component } from '@angular/core';

// webpack html imports
let template = require('./buttons-demo.html');

@Component({
  selector: 'buttons-demo',
  template: template
})
export class ButtonsDemoComponent {
  public singleModel:string = '1';
  public radioModel:string = 'Middle';
  public checkModel:any = {left: false, middle: true, right: false};
}
