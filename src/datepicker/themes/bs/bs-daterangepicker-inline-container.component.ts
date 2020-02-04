import { OnInit, OnDestroy, ElementRef, Component, Renderer2 } from '@angular/core';
import { BsDaterangepickerContainerComponent } from './bs-daterangepicker-container.component';

import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';

@Component({
  selector: 'bs-daterangepicker-inline-container',
  providers: [BsDatepickerStore, BsDatepickerEffects],
  templateUrl: './bs-datepicker-view.html',
  host: {
    '(click)': '_stopPropagation($event)'
  },
  animations: [datepickerAnimation]
})
export class BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent
  implements OnInit, OnDestroy {

  constructor(
    _renderer: Renderer2,
    _config: BsDatepickerConfig,
    _store: BsDatepickerStore,
    _element: ElementRef,
    _actions: BsDatepickerActions,
    _effects: BsDatepickerEffects,
    _positioningService: PositioningService
  ) {
    super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);

    _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
    _renderer.setStyle(_element.nativeElement, 'position', 'static');
  }
}
