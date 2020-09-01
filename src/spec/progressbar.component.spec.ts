import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressbarComponent, ProgressbarModule } from 'ngx-bootstrap/progressbar';

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
    component._animate = false;
    component.bars = [];

    component.animate = true;

    expect(component._animate).toBeTruthy();
  });

  it('check striped setter when _striped is equal to setter\'s argument', () => {
    TestBed.configureTestingModule({
      declarations: [TestProgressbarComponent],
      imports: [ProgressbarModule.forRoot()]
    });
    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    component._striped = false;
    component.bars = [];

    component.striped = true;

    expect(component._striped).toBeTruthy();
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
    const barElement: HTMLElement = element.querySelector('bar');
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
    const barElement: HTMLElement = element.querySelector('bar');

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

  it('check type binding does not override other class names', () => {
    const tpl = `<progressbar [type]="typeValue" [animate]="true" [striped]="true"></progressbar>`;
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
    const barElement: HTMLElement = element.querySelector('bar');
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    expect(barElement.classList).toContain('active');

    context.typeValue = 'success';
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    expect(barElement.classList).toContain('active');
    expect(barElement.classList).toContain('progress-bar-success');
    expect(barElement.classList).toContain('bg-success');

    context.typeValue = 'info';
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    expect(barElement.classList).toContain('active');
    expect(barElement.classList).toContain('progress-bar-info');
    expect(barElement.classList).toContain('bg-info');
    expect(barElement.classList).not.toContain('progress-bar-success');
    expect(barElement.classList).not.toContain('bg-success');

    context.typeValue = null;
    fixture.detectChanges();
    expect(barElement.classList).toContain('progress-bar');
    expect(barElement.classList).toContain('progress-bar-striped');
    expect(barElement.classList).toContain('active');
    expect(barElement.classList).not.toContain('progress-bar-info');
    expect(barElement.classList).not.toContain('bg-info');
  });
});
