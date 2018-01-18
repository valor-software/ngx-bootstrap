/* tslint:disable:max-classes-per-file max-file-line-count component-class-suffix */
/**
 * @copyright Angular ng-bootstrap team
 */
import { TestBed, inject } from '@angular/core/testing';
import { createGenericTestComponent } from './test/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertModule, AlertComponent, AlertConfig } from '../../alert/index';

@Component({
  selector: 'test-cmp',
  template: '',
  entryComponents: [AlertComponent]
})
class TestComponent {
  name = 'World';
  closed = false;
}

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent);

function getAlertElement(element: HTMLElement): HTMLDivElement {
  return element.querySelector('.alert') as HTMLDivElement;
}

function getCloseButton(element: HTMLElement): HTMLButtonElement {
  return element.querySelector('button');
}

describe('ngb-alert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [AlertModule.forRoot()],
      providers: [
        AlertComponent, ChangeDetectorRef
      ]
    });
  });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new AlertConfig();
    /*const alertCmp = new AlertComponent(new AlertConfig());*/
    const alertCmp = TestBed.get(AlertComponent);

    expect(alertCmp.dismissible).toBe(defaultConfig.dismissible);
    expect(alertCmp.type).toBe(defaultConfig.type);
  });

  it('should allow specifying alert type', () => {
    const fixture = createTestComponent('<alert type="success">Cool!</alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-success');
  });

  it('should render close button when dismissible', () => {
    const fixture = createTestComponent(
      '<alert [dismissible]="true">Watch out!</alert>'
    );

    expect(getCloseButton(getAlertElement(fixture.nativeElement))).toBeTruthy();
  });

  it('should render close button only if dismissible', () => {
    const fixture = createTestComponent(
      `<alert [dismissible]="false">Don't close!</alert>`
    );
    expect(getCloseButton(getAlertElement(fixture.nativeElement))).toBeFalsy();
  });

  describe('Custom config', () => {
    let config: AlertConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [AlertModule.forRoot()] });
    });

    beforeEach(
      inject([AlertConfig], (c: AlertConfig) => {
        config = c;
        config.dismissible = false;
        config.type = 'success';
      })
    );

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(AlertComponent);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });

  describe('Custom config as provider', () => {
    const config = new AlertConfig();
    config.dismissible = false;
    config.type = 'success';

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AlertModule.forRoot()],
        providers: [{ provide: AlertConfig, useValue: config }]
      });
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(AlertComponent);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });
});

