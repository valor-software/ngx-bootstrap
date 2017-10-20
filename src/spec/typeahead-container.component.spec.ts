import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { asNativeElements } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypeaheadContainerComponent } from '../typeahead/typeahead-container.component';
import { TypeaheadOptions } from '../typeahead/typeahead-options.class';
import { TypeaheadMatch } from '../typeahead/typeahead-match.class';
import { TypeaheadDirective } from '../typeahead/typeahead.directive';

describe('Component: TypeaheadContainer', () => {
  let fixture: ComponentFixture<TypeaheadContainerComponent>;
  let testModule: any;
  let component: TypeaheadContainerComponent;

  beforeEach(fakeAsync(() => {
    testModule = TestBed.configureTestingModule({
      declarations: [TypeaheadContainerComponent],
      providers: [{
        provide: TypeaheadOptions,
        useValue: new TypeaheadOptions({ animation: false, placement: 'bottom-left', typeaheadRef: undefined })
      }]
    });
    fixture = testModule.createComponent(TypeaheadContainerComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(1);
  }));

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have an "element" property', () => {
    expect(component.element).toBeTruthy();
  });

  it('should have an empty "matches" array', () => {
    expect(component.matches.length).toBe(0);
  });

  describe('dropdown-menu', () => {
    let dropDown: HTMLElement;

    beforeEach(() => {
      fixture.detectChanges();

      dropDown = fixture.debugElement.query(By.css('.dropdown-menu'))
        .nativeElement as HTMLElement;
    });

    it('should be rendered', () => {
      expect(dropDown).toBeDefined();
    });
  });

  describe('matches', () => {
    let matches: HTMLLIElement[];

    beforeEach(() => {
      component.query = 'fo';
      component.matches = [
        new TypeaheadMatch({ id: 0, name: 'foo' }, 'foo'),
        new TypeaheadMatch({ id: 1, name: 'food' }, 'food')
      ];
      fixture.detectChanges();

      matches = asNativeElements(
        fixture.debugElement.queryAll(By.css('.dropdown-menu li'))
      );
    });

    describe('rendering', () => {
      it('should render 2 matches', () => {
        expect(matches.length).toBe(2);
      });

      xit('should highlight query for match', () => {
        // expect(matches[1].children[0].innerHTML).toBe('<strong>fo</strong>od');
        const ms = fixture.debugElement.queryAll(
          By.css('.dropdown-menu li span')
        );
        expect(ms[1].nativeElement.innerHTML).toBe('<strong>fo</strong>od');
      });

      it('should set the "active" class on the first match', () => {
        expect(matches[0].classList.contains('active')).toBeTruthy();
      });

      it('should not set the "active" class on other matches', () => {
        expect(matches[1].classList.contains('active')).toBeFalsy();
      });
    });

    describe('nextActiveMatch', () => {
      it('should select the next match', () => {
        component.nextActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.nextActiveMatch();
        component.nextActiveMatch();

        expect(component.isActive(component.matches[0])).toBeTruthy();
      });
    });

    describe('prevActiveMatch', () => {
      it('should select the previous (last) match', () => {
        component.prevActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.prevActiveMatch();
        component.prevActiveMatch();

        expect(component.isActive(component.matches[0])).toBeTruthy();
      });
    });
  });

  describe('grouped matches', () => {
    let itemMatches: HTMLLIElement[];
    let headerMatch: HTMLLIElement;

    beforeEach(() => {
      component.query = 'a';
      component.matches = [
        new TypeaheadMatch('fruits', 'fruits', true),
        new TypeaheadMatch(
          { id: 0, name: 'banana', category: 'fruits' },
          'banana'
        ),
        new TypeaheadMatch(
          { id: 0, name: 'apple', category: 'fruits' },
          'apple'
        )
      ];

      fixture.detectChanges();
      headerMatch = fixture.debugElement.query(By.css('.dropdown-header'))
        .nativeElement;
      itemMatches = asNativeElements(
        fixture.debugElement.queryAll(
          By.css('.dropdown-menu li:not(.dropdown-header)')
        )
      );
    });

    describe('rendering', () => {
      it('should render 2 item matches', () => {
        expect(itemMatches.length).toBe(2);
      });

      xit('should highlight query for item match', () => {
        const im = fixture.debugElement.queryAll(
          By.css('.dropdown-menu li:not(.dropdown-header) span')
        );
        expect(im[1].nativeElement.innerHTML).toBe('<strong>a</strong>pple');
      });

      it('should set the "active" class on the first item match', () => {
        expect(itemMatches[0].classList.contains('active')).toBeTruthy();
      });

      it('should not set the "active" class on the header match', () => {
        expect(headerMatch.classList.contains('active')).toBeFalsy();
      });

      it('should render 1 header match', () => {
        expect(headerMatch.innerHTML).toBe('fruits');
      });
    });

    describe('nextActiveMatch', () => {
      it('should select the next item match', () => {
        component.nextActiveMatch();

        expect(component.isActive(component.matches[2])).toBeTruthy();
      });

      it('should skip the header match, when triggered twice', () => {
        component.nextActiveMatch();
        component.nextActiveMatch();

        expect(component.isActive(component.matches[0])).toBeFalsy();
      });
    });

    describe('prevActiveMatch', () => {
      it('should skip the header match', () => {
        component.prevActiveMatch();

        expect(component.isActive(component.matches[0])).toBeFalsy();
      });

      it('should select the first match again, when triggered twice', () => {
        component.prevActiveMatch();
        component.prevActiveMatch();

        expect(component.isActive(component.matches[1])).toBeTruthy();
      });
    });
  });

  describe('isFocused', () => {
    it('should not be focus after init', () => {
      expect(component.isFocused).toBeFalsy();
    });

    it('should not be focused on focusLost()', () => {
      component.focusLost();

      expect(component.isFocused).toBeFalsy();
    });
  });
  describe('scrollable matches', () => {
    let itemMatches: HTMLLIElement[];
    let headerMatch: HTMLLIElement;
    let containingElementScrollable: HTMLElement[];

    beforeEach(fakeAsync(() => {
      fixture = testModule.createComponent(TypeaheadContainerComponent);
      component = fixture.componentInstance;
      component.parent = { typeaheadOptionsInScrollableView: 3, typeaheadScrollable: true } as TypeaheadDirective;
      fixture.detectChanges();
      tick(1);
      component.query = 'a';
      component.matches = [
        new TypeaheadMatch({ id: 0, name: 'banana', category: 'fruits' }, 'banana'),
        new TypeaheadMatch({ id: 1, name: 'apple', category: 'fruits' }, 'apple'),
        new TypeaheadMatch({ id: 2, name: 'orange', category: 'fruits' }, 'orange'),
        new TypeaheadMatch({ id: 3, name: 'pear', category: 'fruits' }, 'pear'),
        new TypeaheadMatch({ id: 4, name: 'pineapple', category: 'fruits' }, 'pineapple'),
        new TypeaheadMatch('berries', 'berries', true),
        new TypeaheadMatch({ id: 5, name: 'strawberry', category: 'berries' }, 'strawberry'),
        new TypeaheadMatch({ id: 6, name: 'raspberry', category: 'berries' }, 'raspberry'),
        new TypeaheadMatch('vegatables', 'vegatables', true),
        new TypeaheadMatch({ id: 7, name: 'tomato', category: 'vegatables' }, 'tomato'),
        new TypeaheadMatch({ id: 8, name: 'cucumber', category: 'vegatables' }, 'cucumber')
      ];

      fixture.detectChanges();
      tick(1);
      // component.ngAfterViewInit();
      let headers = fixture.debugElement.queryAll(By.css('.dropdown-header'));
      if (headers) {
        headerMatch = asNativeElements(headers);
      }
      itemMatches = asNativeElements(fixture.debugElement.queryAll(By.css('.dropdown-menu li:not(.dropdown-header)')));
      containingElementScrollable = asNativeElements(fixture.debugElement.queryAll(By.css('.dropdown-menu')));
    }));

    describe('rendering', () => {
      it('should render scrollable element', () => {
        expect(containingElementScrollable[0]).toBeDefined();
      });

      it('should not throw exception when scrollPrevious is without li elements', () => {
        (component as any).liElements = undefined;
        (component as any).scrollPrevious(1);
        expect(component.element.nativeElement.scrollTop).toBe(0);
      });

      it('should not throw exception when scrollPrevious is scrolling outside of index ', () => {
        (component as any).scrollPrevious(100);
        expect(component.element.nativeElement.scrollTop).toBe(0);

      });

      it('should not throw exception when scrollNext is without li elements', () => {
        (component as any).liElements = undefined;

        (component as any).scrollNext(1);
        expect(component.element.nativeElement.scrollTop).toBe(0);

      });

      it('should not throw exception when scrollNext is scrolling outside of index', () => {
        (component as any).scrollNext(100);
        expect(component.element.nativeElement.scrollTop).toBe(0);
      });

      it('should render 9 item matches', () => {
        expect(itemMatches.length).toBe(9);
      });

      it('should show scrollbars', () => {
        expect(getComputedStyle(containingElementScrollable[0]).getPropertyValue('overflow-y')).toBe('scroll');
      });

      xit('should show correct height on scrollable element', () => {
        expect(getComputedStyle(containingElementScrollable[0]).getPropertyValue('height')).toBe('60px');
      });

      it('should highlight query for item match', () => {
        expect(itemMatches[1].children[0].children[0].innerHTML).toBe('<strong>a</strong>pple');
      });

      it('should set the \"active\" class on the first item match', () => {
        expect(itemMatches[0].classList.contains('active')).toBeTruthy();
      });
    });

    describe('nextActiveMatch', () => {
      it('should select the next item match', () => {
        component.nextActiveMatch();
        expect(component.isActive(component.matches[1])).toBeTruthy();
      });
      it('should select the next item match and scroll', fakeAsync(() => {
        component.nextActiveMatch();
        component.nextActiveMatch();
        fixture.detectChanges();
        tick(1);
        expect(component.isActive(component.matches[2])).toBeTruthy();
        expect(containingElementScrollable[0].scrollTop).toBe(0);
      }));
      it('should select the last item match and scroll', () => {
        for (let i = 0; i < 8; i++) {
          component.nextActiveMatch();
        }
        expect(component.isActive(component.matches[10])).toBeTruthy();
      });

      it('should select the first item match and scroll to top', () => {
        for (let i = 0; i < 9; i++) {
          component.nextActiveMatch();
        }
        expect(component.isActive(component.matches[0])).toBeTruthy();
        expect(containingElementScrollable[0].scrollTop).toBe(0);
      });
    });

    describe('prevActiveMatch', () => {
      it('should select the last item and scroll to bottom', () => {
        component.prevActiveMatch();
        expect(component.isActive(component.matches[10])).toBeTruthy();
        expect(containingElementScrollable[0].scrollTop <= containingElementScrollable[0].scrollHeight).toBeTruthy();
      });

      it('should select the prev item match', () => {
        component.nextActiveMatch();
        component.nextActiveMatch();
        component.nextActiveMatch();
        component.prevActiveMatch();
        expect(component.isActive(component.matches[2])).toBeTruthy();
      });
    });

  });

});
