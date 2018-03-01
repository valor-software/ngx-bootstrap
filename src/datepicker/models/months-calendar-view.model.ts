// months calendar
import { CalendarCellViewModel } from './calendar-cell-view.model';
import { NavigationViewModel } from './navigation-view.model';

export interface MonthsCalendarViewModel extends NavigationViewModel{
  months: CalendarCellViewModel[][];
}
