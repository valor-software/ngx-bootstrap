import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CellHoverEvent, MonthsCalendarViewModel, CalendarCellViewModel } from '../../models/index';
export declare class BsMonthCalendarViewComponent {
    calendar: MonthsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewMonth(month: CalendarCellViewModel): void;
    hoverMonth(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
}
