import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-meridian',
  templateUrl: './meridian.html'
})
export class DemoTimepickerMeridianComponent {
  public ismeridian:boolean = true;

  public mytime:Date = new Date();

  public toggleMode():void {
    this.ismeridian = !this.ismeridian;
  }

}
