import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBackdropComponent } from '../modal';
import { window } from '../utils/facade/browser';

describe('ModalBackdropComponent tests', () => {
  let fixture: ComponentFixture<ModalBackdropComponent>;
  let component: ModalBackdropComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBackdropComponent]
    });
    fixture = TestBed.createComponent(ModalBackdropComponent);
    component = fixture.componentInstance;
    component.isAnimated = true;
    fixture.detectChanges();
  });

  it('should get and set isAnimated correctly', () => {
    component.isAnimated = false;
    expect(component.isAnimated).toBeFalsy();
    component.isAnimated = true;
    expect(component.isAnimated).toBeTruthy();
  });

  it('should get and set isShown correctly', () => {
    component.isShown = false;
    expect(component.isShown).toBeFalsy();
    component.isShown = true;
    expect(component.isShown).toBeTruthy();
  });

  it('isShown() tests, when bs4', () => {
    const tempVal = window.__theme;
    window.__theme = 'bs4';
    component.isShown = true;
    fixture.detectChanges();
    let modalClass = component.element.nativeElement.classList.contains('show');
    expect(modalClass).toBeTruthy();

    component.isShown = false;
    fixture.detectChanges();
    modalClass = component.element.nativeElement.classList.contains('show');
    expect(modalClass).toBeFalsy();
    window.__theme = tempVal;
  });

  it('isShown() tests, when bs3', () => {
    const tempVal = window.__theme;
    window.__theme = 'bs3';
    component.isShown = true;
    fixture.detectChanges();
    let modalClass = component.element.nativeElement.classList.contains('in');
    expect(modalClass).toBeTruthy();

    component.isShown = false;
    fixture.detectChanges();
    modalClass = component.element.nativeElement.classList.contains('in');
    expect(modalClass).toBeFalsy();
    window.__theme = tempVal;
  });
});
