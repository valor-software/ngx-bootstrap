import { Injectable } from '@angular/core';

@Injectable()

export class TimepickerConfig {
  public hourStep: number = 1;
  public minuteStep: number = 5;
  public showMeridian: boolean = true;
  public meridians:Array<string> = ['AM', 'PM'];
  public readonlyInput: boolean = false;
  public mousewheel: boolean = true;
  public arrowkeys: boolean = true;
  public showSpinners: boolean = true;
  public min: number = void 0;
  public max: number = void 0;
}
