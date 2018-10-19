import { EventEmitter } from '@angular/core';
import { BsDatepickerViewMode, BsNavigationDirection, DaysCalendarViewModel } from '../../models/index';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
export declare class BsDatepickerNavigationViewComponent {
    private _config;
    calendar: DaysCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationDirection>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    navTo(down: boolean): void;
    config: BsDatepickerConfig;
    view(viewMode: BsDatepickerViewMode): void;
    constructor(_config: BsDatepickerConfig);
}
