import { CalendarCellViewModel } from './calendar-cell-view.model';

export interface CellHoverEvent {
  cell: CalendarCellViewModel;
  isHovered: boolean;
}
