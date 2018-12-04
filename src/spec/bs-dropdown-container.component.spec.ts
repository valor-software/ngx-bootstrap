import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDropdownContainerComponent, BsDropdownModule } from '../dropdown';

describe('BsDropdownContainerComponent tests', () => {
  let fixture: ComponentFixture<BsDropdownContainerComponent>;
  let component: BsDropdownContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BsDropdownModule.forRoot()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsDropdownContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be null', () => {
    expect(component).not.toBeNull();
  });

  it('should set isOpen property', () => {
    component.isOpen = true;
    expect(component.isOpen).toBeTruthy();
  });

  it('should contain direction property', () => {
    expect(component.direction).toEqual('down');
  });
});
