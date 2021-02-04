import { ModalBackdropComponent } from 'ngx-bootstrap/modal';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ModalBackdropComponent tests', () => {
  let fixture: ComponentFixture<ModalBackdropComponent>;
  let component: ModalBackdropComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBackdropComponent]
    });
    fixture = TestBed.createComponent(ModalBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get and set isAnimated correctly', () => {
    component.isAnimated = true;
    expect(component.isAnimated).toBeTruthy();
  });

  it('isShown() tests', () => {
    component.isShown = true;
    fixture.detectChanges();
    let modalClass = component.element.nativeElement.classList.contains('in');
    expect(modalClass).toBeTruthy();
    component.isShown = false;
    fixture.detectChanges();
    modalClass = component.element.nativeElement.classList.contains('in');
    expect(modalClass).toBeFalsy();
  });
});
