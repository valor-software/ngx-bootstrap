import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { BsDropdownContainerComponent, BsDropdownModule, BsDropdownState } from 'ngx-bootstrap/dropdown';
import { window } from 'ngx-bootstrap/utils';

describe('BsDropdownContainerComponent tests', () => {
  let fixture: ComponentFixture<BsDropdownContainerComponent>;
  let component: BsDropdownContainerComponent;
  /* tslint:disable-next-line:no-inferred-empty-object-type */
  const stateSubject = new Subject();
  let fakeService;

  beforeEach(() => {
    fakeService = {
      isOpenChange: stateSubject.asObservable()
    };
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [{ provide: BsDropdownState, useValue: fakeService }]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsDropdownContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be null', () => {
    expect(component).not.toBeNull();
  });

  it('should be call isOpenChange method', () => {
    const tempVal = window.__theme;
    window.__theme = 'bs4';
    const spy = spyOn((component as any).cd, 'detectChanges');

    stateSubject.next(true);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    window.__theme = tempVal;
  });
});
