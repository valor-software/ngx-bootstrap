import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarComponent, ProgressbarModule } from '../progressbar';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'progressbar-test',
  template: ''
})
class TestProgressbarComponent extends ProgressbarComponent {}

describe('Component: Progress Bar', () => {
  let fixture: ComponentFixture<TestProgressbarComponent>;
  let element: HTMLElement;
  let component: ProgressbarComponent;

  it('check animate setter when _animate is equal to setter\'s argument', () => {
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    component._animate = false;

    component.animate = true;

    expect(component._animate).toBeTruthy();
  });

  it('check striped setter when _striped is equal to setter\'s argument', () => {
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    component._striped = false;

    component.striped = true;

    expect(component._striped).toBeTruthy();
  });

  it('should work correctly with default values', () => {
    const tpl = `<progressbar></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
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
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = fixture.elementRef;
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-warning');
  });

  it('checking of correct calculation of percent value(bar length)', () => {
    const tpl = `<progressbar [max]="100" [value]="60"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = fixture.elementRef;
    expect(barElement.nativeElement.firstChild.firstChild.style.width).toEqual('60%');
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
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    const context = fixture.debugElement.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = fixture.elementRef;

    context.maxValue = componentData.initial.max;
    context.typeValue = componentData.initial.type;
    context.valueValue = componentData.initial.value;
    fixture.detectChanges();
    expect(barElement.nativeElement.firstChild.firstChild.style.width).toEqual('75%');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-warning');

    context.maxValue = componentData.changed.max;
    context.typeValue = componentData.changed.type;
    context.valueValue = componentData.changed.value;
    fixture.detectChanges();
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-danger');
    expect(barElement.nativeElement.firstChild.firstChild.style.width).toEqual('50%');
  });

  it('check type binding does not override other class names', () => {
    const tpl = `<progressbar [type]="typeValue" [animate]="true" [striped]="true"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot(), BrowserDynamicTestingModule]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    const context = fixture.debugElement.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
    const barElement = fixture.elementRef;
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-striped');

    context.typeValue = 'success';
    fixture.detectChanges();
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-striped');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-success');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('bg-success');

    context.typeValue = 'info';
    fixture.detectChanges();
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-striped');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-info');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('bg-info');
    expect(barElement.nativeElement.firstChild.firstChild.classList).not.toContain('progress-bar-success');
    expect(barElement.nativeElement.firstChild.firstChild.classList).not.toContain('bg-success');

    context.typeValue = null;
    fixture.detectChanges();
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar');
    expect(barElement.nativeElement.firstChild.firstChild.classList).toContain('progress-bar-striped');
    expect(barElement.nativeElement.firstChild.firstChild.classList).not.toContain('progress-bar-info');
    expect(barElement.nativeElement.firstChild.firstChild.classList).not.toContain('bg-info');
  });
});
