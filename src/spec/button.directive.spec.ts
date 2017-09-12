// tslint:disable:max-file-line-count no-floating-promises
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from '../buttons/buttons.module';

@Component({selector: 'buttons-test', template: ''})
class TestButtonsComponent {
  singleModel = '0';
  checkModel: any = {left: false, middle: true, right: false};
  radioModel = 'Middle';

  constructor(public cdRef: ChangeDetectorRef) {}
}

const html = `
  <div>
    <button type="button" id="default" [(ngModel)]="singleModel" btnCheckbox>
      Default
    </button>

    <button type="button" id="disabled" disabled [(ngModel)]="singleModel" btnCheckbox>
      Disabled
    </button>

    <button type="button" id="custom" type="button" class="btn btn-primary"
            [(ngModel)]="singleModel" btnCheckbox
            btnCheckboxTrue="1" btnCheckboxFalse="0">
      Single Toggle
    </button>

    <div class="btn-group checkbox">
      <label class="btn btn-primary" [(ngModel)]="checkModel.left" btnCheckbox>Left</label>
      <label class="btn btn-primary" [(ngModel)]="checkModel.middle" btnCheckbox>Middle</label>
      <label class="btn btn-primary" [(ngModel)]="checkModel.right" btnCheckbox>Right</label>
    </div>

    <div class="btn-group radio">
      <label class="btn btn-primary" [(ngModel)]="radioModel" btnRadio="Left">Left</label>
      <label class="btn btn-primary" [(ngModel)]="radioModel" btnRadio="Middle">Middle</label>
      <label class="btn btn-primary" [(ngModel)]="radioModel" btnRadio="Right">Right</label>
      <label class="btn btn-primary" [(ngModel)]="radioModel" btnRadio="1" disabled>Disabled</label>
    </div>

    <div class="btn-group radioUncheckable">
      <label class="btn btn-success" [(ngModel)]="radioUncheckableModel" btnRadio="Left" uncheckable>Left</label>
      <label class="btn btn-success" [(ngModel)]="radioUncheckableModel" btnRadio="Middle" uncheckable>Middle</label>
      <label class="btn btn-success" [(ngModel)]="radioUncheckableModel" btnRadio="Right" uncheckable>Right</label>
    </div>
  </div>
`;

function createComponent(htmlTemplate,
                         dtc?: string): ComponentFixture<TestButtonsComponent> {
  switch (dtc) {
    case 'OnPush':
      TestBed.overrideComponent(TestButtonsComponent, {
        set: {
          template: htmlTemplate,
          changeDetection: ChangeDetectionStrategy.OnPush
        }
      });
      break;
    default:
      TestBed.overrideComponent(TestButtonsComponent, {
        set: {template: htmlTemplate}
      });
  }

  const fixture = TestBed.createComponent(TestButtonsComponent);
  fixture.detectChanges();

  return fixture;
}

describe('Directive: Buttons', () => {
  let fixture: ComponentFixture<TestButtonsComponent>;
  let context: any;
  let element: any;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestButtonsComponent],
        imports: [ButtonsModule, FormsModule],
        providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
      });
    })
  );

  describe('checkbox', () => {
    it(
      'should work correctly with default model values',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        expect(element.querySelector('#default').classList).not.toContain(
          'active'
        );
        context.singleModel = true;
        fixture.detectChanges();
        tick();
        expect(element.querySelector('#default').classList).toContain('active');
      })
    );

    it(
      'should work correctly with default model values with OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        context.cdRef.markForCheck();

        expect(element.querySelector('#default').classList).not.toContain(
          'active'
        );
        context.singleModel = true;
        fixture.detectChanges();
        tick();
        expect(element.querySelector('#default').classList).toContain('active');
      })
    );

    it(
      'should bind custom model values',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        expect(element.querySelector('#custom').classList).not.toContain(
          'active'
        );
        context.singleModel = '1';
        fixture.detectChanges();
        tick();
        expect(element.querySelector('#custom').classList).toContain('active');
      })
    );

    it(
      'should bind custom model values with OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        context.cdRef.markForCheck();

        expect(element.querySelector('#custom').classList).not.toContain(
          'active'
        );
        context.singleModel = '1';
        fixture.detectChanges();
        tick();
        expect(element.querySelector('#custom').classList).toContain('active');
      })
    );

    it('should toggle default model values on click', () => {
      fixture = createComponent(html);
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.singleModel = false;
      fixture.detectChanges();
      const btn = element.querySelector('#default');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(true);
      expect(btn.classList).toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');
    });

    it('should toggle default model values on click OnPush', () => {
      fixture = createComponent(html, 'OnPush');
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.cdRef.markForCheck();

      context.singleModel = false;
      fixture.detectChanges();
      const btn = element.querySelector('#default');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(true);
      expect(btn.classList).toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');
    });

    it('should toggle custom model values on click', () => {
      fixture = createComponent(html);
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      const btn = element.querySelector('#custom');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('1');
      expect(btn.classList).toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('0');
      expect(btn.classList).not.toContain('active');
    });

    it('should toggle custom model values on click OnPush', () => {
      fixture = createComponent(html, 'OnPush');
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.cdRef.markForCheck();

      const btn = element.querySelector('#custom');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('1');
      expect(btn.classList).toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('0');
      expect(btn.classList).not.toContain('active');
    });

    it('should not toggle when disabled', () => {
      fixture = createComponent(html);
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.singleModel = false;
      fixture.detectChanges();
      const btn = element.querySelector('#disabled');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');
    });

    it('should not toggle when disabled OnPush', () => {
      fixture = createComponent(html, 'OnPush');
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.cdRef.markForCheck();

      context.singleModel = false;
      fixture.detectChanges();
      const btn = element.querySelector('#disabled');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn.classList).not.toContain('active');
    });

    it(
      'should work for btn-group',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();

          const btn = element.querySelector('.btn-group.checkbox');
          expect(btn.children[0].classList).not.toContain('active');
          expect(btn.children[1].classList).toContain('active');
          expect(btn.children[2].classList).not.toContain('active');
        });
      })
    );

    it(
      'should work for btn-group OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        context.cdRef.markForCheck();

        fixture.whenStable().then(() => {
          const btn = element.querySelector('.btn-group.checkbox');
          expect(btn.children[0].classList).not.toContain('active');
          expect(btn.children[1].classList).toContain('active');
          expect(btn.children[2].classList).not.toContain('active');
        });
      })
    );
  });

  describe('radio', () => {
    it(
      'should set active class based on model',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const btn = element.querySelector('.btn-group.radio');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');

        context.radioModel = 'Left';
        fixture.detectChanges();
        tick();
        expect(btn.children[0].classList).toContain('active');
        expect(btn.children[1].classList).not.toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should set active class based on model OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        context.cdRef.markForCheck();

        const btn = element.querySelector('.btn-group.radio');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');

        context.radioModel = 'Left';
        fixture.detectChanges();
        tick();
        expect(btn.children[0].classList).toContain('active');
        expect(btn.children[1].classList).not.toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should set active class via click',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const btn = element.querySelector('.btn-group.radio');
        delete context.radioModel;
        expect(context.radioModel).toBeUndefined();
        (btn.children[2] as HTMLElement).click();
        fixture.detectChanges();
        tick();
        expect(context.radioModel).toEqual('Right');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).not.toContain('active');
        expect(btn.children[2].classList).toContain('active');
        (btn.children[1] as HTMLElement).click();
        fixture.detectChanges();
        tick();
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should set active class via click OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        context.cdRef.markForCheck();

        const btn = element.querySelector('.btn-group.radio');
        delete context.radioModel;
        expect(context.radioModel).toBeUndefined();
        (btn.children[2] as HTMLElement).click();
        fixture.detectChanges();
        tick();
        expect(context.radioModel).toEqual('Right');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).not.toContain('active');
        expect(btn.children[2].classList).toContain('active');
        (btn.children[1] as HTMLElement).click();
        fixture.detectChanges();
        tick();
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should do nothing when clicking an active radio',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const btn = element.querySelector('.btn-group.radio');
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
        (btn.children[1] as HTMLElement).click();
        fixture.detectChanges();
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should do nothing when clicking an active radio OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        context.cdRef.markForCheck();

        const btn = element.querySelector('.btn-group.radio');
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
        (btn.children[1] as HTMLElement).click();
        fixture.detectChanges();
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[0].classList).not.toContain('active');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[2].classList).not.toContain('active');
      })
    );

    it(
      'should not toggle when disabled',
      fakeAsync(() => {
        fixture = createComponent(html);
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const btn = element.querySelector('.btn-group.radio');
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');

        context.radioModel = '1';
        fixture.detectChanges();
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');
        (btn.children[3] as HTMLElement).click();
        fixture.detectChanges();
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');
      })
    );

    it(
      'should not toggle when disabled OnPush',
      fakeAsync(() => {
        fixture = createComponent(html, 'OnPush');
        context = fixture.componentInstance;
        element = fixture.nativeElement;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        context.cdRef.markForCheck();

        const btn = element.querySelector('.btn-group.radio');
        expect(context.radioModel).toEqual('Middle');
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');

        context.radioModel = '1';
        fixture.detectChanges();
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');
        (btn.children[3] as HTMLElement).click();
        fixture.detectChanges();
        expect(btn.children[1].classList).toContain('active');
        expect(btn.children[3].classList).not.toContain('active');
      })
    );

    it('should not toggle when click in active button without uncheckable', () => {
      fixture = createComponent(html, 'OnPush');
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      const btn = element.querySelector('.btn-group.radio');
      expect(context.radioModel).toEqual('Middle');
      (btn.children[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(btn.children[0].classList).not.toContain('active');
      expect(btn.children[1].classList).toContain('active');
      expect(btn.children[2].classList).not.toContain('active');
    });

    it('should unset active class via click', () => {
      fixture = createComponent(html);
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      const btn = element.querySelector('.btn-group.radioUncheckable');
      expect(context.radioUncheckableModel).toBeUndefined();
      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toEqual('Left');
      expect(btn.children[0].classList).toContain('active');
      expect(btn.children[1].classList).not.toContain('active');
      expect(btn.children[2].classList).not.toContain('active');
      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toBeUndefined();
      expect(btn.children[0].classList).not.toContain('active');
      expect(btn.children[1].classList).not.toContain('active');
      expect(btn.children[2].classList).not.toContain('active');
    });

    it('should unset active class via click OnPush', () => {
      fixture = createComponent(html, 'OnPush');
      context = fixture.componentInstance;
      element = fixture.nativeElement;

      context.cdRef.markForCheck();

      const btn = element.querySelector('.btn-group.radioUncheckable');
      expect(context.radioUncheckableModel).toBeUndefined();
      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toEqual('Left');
      expect(btn.children[0].classList).toContain('active');
      expect(btn.children[1].classList).not.toContain('active');
      expect(btn.children[2].classList).not.toContain('active');
      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toBeUndefined();
      expect(btn.children[0].classList).not.toContain('active');
      expect(btn.children[1].classList).not.toContain('active');
      expect(btn.children[2].classList).not.toContain('active');
    });
  });
});
