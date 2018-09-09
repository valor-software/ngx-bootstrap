import { TestBed, async } from '@angular/core/testing';
import { BsDatepickerContainerComponent } from './bs-datepicker-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsLocaleService } from 'ngx-bootstrap*';
import { BsDaterangepickerContainerComponent } from './bs-daterangepicker-container.component';

describe('BsDaterangepickerContainerComponent', () => {
  let actions: jasmine.SpyObj<BsDatepickerActions>;
  let effects: jasmine.SpyObj<BsDatepickerEffects>;


  beforeEach(async(() => {

    actions = jasmine.createSpyObj('BsDatepickerActions', ['select']);
    effects =  jasmine.createSpyObj('BsDatepickerEffects', ['init']);

    TestBed.configureTestingModule({
      declarations: [
        BsDaterangepickerContainerComponent
      ],
      providers: [ BsDatepickerConfig, BsDatepickerStore, BsLocaleService,
        {provide: BsDatepickerActions, useValue: actions}, { provide: BsDatepickerEffects, useValue: effects}],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the BsDaterangepickerContainerComponent', async(() => {
    const fixture = TestBed.createComponent(BsDaterangepickerContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should have call daySelectHandler on onCustomDateSelect', async(() => {
    const fixture = TestBed.createComponent(BsDaterangepickerContainerComponent);
    const component = fixture.componentInstance;
    const bsCustomDate = {value: new Date(), label: 'Today'};
    const  spy = spyOn(component,'daySelectHandler');
    component.onCustomDateSelect(bsCustomDate);
    expect(spy).toHaveBeenCalledWith({isDisabled: false, isOtherMonth: false,
      date: bsCustomDate.value, label: bsCustomDate.label});
  }));
});
