import { getBoundingClientRect } from '../utils/getBoundingClientRect';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'test-cmp',
  template: `<span>Popover demo</span>`
})
class TestComponent {
}

function getSpanElement(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.nativeElement.querySelector(
    'span'
  ) as HTMLElement;
}

describe('getBoundingClientRect', () => {
  let fixture: ComponentFixture<TestComponent>;
  let span: HTMLElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    }).compileComponents()
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    span = getSpanElement(fixture);
    jest
      .spyOn(span, 'clientHeight', 'get')
      .mockImplementation(() => 17);
    jest
      .spyOn(span, 'offsetLeft', 'get')
      .mockImplementation(() => 124);
    jest
      .spyOn(span, 'offsetTop', 'get')
      .mockImplementation(() => 522);
    jest
      .spyOn(span, 'offsetWidth', 'get')
      .mockImplementation(() => 104);
    jest
      .spyOn(span, 'getBoundingClientRect')
      .mockImplementation(() => {
        return {
          bottom: 539,
          height: 17,
          left: 123.515625,
          right: 227.578125,
          top: 522,
          width: 104.0625,
          x: 123.515625,
          y: 522,
        } as DOMRect;
      });
    jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementationOnce((() => {
        return {
          borderTopWidth: "0px",
          borderBottomWidth: "0px",
          borderLeftWidth: "0px",
          borderRightWidth: "0px",
        } as CSSStyleDeclaration;
      }));
  });

  it('calculates bounds rect correctly',
    () => {
      const element = getSpanElement(fixture);
      const rect = getBoundingClientRect(element);

      expect(rect.left).toEqual(123.515625);
      expect(rect.top).toEqual(522);
      expect(rect.width).toEqual(104.125);
      expect(rect.height).toEqual(34);
      expect(rect.right).toEqual(227.640625);
      expect(rect.bottom).toEqual(556);
    }
  );
});
