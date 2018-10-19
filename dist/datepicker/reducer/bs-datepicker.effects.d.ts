import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../bs-datepicker.config';
import { BsDatepickerViewMode, DatepickerRenderOptions, DaysCalendarViewModel, MonthsCalendarViewModel, YearsCalendarViewModel } from '../models/index';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsDatepickerStore } from './bs-datepicker.store';
import { BsLocaleService } from '../bs-locale.service';
export declare class BsDatepickerEffects {
    private _actions;
    private _localeService;
    viewMode: Observable<BsDatepickerViewMode>;
    daysCalendar: Observable<DaysCalendarViewModel[]>;
    monthsCalendar: Observable<MonthsCalendarViewModel[]>;
    yearsCalendar: Observable<YearsCalendarViewModel[]>;
    options: Observable<DatepickerRenderOptions>;
    private _store;
    private _subs;
    constructor(_actions: BsDatepickerActions, _localeService: BsLocaleService);
    init(_bsDatepickerStore: BsDatepickerStore): BsDatepickerEffects;
    /** setters */
    setValue(value: Date): void;
    setRangeValue(value: Date[]): void;
    setMinDate(value: Date): BsDatepickerEffects;
    setMaxDate(value: Date): BsDatepickerEffects;
    setDisabled(value: boolean): BsDatepickerEffects;
    setOptions(_config: BsDatepickerConfig): BsDatepickerEffects;
    /** view to mode bindings */
    setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    /** event handlers */
    setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    registerDatepickerSideEffects(): BsDatepickerEffects;
    destroy(): void;
}
