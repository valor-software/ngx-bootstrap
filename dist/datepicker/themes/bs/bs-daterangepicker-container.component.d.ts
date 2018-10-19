import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models/index';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { Subscription } from 'rxjs/Subscription';
export declare class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent implements OnInit, OnDestroy {
    private _config;
    private _store;
    private _actions;
    value: Date[];
    valueChange: EventEmitter<Date[]>;
    _rangeStack: Date[];
    _subs: Subscription[];
    constructor(_config: BsDatepickerConfig, _store: BsDatepickerStore, _actions: BsDatepickerActions, _effects: BsDatepickerEffects);
    ngOnInit(): void;
    daySelectHandler(day: DayViewModel): void;
    ngOnDestroy(): void;
}
