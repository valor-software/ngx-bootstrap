// days matrix: day cell view model
import { CalendarCellViewModel } from './calendar-cell-view.model';

export interface DayViewModel extends CalendarCellViewModel {
  isOtherMonth?: boolean;
  isInRange?: boolean;
  isSelectionStart?: boolean;
  isSelectionEnd?: boolean;
  isSelected?: boolean;
  // day index
  monthIndex?: number;
  weekIndex?: number;
  dayIndex?: number;
}
