import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CellHoverEvent, DatepickerRenderOptions, DaysCalendarViewModel, DayViewModel } from '../../models/index';
export declare class BsDaysCalendarViewComponent {
    calendar: DaysCalendarViewModel;
    options: DatepickerRenderOptions;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<DayViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    selectDay(event: DayViewModel): void;
    hoverDay(cell: DayViewModel, isHovered: boolean): void;
}
