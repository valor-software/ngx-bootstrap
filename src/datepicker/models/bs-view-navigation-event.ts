import { BsDatepickerViewMode } from './bs-datepicker-view.model';
import { TimeUnit } from 'ngx-bootstrap/chronos';

export interface BsViewNavigationEvent {
  unit?: TimeUnit;
  viewMode: BsDatepickerViewMode;
}
