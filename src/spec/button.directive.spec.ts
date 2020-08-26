// tslint:disable:max-file-line-count no-floating-promises
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../buttons';

@Component({selector: 'buttons-test', template: ''})
class TestButtonsComponent implements OnInit {
  singleModel = '0';
  /* tslint:disable-next-line: no-any */
  checkModel: any = { left: false, middle: true, right: false };
  radioModel = 'Middle';
  myForm: FormGroup;

  radioGroupControl = new FormControl(null);
  radioGroupModel = null;

  groupDisabled = false;

  constructor(public cdRef: ChangeDetectorRef,
              private formBuilder: FormBuilder) {
  }


  disableGroups() {
    this.radioGroupControl.disable();
    this.groupDisabled = true;
  }

  enableGroups() {
    this.radioGroupControl.enable();
    this.groupDisabled = false;
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      radio: 'Middle'
    });
  }
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

    <form [formGroup]="myForm" class="form-inline">
      <div class="form-group">
        <div class="btn-group reactive-radio" btnRadioGroup formControlName="radio">
          <label btnRadio="Left" class="btn btn-primary" tabindex="0" role="button">Left</label>
          <label btnRadio="Middle" class="btn btn-primary" tabindex="0" role="button">Middle</label>
          <label btnRadio="Right" class="btn btn-primary" tabindex="0" role="button">Right</label>
        </div>
      </div>
    </form>
  </div>
`;

const htmlGroupReactive = `
  <div>
    <div class="btn-group radioGroup" btnRadioGroup [formControl]="radioGroupControl">
      <label class="btn btn-success" btnRadio="Left">Left</label>
      <label class="btn btn-success" btnRadio="Middle">Middle</label>
      <label class="btn btn-success" btnRadio="Right">Right</label>
    </div>
  </div>
`;

const htmlGroupModel = `
  <div>
    <div class="btn-group radioGroup" [(ngModel)]="radioGroupModel" btnRadioGroup  [disabled]="groupDisabled">
      <label class="btn btn-success" btnRadio="Left">Left</label>
      <label class="btn btn-success" btnRadio="Middle">Middle</label>
      <label class="btn btn-success" btnRadio="Right">Right</label>
    </div>
  </div>
`;

function createComponent(htmlTemplate, dtc?: string): ComponentFixture<TestButtonsComponent> {
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
        set: { template: htmlTemplate }
      });
  }

  const fixture = TestBed.createComponent(TestButtonsComponent);
  fixture.detectChanges();

  return fixture;
}

describe('Directive: Buttons', () => {
  let fixture: ComponentFixture<TestButtonsComponent>;
  /* tslint:disable-next-line: no-any */
  let context: any;
  /* tslint:disable-next-line: no-any */
  let element: any;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestButtonsComponent],
        imports: [ButtonsModule, FormsModule, ReactiveFormsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
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

        expect(element.querySelector('#default').classList).not.toContain('active');
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

        expect(element.querySelector('#default').classList).not.toContain('active');
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

        expect(element.querySelector('#custom').classList).not.toContain('active');
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

        expect(element.querySelector('#custom').classList).not.toContain('active');
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

    describe('with reactive form', () => {
      let btn = null;

      beforeEach(
        fakeAsync(() => {
          fixture = createComponent(html);
          context = fixture.componentInstance;
          element = fixture.nativeElement;

          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          btn = element.querySelector('.btn-group.reactive-radio');
        })
      );

      it(
        'should set active class based on model',
        fakeAsync(() => {
          expect(btn.children[0].classList).not.toContain('active');
          expect(btn.children[1].classList).toContain('active');
          expect(btn.children[2].classList).not.toContain('active');

          context.myForm.get('radio').setValue('Left');
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
          (btn.children[0] as HTMLElement).click();
          fixture.detectChanges();
          tick();

          expect(context.myForm.get('radio').value).toEqual('Left');
          expect(btn.children[0].classList).toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).not.toContain('active');

          (btn.children[2] as HTMLElement).click();
          fixture.detectChanges();
          tick();

          expect(context.myForm.get('radio').value).toEqual('Right');
          expect(btn.children[0].classList).not.toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).toContain('active');
        })
      );

      it(
        'should do nothing when clicking an active radio',
        fakeAsync(() => {
          context.myForm.get('radio').setValue('Left');
          fixture.detectChanges();
          tick();

          expect(btn.children[0].classList).toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).not.toContain('active');

          (btn.children[0] as HTMLElement).click();
          fixture.detectChanges();

          expect(context.myForm.get('radio').value).toEqual('Left');
          expect(btn.children[0].classList).toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).not.toContain('active');
        })
      );

      it(
        'should set disabled attribute when form status is changed to disabled',
        fakeAsync(() => {
          expect(btn.children[0].getAttribute('disabled')).toBeNull();
          expect(btn.children[1].getAttribute('disabled')).toBeNull();
          expect(btn.children[2].getAttribute('disabled')).toBeNull();

          context.myForm.disable();
          fixture.detectChanges();
          tick();

          expect(btn.children[0].getAttribute('disabled')).toEqual('disabled');
          expect(btn.children[1].getAttribute('disabled')).toEqual('disabled');
          expect(btn.children[2].getAttribute('disabled')).toEqual('disabled');
        })
      );

      it(
        'should not change model when form is disabled',
        fakeAsync(() => {
          context.myForm.get('radio').setValue('Left');
          fixture.detectChanges();
          tick();

          expect(btn.children[0].classList).toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).not.toContain('active');

          context.myForm.disable();
          (btn.children[1] as HTMLElement).click();
          fixture.detectChanges();
          tick();

          expect(context.myForm.get('radio').value).toEqual('Left');
          expect(btn.children[0].classList).toContain('active');
          expect(btn.children[1].classList).not.toContain('active');
          expect(btn.children[2].classList).not.toContain('active');
        })
      );
    });

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

  describe('radioGroup', () => {
    let radioGroup: HTMLDivElement;

    describe('reactive form', () => {
      radioGroupTests(true);
    });

    describe('ngModel form', () => {
      radioGroupTests(false);
    });

    function radioGroupTests(reactive: boolean) {
      function getModelValue() {
        if (reactive) {
          return context.radioGroupControl.value;
        } else {
          return context.radioGroupModel;
        }
      }

      function setModelValue(value) {
        if (reactive) {
          context.radioGroupControl.setValue(value);
        } else {
          context.radioGroupModel = value;
        }
      }

      function getHtml() {
        if (reactive) {
          return htmlGroupReactive;
        } else {
          return htmlGroupModel;
        }
      }

      beforeEach(() => {
        fixture = createComponent(getHtml());
        context = fixture.componentInstance;
        element = fixture.nativeElement;
        radioGroup = element.querySelector('.btn-group.radioGroup');
      });

      it('should have a tabindex=0 if group is enabled', () => {
        fixture.detectChanges();
        expect(radioGroup.getAttribute('tabindex')).toEqual('0');
      });

      it('should have aria attributes', () => {
        fixture.detectChanges();
        expect(radioGroup.getAttribute('role')).toEqual('radiogroup');
        for (let i = 0; i <= 2; i++) {
          expect(radioGroup.children[i].getAttribute('role')).toEqual('radio');
        }
      });

      it(
        'should not have a tabindex if group is disabled',
        fakeAsync(() => {
          context.disableGroups();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          expect(radioGroup.hasAttribute('tabindex')).toBeFalsy();
        })
      );

      it('should have no radio selected by default', () => {
        fixture.detectChanges();
        expect(radioGroup.children[0].classList).not.toContain('active');
        expect(radioGroup.children[1].classList).not.toContain('active');
        expect(radioGroup.children[2].classList).not.toContain('active');
      });

      it(
        'should select radio depending on control value',
        fakeAsync(() => {
          setModelValue('Right');
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          expect(radioGroup.children[0].classList).not.toContain('active');
          expect(radioGroup.children[1].classList).not.toContain('active');
          expect(radioGroup.children[2].classList).toContain('active');
          expect(radioGroup.children[2].getAttribute('aria-checked')).toEqual('true');
        })
      );

      function pressKeyInRadioGroup(key: string) {
        const event: Event = new KeyboardEvent('keydown', {
          key
        });
        radioGroup.dispatchEvent(event);
        fixture.detectChanges();
      }

      it('should select the next radio when arrow right is pressed', () => {
        radioGroup.focus();
        fixture.detectChanges();
        pressKeyInRadioGroup('ArrowRight');
        expect(document.activeElement).toEqual(radioGroup.children[1]);
        expect(getModelValue()).toEqual('Middle');
      });

      it('should select the next radio when arrow down is pressed ', () => {
        radioGroup.focus();
        fixture.detectChanges();

        pressKeyInRadioGroup('ArrowDown');

        expect(document.activeElement).toEqual(radioGroup.children[1]);
        expect(getModelValue()).toEqual('Middle');
      });

      it('should select the previous radio when arrow left is pressed ', () => {
        radioGroup.focus();
        fixture.detectChanges();

        pressKeyInRadioGroup('ArrowLeft');

        // It should wrap, so last button is selected
        expect(document.activeElement).toEqual(radioGroup.children[2]);
        expect(getModelValue()).toEqual('Right');
      });

      it('should select the previous radio when arrow top is pressed ', () => {
        radioGroup.focus();
        fixture.detectChanges();

        pressKeyInRadioGroup('ArrowUp');

        // It should wrap, so last button is selected
        expect(document.activeElement).toEqual(radioGroup.children[2]);
        expect(getModelValue()).toEqual('Right');
      });
    }
  });
});
