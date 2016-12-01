import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from '../accordion/accordion.module';

const html = `
  <accordion [closeOthers]="oneAtATime">

    <accordion-group heading="Panel 1"
                     [isOpen]="panels[0].isOpen"
                     [isDisabled]="panels[0].isDisabled">
      Content of panel 1
    </accordion-group>

    <accordion-group heading="Panel 2"
                     [isOpen]="panels[1].isOpen"
                     [isDisabled]="panels[1].isDisabled">
      Content of panel 2
    </accordion-group>

    <accordion-group heading="Panel 3"
                     [isOpen]="panels[2].isOpen"
                     [isDisabled]="panels[2].isDisabled">
      Content of panel 3
    </accordion-group>

  </accordion>
`;

function getPanels(element:HTMLElement):Element[] {
  return Array.from(element.querySelectorAll('accordion-group'));
}

function expectOpenPanels(nativeEl:HTMLElement, openPanelsDef:boolean[]):void {
  const panels = getPanels(nativeEl);
  expect(panels.length).toBe(openPanelsDef.length);
  for (let i = 0; i < panels.length; i++) {
    if (openPanelsDef[i]) {
      expect(panels[i].classList).toContain('panel-open');
    } else {
      expect(panels[i].classList).not.toContain('panel-open');
    }
  }
}

function hasTitle(element:HTMLElement, str:string):boolean {
  return element.textContent === str;
}

describe('Component: Accordion', () => {
  let fixture:ComponentFixture<TestAccordionComponent>;
  let context:any;
  let element:any;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestAccordionComponent], imports: [AccordionModule]});
    TestBed.overrideComponent(TestAccordionComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestAccordionComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have no open panels', () => {
    expectOpenPanels(element, [false, false, false]);
  });

  it('should have open panel based on binding', () => {
    context.panels[0].isOpen = true;
    fixture.detectChanges();
    expectOpenPanels(element, [true, false, false]);
  });

  it('should toggle panels independently', () => {
    context.oneAtATime = false;

    context.panels[1].isOpen = true;
    fixture.detectChanges();
    expectOpenPanels(element, [false, true, false]);

    context.panels[0].isOpen = true;
    fixture.detectChanges();
    expectOpenPanels(element, [true, true, false]);

    context.panels[1].isOpen = false;
    fixture.detectChanges();
    expectOpenPanels(element, [true, false, false]);

    context.panels[2].isOpen = true;
    fixture.detectChanges();
    expectOpenPanels(element, [true, false, true]);

    context.panels[0].isOpen = false;
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, true]);

    context.panels[2].isOpen = false;
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, false]);
  });

  it('should have the appropriate heading', () => {
    const titles = Array.from(element.querySelectorAll('.panel-heading a span'));
    titles.forEach((title:HTMLElement, idx:number) => expect(hasTitle(title, `Panel ${idx + 1}`)).toBe(true));
  });

  it('should only open one at a time', () => {
    const headingLinks = element.querySelectorAll('.panel-title a');

    headingLinks[0].click();
    fixture.detectChanges();
    expectOpenPanels(element, [true, false, false]);

    headingLinks[2].click();
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, true]);

    headingLinks[2].click();
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, false]);
  });

  it('should have only one open panel even if binding says otherwise', () => {
    context.panels[0].isOpen = true;
    context.panels[1].isOpen = true;
    // which of panels should be opened there? the first or the last one? (now - last)
    fixture.detectChanges();
    expectOpenPanels(element, [false, true, false]);
  });

  it('should not open disabled panels from click', () => {
    context.panels[0].isDisabled = true;
    fixture.detectChanges();
    const headingLinks = element.querySelectorAll('.panel-title a');
    headingLinks[0].click();
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, false]);
  });
});

@Component({
  selector: 'accordion-test',
  template: ''
})

class TestAccordionComponent {
  public oneAtATime:boolean = true;
  public panels:any[] = [
    {isOpen: false, isDisabled: false},
    {isOpen: false, isDisabled: false},
    {isOpen: false, isDisabled: false}
  ];
}
