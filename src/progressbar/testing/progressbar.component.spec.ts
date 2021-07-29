import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ProgressbarComponent, ProgressbarModule } from '../index';

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
      imports: [ProgressbarModule.forRoot()]
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    component.animate = false;
    component.animate = true;

    expect(component.animate).toBeTruthy();
  });

  it('check striped setter when _striped is equal to setter\'s argument', () => {
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    component.striped = false;
    component.striped = true;

    expect(component.striped).toBeTruthy();
  });

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
    const progressElement = element.querySelector('bar')?.parentElement;

    expect(progressElement?.classList).toContain('progress');
    expect(progressElement?.getAttribute('max')).toEqual('100');
  });

  it('checking appropriate styles after setting up of type', () => {
    const tpl = `<progressbar [type]="typeValue"></progressbar>`;
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    element = fixture.nativeElement;
    const context = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const barElement = element.querySelector('bar');
    context.typeValue = 'warning';
    fixture.detectChanges();

    expect(barElement?.classList).toContain('progress-bar-warning');
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
    const barElement: HTMLElement|null = element.querySelector('bar');
    expect(barElement?.style.width).toEqual('60%');
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
    const barElement: HTMLElement|null = element.querySelector('bar');

    context.maxValue = componentData.initial.max;
    context.typeValue = componentData.initial.type;
    context.valueValue = componentData.initial.value;
    fixture.detectChanges();
    expect(barElement?.style.width).toEqual('75%');
    expect(barElement?.classList).toContain('progress-bar-warning');

    context.maxValue = componentData.changed.max;
    context.typeValue = componentData.changed.type;
    context.valueValue = componentData.changed.value;
    fixture.detectChanges();
    expect(barElement?.classList).toContain('progress-bar-danger');
    expect(barElement?.style.width).toEqual('50%');
  });
});

describe('progress bar', () => {
  const tpl = `<progressbar [type]="typeValue" [animate]="true" [striped]="true"></progressbar>`;
  let fixture: ComponentFixture<TestProgressbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    fixture = TestBed.overrideComponent(TestProgressbarComponent, {
      set: { template: tpl }
    })
      .createComponent(TestProgressbarComponent);
    fixture.detectChanges();
  });

  it('check type binding does not override other class names', fakeAsync(() => {

    const context = fixture.debugElement.componentInstance;
    const element = fixture.nativeElement;
    const barElement: HTMLElement = element.querySelector('bar');
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    // todo: isBs3 only
    // expect(barElement.classList).toContain('active');


    context.typeValue = 'success';
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    // todo: isBs3 only
    // expect(barElement.classList).toContain('active');
    expect(barElement.classList).toContain('progress-bar-success');
    expect(barElement.classList).toContain('bg-success');

    context.typeValue = 'info';
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    // todo: isBs3 only
    // expect(barElement.classList).toContain('active');
    expect(barElement.classList).toContain('progress-bar-info');
    expect(barElement.classList).toContain('bg-info');
    expect(barElement.classList).not.toContain('progress-bar-success');
    expect(barElement.classList).not.toContain('bg-success');

    context.typeValue = null;
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    // todo: isBs3 only
    // expect(barElement.classList).toContain('active');
    expect(barElement.classList).not.toContain('progress-bar-info');
    expect(barElement.classList).not.toContain('bg-info');
  }));

});
