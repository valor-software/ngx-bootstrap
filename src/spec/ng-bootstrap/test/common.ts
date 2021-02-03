// tslint:disable
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

export function createGenericTestComponent<T>(
  html: string,
  type: { new (...args: any[]): T }
): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();

  return fixture;
}

export function createComponent<T>(htmlTemplate: string,
                                   component: { new (...args: any[]): T },
                                   dtc?: string): ComponentFixture<T> {
  if (dtc === 'OnPush') {
    TestBed.overrideComponent(component, {
      set: {
        template: htmlTemplate,
        changeDetection: ChangeDetectionStrategy.OnPush
      }
    });
  } else {
    TestBed.overrideComponent(component, {
      set: {template: htmlTemplate}
    });
  }

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  return fixture;
}

export type Browser =
  | 'ie9'
  | 'ie10'
  | 'ie11'
  | 'ie'
  | 'edge'
  | 'chrome'
  | 'safari'
  | 'firefox';

export function getBrowser(ua: string = window.navigator.userAgent): string {
  const browser = 'unknown';

  // IE < 11
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return 'ie' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  // IE 11
  if (ua.indexOf('Trident/') > 0) {
    const rv = ua.indexOf('rv:');
    return 'ie' + parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // Edge
  if (ua.indexOf('Edge/') > 0) {
    return 'edge';
  }

  // Chrome
  if (ua.indexOf('Chrome/') > 0) {
    return 'chrome';
  }

  // Safari
  if (ua.indexOf('Safari/') > 0) {
    return 'safari';
  }

  // Firefox
  if (ua.indexOf('Firefox/') > 0) {
    return 'firefox';
  }

  if (browser === 'unknown') {
    throw new Error('Browser detection failed for: ' + ua);
  }
}

export function isBrowser(
  browsers: Browser | Browser[],
  ua: string = window.navigator.userAgent
): boolean {
  const browsersStr = Array.isArray(browsers)
    /* tslint:disable-next-line: no-any */
    ? (browsers).map((x: any) => x.toString())
    : [browsers.toString()];
  const browser = getBrowser(ua);

  if (browsersStr.indexOf('ie') > -1 && browser.startsWith('ie')) {
    return true;
  } else {
    return browsersStr.indexOf(browser) > -1;
  }
}
