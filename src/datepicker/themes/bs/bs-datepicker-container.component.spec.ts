import { TestBed, async } from '@angular/core/testing';
import { BsDatepickerContainerComponent } from './bs-datepicker-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsLocaleService } from 'ngx-bootstrap*';

describe('BsDatepickerContainerComponent', () => {
 let actions: jasmine.SpyObj<BsDatepickerActions>;
 let effects: jasmine.SpyObj<BsDatepickerEffects>;


 beforeEach(async(() => {

   actions = jasmine.createSpyObj('BsDatepickerActions', ['select']);
   effects =  jasmine.createSpyObj('BsDatepickerEffects', ['init']);

   TestBed.configureTestingModule({
      declarations: [
        BsDatepickerContainerComponent
      ],
      providers: [ BsDatepickerConfig, BsDatepickerStore, BsLocaleService,
        {provide: BsDatepickerActions, useValue: actions}, { provide: BsDatepickerEffects, useValue: effects}],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

 it('should create the BsDatepickerContainerComponent', async(() => {
    const fixture = TestBed.createComponent(BsDatepickerContainerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  }));

 it('should have call select on onCustomDateSelect', async(() => {
    const fixture = TestBed.createComponent(BsDatepickerContainerComponent);
    const component = fixture.componentInstance;
    const bsCustomDate = {value: new Date(), label: 'Today'};
    component.onCustomDateSelect(bsCustomDate);
    expect(actions.select).toHaveBeenCalledWith(bsCustomDate.value);

  }));
});
