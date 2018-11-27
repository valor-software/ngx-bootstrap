import { InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';
import { Type } from '@angular/core/src/type';

export interface ControlValueAccessorModel {
  provide: InjectionToken<ControlValueAccessor>;
  // tslint:disable-next-line:no-any
  useExisting: Type<any>;
  multi: boolean;
}
