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
});
