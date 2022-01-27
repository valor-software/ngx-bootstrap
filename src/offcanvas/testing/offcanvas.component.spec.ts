import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffcanvasContainerComponent, OffcanvasModule } from "../index";
import { AvailablePlacement, OffcanvasConfig, OffcanvasConfigType } from "../offcanvas.config";

@Component({
  selector: 'offcanvas-test',
  template: ''
})
class TestOffcanvasComponent {
  config: OffcanvasConfigType = Object.assign({}, OffcanvasConfig, {headerTitle: 'header Title', backdropScrolling: false, backdrop: false});
  @ViewChild('element', {static: false}) public offcanvas?: OffcanvasContainerComponent;

  showElement() {
    this.offcanvas?.show();
  }

  closeElement() {
    this.offcanvas?.hide();
  }

  changeElementPlacement(placement: AvailablePlacement) {
    this.config = Object.assign({}, OffcanvasConfig, this.config, {placement});
  }

  switchBackDrop(value: boolean) {
    this.config = Object.assign({}, OffcanvasConfig, this.config, {backdrop: value});
  }

  switchBackdropScrolling(backdropScrolling: boolean) {
    this.config = Object.assign({}, OffcanvasConfig, this.config, {backdropScrolling});
  }
}

const html = `
<offcanvas #element [config]="config">
  <p>Some content</p>
</offcanvas>
`;

function checkClassContain(queryClass: string, expectClass: string, notContain?: boolean) {
  let classList = document.body.querySelector(queryClass)?.classList;
  if (notContain) {
    expect(classList).not.toContain(expectClass);
  }

  if (!notContain) {
    expect(classList).toContain(expectClass);
  }
}

describe('Component: Offcanvas', () => {
  let fixture: ComponentFixture<TestOffcanvasComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let context: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOffcanvasComponent],
      imports: [
        OffcanvasModule,
        BrowserAnimationsModule
      ]
    });
    TestBed.overrideComponent(TestOffcanvasComponent, {
      set: { template: html }
    });
    fixture = TestBed.createComponent(TestOffcanvasComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  function showElement() {
    fixture.componentInstance.showElement();
    fixture.detectChanges();
  }

  function closeElement() {
    fixture.componentInstance.closeElement();
    fixture.detectChanges();
  }

  it('should have class show after showing element and class show should disappear after closing element', async () => {
    checkClassContain('.offcanvas.offcanvas-start', 'show', true);
    showElement();
    await new Promise((r) => setTimeout(r, 500));
    checkClassContain('.offcanvas.offcanvas-start', 'show');
    closeElement();
    await new Promise((r) => setTimeout(r, 500));
    checkClassContain('.offcanvas.offcanvas-start', 'show', true);
  });

  it('should have header Title: "header Title"', () => {
    const textContent = document.body.querySelector('.offcanvas.offcanvas-start .offcanvas-header h5')?.textContent;
    expect(textContent).toEqual(`header Title`);
  });

  it('should have placement class according the placement configuration', async () => {
    const POSITION_CLASSNAME = {
      start: 'offcanvas-start',
      end: 'offcanvas-end',
      top: 'offcanvas-top',
      bottom: 'offcanvas-bottom'
    };
    const placementArray: AvailablePlacement[] = ['start', 'top', 'end', 'bottom'];
    for (const key of placementArray) {
      fixture.componentInstance.changeElementPlacement(key);
      fixture.detectChanges();
      showElement();
      await new Promise((r) => setTimeout(r, 500));
      fixture.detectChanges();
      checkClassContain('.offcanvas', POSITION_CLASSNAME[key]);
    }
  });

  it('should toggle backdrop', () => {
    showElement();
    expect(document.body.querySelector('offcanvas-backdrop')).toBeFalsy();
    closeElement();
    fixture.componentInstance.switchBackDrop(true);
    fixture.detectChanges();
    showElement();
    expect(document.body.querySelector('offcanvas-backdrop')).toBeTruthy();
    checkClassContain('offcanvas-backdrop', 'show');
  });

  it('should toggle backdrop scrolling', () => {
    fixture.componentInstance.switchBackdropScrolling(false);
    fixture.detectChanges();
    showElement();
    expect(document.body.style.overflow).toEqual('hidden');
    closeElement();
    fixture.componentInstance.switchBackdropScrolling(true);
    fixture.detectChanges();
    showElement();
    expect(document.body.style.overflow).toBeFalsy();
  });
});
