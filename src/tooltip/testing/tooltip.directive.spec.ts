import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent } from '../../../scripts/helpers';
import { TooltipModule } from '../index';

@Component({
  selector: 'test-tooltip',
  template: ''
})
class TestTooltipComponent {
  delay = 0;
}

const overTemplate = `
    <div class="form-group">
      <label>Or use custom triggers, like focus: </label>
      <input type="text" name="clickMe" id="test-tooltip1" value="Click me!"
      [delay] = "delay" tooltip="See? Now click away..."  triggers="focus mouseenter"  class="form-control" />
    </div>

    <div class="form-group" ngClass="{'has-error' : !inputModel}">
      <label>Disable tooltips conditionally:</label>
      <input type="text" name="inputModel"  class="form-control"
             placeholder="Hover over this for a tooltip until this is filled"
             tooltip="Enter something in this input field to disable this tooltip"
             placement="top" />
    </div>

    <p>
    Programatically show/hide tooltip
     <a href="#" tooltip="Foo" #tooltip="bs-tooltip">Check me out!</a>
     <button class="btn btn-primary" id="showTooltipBtn" (click)="tooltip.show()">Show tooltip</button>
     <button class="btn btn-danger" id="hideTooltipBtn" (click)="tooltip.hide()">Hide tooltip</button>
   </p>`;

describe('Directives: Tooltips', () => {
  let fixture: ComponentFixture<TestTooltipComponent>;
  let context: TestTooltipComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTooltipComponent],
      imports: [TooltipModule.forRoot(), FormsModule]
    });
    TestBed.overrideComponent(TestTooltipComponent, {
      set: {template: overTemplate}
    });
    fixture = TestBed.createComponent(TestTooltipComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tooltip should not be displayed until user does not any actions', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('.tooltip-inner')).toBeNull();
  });

  it('tooltip should be displayed by focus event after 0 ms by default', fakeAsync(() => {
      const element: HTMLElement = fixture.debugElement.nativeElement;
      const tooltipElement = element.querySelector('#test-tooltip1') as HTMLElement;

      tooltipElement.focus();
      fixture.detectChanges();
      expect(element.querySelector('.tooltip-inner')).not.toBeNull();
    })
  );

  it(
    'tooltip should be displayed after specified delay',
    fakeAsync(() => {
      const element: HTMLElement = fixture.debugElement.nativeElement;
      const tooltipElement = element.querySelector('#test-tooltip1') as HTMLElement;
      context.delay = 1000;
      fixture.detectChanges();
      tooltipElement.focus();
      fixture.detectChanges();
      tick(1100);
      fixture.detectChanges();
      expect(element.querySelector('.tooltip-inner')).not.toBeNull();
    })
  );

  it('tooltip should be displayed by mouseenter event', fakeAsync(() => {
      const element: HTMLElement = fixture.debugElement.nativeElement;
      const tooltipElement = element.querySelector('#test-tooltip1') as HTMLElement;
      fireEvent(tooltipElement, 'mouseenter');
      fixture.detectChanges();
      tick(context.delay);
      fixture.detectChanges();
      expect(element.querySelector('.tooltip-inner')).not.toBeNull();
    })
  );

  it(
    'tooltip should be displayed after user clicks on specified DOM element which refers to showing the tooltip',
    fakeAsync(() => {
      const element: Element = fixture.debugElement.nativeElement;
      const showTooltipBtn = element.querySelector('#showTooltipBtn') as HTMLElement;
      showTooltipBtn.click();
      fixture.detectChanges();
      tick(context.delay);
      fixture.detectChanges();
      expect(element.querySelector('.tooltip-inner')).not.toBeNull();
    })
  );

  it(
    'tooltip should be hidden after user clicks on specified DOM element which refers to hiding the tooltip',
    fakeAsync(() => {
      const element: Element = fixture.debugElement.nativeElement;
      const showTooltipBtn = element.querySelector('#hideTooltipBtn') as HTMLElement;
      showTooltipBtn.click();
      fixture.detectChanges();
      tick(context.delay);
      fixture.detectChanges();
      expect(element.querySelector('.tooltip-inner')).toBeNull();
    })
  );
});

