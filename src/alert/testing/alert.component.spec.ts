import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent, AlertConfig, AlertModule  } from '../index';

@Component({
    selector: 'alert-test', template: '',
    standalone: true
})
class TestAlertComponent extends AlertComponent {
  constructor(config: AlertConfig, changeDetection: ChangeDetectorRef) {
    super(config, changeDetection);
  }
}

describe('Component: Alert', () => {
  let fixture: ComponentFixture<TestAlertComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any;
  const overTemplate = `
    <div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
      <button *ngIf="dismissible" type="button" class="close btn-close" (click)="onClose()" (touch)="onClose()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
        <span class="sr-only visually-hidden">Close</span>
      </button>
    </div>
  `;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AlertModule, TestAlertComponent]
});
    TestBed.overrideComponent(TestAlertComponent, {
      set: {template: overTemplate}
    });
    fixture = TestBed.createComponent(TestAlertComponent);
    context = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  it('should have a default type alert-warning', () => {
    context.ngOnInit();
    expect(context.type).toEqual(`warning`);
  });

  it('should have class dismissible if dismissible=true', () => {
    context.dismissible = true;
    context.ngOnInit();
    expect(context.classes).toEqual(`alert-dismissible`);
  });

  it('should be dismissed by timeout', (done: () => void) => {
    context.dismissOnTimeout = 1000;
    context.onClosed.subscribe(() => {
      expect(context.isOpen).toBeFalsy();
      done();
    });
    context.ngOnInit();
  });

  it('should be closed by public method onClose', () => {
    context.ngOnInit();
    expect(context.isOpen).toBeTruthy();
    context.close();
    expect(context.isOpen).toBeFalsy();
  });
});
