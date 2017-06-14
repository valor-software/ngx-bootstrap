import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-meridian',
  templateUrl: './meridian.html'
})
export class DemoTimepickerMeridianComponent {
  public ismeridian: boolean = true;

  public mytime: Date = new Date();

  public mytime2: Date = new Date();

  public meridianText = ['12h', '24h'];

  public toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
}
