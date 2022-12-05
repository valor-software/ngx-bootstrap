import { BackdropComponent, BackdropService } from "ngx-bootstrap/component-loader";
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ModalBackdropComponent tests', () => {
  let fixture: ComponentFixture<BackdropComponent>;
  let component: BackdropComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackdropComponent],
      providers: [BackdropService]
    });
    fixture = TestBed.createComponent(BackdropComponent);
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
    let modalClass = component.element.nativeElement.classList.contains('show');
    expect(modalClass).toBeTruthy();
    component.isShown = false;
    fixture.detectChanges();
    modalClass = component.element.nativeElement.classList.contains('show');
    expect(modalClass).toBeFalsy();
  });
});
