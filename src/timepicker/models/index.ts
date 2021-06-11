import { InjectionToken, Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface ControlValueAccessorModel {
  provide: InjectionToken<ControlValueAccessor>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useExisting: Type<any>;
  multi: boolean;
}
