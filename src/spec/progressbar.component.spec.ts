import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { ProgressbarModule } from '../progressbar/progressbar.module';

@Component({
  selector: 'progressbar-test',
  template: ''
})
class TestProgressbarComponent extends ProgressbarComponent {}

describe('Component: Progress Bar', () => {
  let fixture: ComponentFixture<TestProgressbarComponent>;
  let element: any;

  it('should work correctly with default values', () => {
    const tpl = `<progressbar></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
    expect(element.classList).toContain('progress');
    expect(element.getAttribute('max')).toEqual('100');
  });

  it('checking appropriate styles after setting up of type', () => {
    const tpl = `<progressbar [type]="'warning'"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = element.querySelector('bar');
    expect(barElement.classList).toContain('progress-bar-warning');
  });

  it('checking of correct calculation of percent value(bar length)', () => {
    const tpl = `<progressbar [max]="100" [value]="60"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = element.querySelector('bar');
    expect(barElement.style.width).toEqual('60%');
  });

  it('checking of correct working with dynamically changed values', () => {
    const componentData = {
      initial: {
        type: 'warning',
        max: 100,
        value: 75
      },
      changed: {
        type: 'danger',
        max: 200,
        value: 100
      }
    };
    const tpl = `<progressbar [type]="typeValue" [value]="valueValue" [animate]="true" [max]="maxValue"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    const context = fixture.debugElement.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = element.querySelector('bar');

    context.maxValue = componentData.initial.max;
    context.typeValue = componentData.initial.type;
    context.valueValue = componentData.initial.value;
    fixture.detectChanges();
    expect(barElement.style.width).toEqual('75%');
    expect(barElement.classList).toContain('progress-bar-warning');

    context.maxValue = componentData.changed.max;
    context.typeValue = componentData.changed.type;
    context.valueValue = componentData.changed.value;
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar-danger');
    expect(barElement.style.width).toEqual('50%');
  });
});
