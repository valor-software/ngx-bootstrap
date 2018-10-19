import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CalendarCellViewModel, CellHoverEvent, YearsCalendarViewModel } from '../../models/index';
export declare class BsYearsCalendarViewComponent {
    calendar: YearsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewYear(year: CalendarCellViewModel): void;
    hoverYear(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
}
