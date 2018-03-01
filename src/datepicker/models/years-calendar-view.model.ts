// years calendar
import { CalendarCellViewModel } from './calendar-cell-view.model';
import { NavigationViewModel } from './navigation-view.model';

export interface YearsCalendarViewModel extends NavigationViewModel {
  years: CalendarCellViewModel[][];
}
