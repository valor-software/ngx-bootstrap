import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';
const { fireEvent } = require('../../scripts/helpers');

const overTemplate = `
    <div class="form-group">
      <label>Or use custom triggers, like focus: </label>
      <input type="text" name="clickMe" id="test-tooltip1" value="Click me!" [tooltipPopupDelay] = "delay" tooltip="See? Now click away..."  tooltipTrigger="focus"  class="form-control" />
    </div>
  
    <div class="form-group" ngClass="{'has-error' : !inputModel}">
      <label>Disable tooltips conditionally:</label>
      <input type="text" name="inputModel"  class="form-control"
             placeholder="Hover over this for a tooltip until this is filled"
             tooltip="Enter something in this input field to disable this tooltip"
             tooltipPlacement="top"
             tooltipTrigger="mouseenter"/>
    </div>
             
    <p>
    Programatically show/hide tooltip
     <a href="#" [tooltip]="'Foo'"
                 #tooltip="bs-tooltip">Check me out!</a>
     <button class="btn btn-primary" id="showTooltipBtn" (click)="tooltip.show()">Show tooltip</button>
     <button class="btn btn-danger" id="hideTooltipBtn" (click)="tooltip.hide()">Hide tooltip</button>
   </p>`;

xdescribe('Directives: Tooltips', () => {
  let fixture: ComponentFixture<TestTooltipComponent>;
  let context: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTooltipComponent],
      imports: [TooltipModule, FormsModule]
    });
    TestBed.overrideComponent(TestTooltipComponent, {set: {template: overTemplate}});
    fixture = TestBed.createComponent(TestTooltipComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = undefined;
    context = undefined;
  });

  it('tooltip should not be displayed until user does not any actions', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('.tooltip-inner')).toBeNull();
  });

  it('tooltip should be displayed by focus event after 0 ms by default', fakeAsync(() => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const tooltipElement: any = element.querySelector('#test-tooltip1');
    tooltipElement.focus();
    fixture.detectChanges();
    tick(0);
    fixture.detectChanges();
    expect(element.querySelector('.tooltip-inner')).not.toBeNull();
  }));

  it('tooltip should be displayed after specified delay', fakeAsync(() => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const tooltipElement: any = element.querySelector('#test-tooltip1');
    context.delay = 1000;
    fixture.detectChanges();
    tooltipElement.focus();
    fixture.detectChanges();
    tick(1100);
    fixture.detectChanges();
    expect(element.querySelector('.tooltip-inner')).not.toBeNull();
  }));

  xit('tooltip should be displayed by mouseenter event', fakeAsync(() => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const tooltipElement: any = element.querySelector('#test-tooltip1');
    fireEvent(tooltipElement, 'mouseenter');
    fixture.detectChanges();
    tick(context.delay);
    fixture.detectChanges();
    expect(element.querySelector('.tooltip-inner')).not.toBeNull();
  }));

  it('tooltip should be displayed after user clicks on specified DOM element which refers to showing the tooltip', fakeAsync(() => {
    const element: Element = fixture.debugElement.nativeElement;
    const showTooltipBtn: any = element.querySelector('#showTooltipBtn');
    showTooltipBtn.click();
    fixture.detectChanges();
    tick(context.delay);
    fixture.detectChanges();
    expect(element.querySelector('.tooltip-inner')).not.toBeNull();
  }));

  it('tooltip should be hidden after user clicks on specified DOM element which refers to hiding the tooltip', fakeAsync(() => {
    const element: Element = fixture.debugElement.nativeElement;
    const showTooltipBtn: any = element.querySelector('#hideTooltipBtn');
    showTooltipBtn.click();
    fixture.detectChanges();
    tick(context.delay);
    fixture.detectChanges();
    expect(element.querySelector('.tooltip-inner')).toBeNull();
  }));
});

@Component({
  selector: 'test-tooltip',
  template: ''
})
class TestTooltipComponent {
  public delay: number = 0;
}
