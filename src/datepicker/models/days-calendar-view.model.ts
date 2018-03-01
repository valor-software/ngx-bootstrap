// todo: split navigation settings
import { WeekViewModel } from './week-view.model';
import { NavigationViewModel } from './navigation-view.model';

export interface DaysCalendarViewModel extends NavigationViewModel {
  weeks: WeekViewModel[];
  // additional information
  month: Date;
  weekNumbers: string[];
  weekdays: string[];
}
