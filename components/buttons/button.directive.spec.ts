import {Component} from '@angular/core';
import {it, beforeEach, beforeEachProviders, injectAsync, expect} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
// import {ButtonCheckboxDirective} from './button-checkbox.directive';
// import {ButtonRadioDirective} from './button-radio.directive';
import {BUTTON_DIRECTIVES} from '../buttons';
import {NgModel} from '@angular/common';

const html = `
  <div>
    <button id="default" [(ngModel)]="singleModel" btnCheckbox>
      Default
    </button>
    
    <button id="disabled" disabled [(ngModel)]="singleModel" btnCheckbox>
      Disabled
    </button>
    
    <button id="custom" type="button" class="btn btn-primary"
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

describe('Directive: Buttons', () => {
  let fixture:ComponentFixture<any>;
  let context:any;
  let element:any;

  beforeEachProviders(() => [
    TestComponentBuilder
  ]);

  beforeEach(injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb
      .overrideTemplate(TestButtonsComponent, html)
      .createAsync(TestButtonsComponent)
      .then((f:ComponentFixture<any>) => {
        fixture = f;
        context = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
      });
  }));

  describe('checkbox', () => {
    it('should work correctly with default model values', () => {
      expect(element.querySelector('#default')).not.toHaveCssClass('active');
      context.singleModel = true;
      fixture.detectChanges();
      expect(element.querySelector('#default')).toHaveCssClass('active');
    });

    it('should bind custom model values', () => {
      expect(element.querySelector('#custom')).not.toHaveCssClass('active');
      context.singleModel = '1';
      fixture.detectChanges();
      expect(element.querySelector('#custom')).toHaveCssClass('active');
    });

    it('should toggle default model values on click', () => {
      context.singleModel = false;
      fixture.detectChanges();
      let btn = element.querySelector('#default');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(true);
      expect(btn).toHaveCssClass('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn).not.toHaveCssClass('active');
    });

    it('should toggle custom model values on click', () => {
      let btn = element.querySelector('#custom');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('1');
      expect(btn).toHaveCssClass('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual('0');
      expect(btn).not.toHaveCssClass('active');
    });

    it('should not toggle when disabled', () => {
      context.singleModel = false;
      fixture.detectChanges();
      let btn = element.querySelector('#disabled');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn).not.toHaveCssClass('active');

      btn.click();
      fixture.detectChanges();
      expect(context.singleModel).toEqual(false);
      expect(btn).not.toHaveCssClass('active');
    });

    it('should work for btn-group', () => {
      let btn = element.querySelector('.btn-group.checkbox');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');
    });
  });

  describe('radio', () => {
    it('should set active class based on model', () => {
      let btn = element.querySelector('.btn-group.radio');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');

      context.radioModel = 'Left';
      fixture.detectChanges();
      expect(btn.children[0]).toHaveCssClass('active');
      expect(btn.children[1]).not.toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');
    });

    it('should set active class via click', () => {
      let btn = element.querySelector('.btn-group.radio');
      delete context.radioModel;
      expect(context.radioModel).toBeUndefined();

      (btn.children[2] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioModel).toEqual('Right');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).not.toHaveCssClass('active');
      expect(btn.children[2]).toHaveCssClass('active');

      (btn.children[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioModel).toEqual('Middle');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');
    });

    it('should do nothing when clicking an active radio', () => {
      let btn = element.querySelector('.btn-group.radio');
      expect(context.radioModel).toEqual('Middle');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');

      (btn.children[1] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioModel).toEqual('Middle');
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');
    });

    xit('should not toggle when disabled', () => {
      let btn = element.querySelector('.btn-group.radio');
      expect(context.radioModel).toEqual('Middle');
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[3]).not.toHaveCssClass('active');

      context.radioModel = '1';
      fixture.detectChanges();
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[3]).not.toHaveCssClass('active');

      (btn.children[3] as HTMLElement).click();
      fixture.detectChanges();
      expect(btn.children[1]).toHaveCssClass('active');
      expect(btn.children[3]).not.toHaveCssClass('active');
    });

    xit('should unset active class via click', () => {
      let btn = element.querySelector('.btn-group.radioUncheckable');
      expect(context.radioUncheckableModel).toBeUndefined();

      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toEqual('Left');
      expect(btn.children[0]).toHaveCssClass('active');
      expect(btn.children[1]).not.toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');

      (btn.children[0] as HTMLElement).click();
      fixture.detectChanges();
      expect(context.radioUncheckableModel).toBeNull();
      expect(btn.children[0]).not.toHaveCssClass('active');
      expect(btn.children[1]).not.toHaveCssClass('active');
      expect(btn.children[2]).not.toHaveCssClass('active');
    });
  });
});

@Component({
  selector: 'buttons-test',
  directives: [BUTTON_DIRECTIVES, NgModel],
  template: ''
})

class TestButtonsComponent {
  public singleModel:string = '0';
  public checkModel:any = {left: false, middle: true, right: false};
  public radioModel:string = 'Middle';
}
