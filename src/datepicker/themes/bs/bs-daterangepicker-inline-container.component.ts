import { OnInit, OnDestroy, ElementRef, Component } from '@angular/core';
import { BsDaterangepickerContainerComponent } from './bs-daterangepicker-container.component';

import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';

@Component({
    selector: 'bs-daterangepicker-inline-container',
    providers: [BsDatepickerStore, BsDatepickerEffects],
    templateUrl: './bs-datepicker-view.html',
    host: {
        '(click)': '_stopPropagation($event)',
        style: 'display: inline-block;'
    },
    animations: [datepickerAnimation]
})
export class BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent
    implements OnInit, OnDestroy {
    constructor(
        _config: BsDatepickerConfig,
        _store: BsDatepickerStore,
        _element: ElementRef,
        _actions: BsDatepickerActions,
        _effects: BsDatepickerEffects,
        _positioningService: PositioningService
    ) {
        super(_effects, _actions, _config, _store, _element, _positioningService);
    }
}
