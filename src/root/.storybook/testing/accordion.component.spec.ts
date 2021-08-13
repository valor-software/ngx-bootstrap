import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import AccordionComponent from '../stories/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from '@ngx-bootstrap/accordion';


describe('Component: Accordion (stories)', () => {
  let fixture: ComponentFixture<AccordionComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionComponent],
      imports: [BrowserAnimationsModule, AccordionModule.forRoot()]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AccordionComponent);
      context = fixture.componentInstance;
      element = fixture.nativeElement;
    });
    fixture.detectChanges();
  });

  it ('should has opened first panel with isOpen true', () => {
    context.isOpen = true;
    fixture.detectChanges();
    const classList = element.querySelectorAll('accordion-group')[0].classList;
    expect(classList).toContain('panel-open');
  });

  it('should be closed other panels if closeOthers is true', fakeAsync(() => {
    context.closeOthers = true;
    fixture.detectChanges();
    const panels = element.querySelectorAll('accordion-group');
    panels[1].click();
    panels[2].click();
    tick(100);
    fixture.detectChanges();
    const panelClassList = element.querySelectorAll('accordion-group')[1].classList;
    expect(panelClassList).toContain('panel-open');
  }))

  xit('should be css property be truthy with bootstrap 3', fakeAsync (() => {
    context.bootstrapVersion = 3;
    fixture.detectChanges();
    tick(10);
    const panel = element.querySelectorAll('accordion-group')[0] as HTMLElement;
    console.log('border', panel.style.borderRadius)
    expect(panel.style.borderRadius).toBeTruthy();
  }))

  // it('should have no open panels', () => {
  //   expectOpenPanels(element, [false, false, false]);
  // });
  //
  // it('should have open panel based on binding', () => {
  //   context.panels[0].isOpen = true;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, false, false]);
  // });
  //
  // it('should toggle panels independently', () => {
  //   context.oneAtATime = false;
  //
  //   context.panels[1].isOpen = true;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, true, false]);
  //
  //   context.panels[0].isOpen = true;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, true, false]);
  //
  //   context.panels[1].isOpen = false;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, false, false]);
  //
  //   context.panels[2].isOpen = true;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, false, true]);
  //
  //   context.panels[0].isOpen = false;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, true]);
  //
  //   context.panels[2].isOpen = false;
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, false]);
  // });
  //
  // it('should have the appropriate heading', () => {
  //   element.querySelectorAll('.panel-heading .accordion-toggle button')
  //     .forEach((title: HTMLElement, idx: number) => {
  //       const expectedTitle = `Panel ${idx + 1}`;
  //       expect(hasTitle(title, expectedTitle)).toBeTruthy();
  //     });
  // });
  //
  // it('should only open one at a time', () => {
  //   const headingLinks = element.querySelectorAll('.accordion-toggle');
  //
  //   headingLinks[0].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, false, false]);
  //
  //   headingLinks[2].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, true]);
  //
  //   headingLinks[2].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, false]);
  // });
  //
  // it('should have only one open panel even if binding says otherwise', () => {
  //   context.panels[0].isOpen = true;
  //   context.panels[1].isOpen = true;
  //   // which of panels should be opened there? the first or the last one? (now - last)
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, true, false]);
  // });
  //
  // it('should not open disabled panels from click', () => {
  //   context.panels[0].isDisabled = true;
  //   fixture.detectChanges();
  //   const headingLinks = element.querySelectorAll(
  //     '.panel-title .accordion-toggle'
  //   );
  //   headingLinks[0].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, false]);
  // });
  //
  // it('should modify the parent isOpen state when changed internally (2 way binding)', fakeAsync(() => {
  //   const headingLinks = element.querySelectorAll('.accordion-toggle');
  //
  //   // Clicking (internal state modified)
  //   headingLinks[0].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [true, false, false]);
  //
  //   // State modified by parent component
  //
  //   headingLinks[2].click();
  //   fixture.detectChanges();
  //   expectOpenPanels(element, [false, false, true]);
  //
  //
  //   // Modified by binding
  //   context.panels[1].isOpen = true;
  //   fixture.detectChanges();
  //   tick();
  //   expect(context.panels[0].isOpen).toBe(false);
  //   expect(context.panels[1].isOpen).toBe(true);
  //   expect(context.panels[2].isOpen).toBe(false);
  // }));
});
