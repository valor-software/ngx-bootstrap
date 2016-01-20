import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class TypeaheadEventBus {
  private _values:Subject<any> = new Subject();

  onValueChanged(value:any) {
    this._values.next(value);
  }

  values():Subject<any> {
    return this._values;
  }
}
