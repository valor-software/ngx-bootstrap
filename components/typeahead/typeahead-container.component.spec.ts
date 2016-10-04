import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadOptions } from './typeahead-options.class';
import { asNativeElements } from '@angular/core';

describe('Component: TypeaheadContainer', () => {
  let fixture:ComponentFixture<TypeaheadContainerComponent>;
  let component:TypeaheadContainerComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TypeaheadContainerComponent],
      providers: [{
        provide: TypeaheadOptions,
        useValue: new TypeaheadOptions({animation: false, placement: 'bottom-left', typeaheadRef: undefined})
      }]
    }).createComponent(TypeaheadContainerComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have an \"element\" property', () => {
    expect(component.element).toBeTruthy();
  });

  it('should have an empty \"matches\" array', () => {
    expect(component.matches.length).toBe(0);
  });

  describe('dropdown-menu', () => {
    let dropDown:HTMLElement;

    beforeEach(() => {
      component.position(fixture.elementRef);
      fixture.detectChanges();

      dropDown = fixture.debugElement.query(By.css('.dropdown-menu')).nativeElement as HTMLElement;
    });

    it('should be rendered', () => {
      expect(dropDown).toBeDefined();
    });

    it('should have display style set', () => {
      expect(dropDown.style.display).toBe('block');
    });

    it('should have top style set', () => {
      expect(dropDown.style.top).toBe('16px');
    });

    it('should have left style set', () => {
      expect(dropDown.style.left).toBe('8px');
    });
  });

  describe('matches', () => {
    let matches:HTMLLIElement[];

    beforeEach(() => {
      component.query = 'fo';
      component.matches = ['foo', 'food'];
      fixture.detectChanges();

      matches = asNativeElements(fixture.debugElement.queryAll(By.css('.dropdown-menu li')));
    });

    it('should render 2 matches', () => {
      expect(matches.length).toBe(2);
    });

    it('should highlight query for match', () => {
      expect(matches[1].children[0].innerHTML).toBe('<strong>fo</strong>od');
    });

    it('should set the \"active\" class on the first match', () => {
      expect(matches[0].classList.contains('active')).toBeTruthy();
    });

    it('should not set the \"active\" class on other matches', () => {
      expect(matches[1].classList.contains('active')).toBeFalsy();
    });
  });

});
