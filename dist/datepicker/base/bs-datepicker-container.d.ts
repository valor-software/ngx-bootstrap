import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';
import { BsDatepickerEffects } from '../reducer/bs-datepicker.effects';
import { Observable } from 'rxjs/Observable';
import { BsDatepickerViewMode, BsNavigationEvent, CalendarCellViewModel, CellHoverEvent, DatepickerRenderOptions, DaysCalendarViewModel, DayViewModel, MonthsCalendarViewModel, YearsCalendarViewModel } from '../models/index';
export declare abstract class BsDatepickerAbstractComponent {
    containerClass: string;
    _effects: BsDatepickerEffects;
    _customRangesFish: BsCustomDates[];
    minDate: Date;
    maxDate: Date;
    isDisabled: boolean;
    viewMode: Observable<BsDatepickerViewMode>;
    daysCalendar: Observable<DaysCalendarViewModel[]>;
    monthsCalendar: Observable<MonthsCalendarViewModel[]>;
    yearsCalendar: Observable<YearsCalendarViewModel[]>;
    options: Observable<DatepickerRenderOptions>;
    setViewMode(event: BsDatepickerViewMode): void;
    navigateTo(event: BsNavigationEvent): void;
    dayHoverHandler(event: CellHoverEvent): void;
    monthHoverHandler(event: CellHoverEvent): void;
    yearHoverHandler(event: CellHoverEvent): void;
    daySelectHandler(day: DayViewModel): void;
    monthSelectHandler(event: CalendarCellViewModel): void;
    yearSelectHandler(event: CalendarCellViewModel): void;
    _stopPropagation(event: any): void;
}
