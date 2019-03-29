import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'demo-datepicker-basic',
  templateUrl: './basic.html'
})
export class DemoDatepickerBasicComponent {

constructor( private _bsLocaleService: BsLocaleService) { this._bsLocaleService.use('et'); }

}
