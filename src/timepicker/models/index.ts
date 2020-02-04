import { InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface ControlValueAccessorModel {
  provide: InjectionToken<ControlValueAccessor>;
  // tslint:disable-next-line:no-any
  useExisting: Type<any>;
  multi: boolean;
}
