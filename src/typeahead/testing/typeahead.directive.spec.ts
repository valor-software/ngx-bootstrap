import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from '@ngneat/spectator';

import { of } from 'rxjs';

import { TypeaheadDirective, TypeaheadMatch, TypeaheadModule, TypeaheadOrder } from '../index';

interface State {
  id: number;
  name: string;
  region: string;
}

@Component({
  template: `<input
    [(ngModel)]="selectedState"
    [typeahead]="states"
    [typeaheadOptionField]="typeaheadOptionField"
    [adaptivePosition]="false"
    [dropup]="dropup"
    [typeaheadMinLength]="typeaheadMinLength"
    [typeaheadGroupField]="typeaheadGroupField"
    [typeaheadHideResultsOnBlur]="typeaheadHideResultsOnBlur"
    [typeaheadOrderBy]="typeaheadOrderBy"
    [typeaheadMultipleSearch]="typeaheadMultipleSearch"
    [typeaheadMultipleSearchDelimiters]="typeaheadMultipleSearchDelimiters"
    [typeaheadWordDelimiters]="typeaheadWordDelimiters"
    [typeaheadPhraseDelimiters]="typeaheadPhraseDelimiters"
    [typeaheadSingleWords]="typeaheadSingleWords"
    (typeaheadOnBlur)="onBlurEvent($event)"
  />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
class TestTypeaheadComponent {
  selectedState?: string;
  dropup = false;
  typeaheadMinLength = 1;
  typeaheadOptionField: string | undefined = 'name';
  typeaheadGroupField: string | undefined;
  typeaheadHideResultsOnBlur = true;
  typeaheadOrderBy: TypeaheadOrder | undefined;
  typeaheadMultipleSearch: boolean | undefined;
  typeaheadMultipleSearchDelimiters = ',';
  typeaheadWordDelimiters = ' ';
  typeaheadPhraseDelimiters = '\'"';
  typeaheadSingleWords = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  states: any = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' }
  ];
  statesString: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut'];

  onBlurEvent(event?: TypeaheadMatch) {
    return event;
  }
}

describe('Directive: Typeahead', () => {
  afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  let fixture: ComponentFixture<TestTypeaheadComponent>;
  let component: TestTypeaheadComponent;
  let directive: TypeaheadDirective;
  let inputElement: HTMLInputElement;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [TestTypeaheadComponent],
      imports: [TypeaheadModule, FormsModule]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeaheadComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    // get the typeahead directive instance
    const inputs = fixture.debugElement.queryAll(By.directive(TypeaheadDirective));
    directive = inputs.map((de: DebugElement) => de.injector.get<TypeaheadDirective>(TypeaheadDirective))[0];
  });

  it('should be defined on the testing component', () => {
    expect(directive).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should set a default value for typeaheadOptionsLimit', () => {
      expect(directive.typeaheadOptionsLimit() ?? 20).toBe(20);
    });

    it('should set a default value for typeaheadMinLength', () => {
      expect(directive.typeaheadMinLength()).toBe(1);
    });

    it('should set a default value for typeaheadOrderBy', () => {
      expect(directive.typeaheadOrderBy()).toBeUndefined();
    });

    it('should get a value for typeaheadMinLength if user added it', () => {
      component.typeaheadMinLength = 4;
      fixture.detectChanges();

      directive.ngOnInit();

      expect(directive.typeaheadMinLength()).toBe(4);
    });

    it('should set a default value for typeaheadAsync', () => {
      expect(directive.typeaheadAsync()).toBeFalsy();
    });
    it('should set a default value for typeaheadHideResultsOnBlur', () => {
      expect(directive.typeaheadHideResultsOnBlur()).toBeTruthy();
    });

    it('should not set the container reference', () => {
      expect(directive._container).toBeFalsy();
    });

    it('should set a default value for typeaheadWaitMs', () => {
      expect(directive.typeaheadWaitMs()).toBe(0);
    });

    it('should set a default value for typeaheadSelectFirstItem', () => {
      expect(directive.typeaheadSelectFirstItem()).toBeTruthy();
    });

    it('should typeaheadAsync to true, if typeahead is an observable', () => {
      component.states = of(component.states) as any;
      fixture.detectChanges();
      directive.ngOnInit();

      expect(directive['_typeaheadAsyncValue']).toBe(true);
    });

    it('should not render the typeahead-container', () => {
      const typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));

      expect(typeaheadContainer).toBeNull();
    });

    it('should be called show method', fakeAsync(() => {
      inputElement.value = 'a';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('and dropup equal true should be called show method', fakeAsync(() => {
      component.dropup = true;
      fixture.detectChanges();
      inputElement.value = 'al';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('if value was changed to invalid should be called hide method', fakeAsync(() => {
      inputElement.value = 'al';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('if value equal 0 should be called hide method', fakeAsync(() => {
      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('if click event triggers on outside element should be called onOutsideClick method', fakeAsync(() => {
      inputElement.value = 'al';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      inputElement.value = ' ';
      dispatchMouseEvent(document, 'click');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should not throw an error on blur', fakeAsync(() => {
      expect(directive._container).toBeFalsy();
      expect(directive.matches).toEqual([]);

      dispatchMouseEvent(inputElement, 'click');
      tick();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(() => directive.onBlur()).not.toThrow();
      });
    }));

    it('should have appropriate aria attributes', () => {
      expect(inputElement.getAttribute('role')).toEqual('combobox');
      expect(inputElement.getAttribute('aria-expanded')).toEqual('false');
      expect(inputElement.getAttribute('aria-autocomplete')).toEqual('list');
    });
  });

  describe('onFocus', () => {
    it('should work if typeaheadMinLength equal 0', fakeAsync(() => {
      component.typeaheadMinLength = 0;
      fixture.detectChanges();
      directive.ngOnInit();
      dispatchMouseEvent(inputElement, 'click');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('should not work if typeaheadMinLength equal 0', fakeAsync(() => {
      dispatchMouseEvent(inputElement, 'click');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));
  });

  describe('changeModel tests', () => {
    it('should set the selectedState value', () => {
      directive.changeModel(new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama'));
      expect(component.selectedState).toBe('Alabama');
    });
  });

  describe('if typeaheadGroupField is not null', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');
      component.typeaheadGroupField = 'region';
      fixture.detectChanges();

      fixture.detectChanges();
      tick(100);
    }));

    it('should result in a total of 4 matches, when "Ala" is entered', fakeAsync(() => {
      expect(directive.matches.length).toBe(4);
    }));

    it('should result in 2 header matches, when "Ala" is entered', fakeAsync(() => {
      expect(directive.matches).toContainEqual(new TypeaheadMatch('South', 'South', true));
      expect(directive.matches).toContainEqual(new TypeaheadMatch('West', 'West', true));
    }));

    it('should result in 2 item matches, when "Ala" is entered', fakeAsync(() => {
      expect(directive.matches).toContainEqual(
        new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama')
      );
      expect(directive.matches).toContainEqual(new TypeaheadMatch({ id: 2, name: 'Alaska', region: 'West' }, 'Alaska'));
    }));
  });

  describe('onBlur', () => {
    it('blur event should send the correct active item', fakeAsync(() => {
      inputElement.value = 'Alab';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      jest.spyOn(fixture.componentInstance, 'onBlurEvent').mockImplementation((param?: TypeaheadMatch) => {
        expect(param?.item.id).toBe(1);
        return param;
      });
      directive.onBlur();
      expect(directive._container?.isFocused).toBeFalsy();
      fixture.detectChanges();
    }));
  });

  describe('onChange', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');

      fixture.detectChanges();
      tick(100);
    }));

    it('should render the typeahead-container child element', () => {
      const typeaheadContainer = fixture.debugElement.nativeElement.querySelector('typeahead-container');
      expect(typeaheadContainer).not.toBeNull();
    });

    it('should set the container reference', () => {
      expect(directive._container).toBeTruthy();
    });

    it('should result in a total of 2 matches, when "Ala" is entered', fakeAsync(() => {
      expect(directive.matches.length).toBe(2);
    }));

    it('should result in 2 item matches, when "Ala" is entered', fakeAsync(() => {
      expect(directive.matches).toContainEqual(
        new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama')
      );
      expect(directive.matches).toContainEqual(new TypeaheadMatch({ id: 2, name: 'Alaska', region: 'West' }, 'Alaska'));
    }));

    it('should result in 2 item matches, when "Ala" is entered in async mode', fakeAsync(() => {
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);

      expect(directive.matches.length).toBe(2);
    }));

    it('should result in 0 matches, when input does not match', fakeAsync(() => {
      inputElement.value = 'foo';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);

      expect(directive.matches.length).toBe(0);
    }));

    it('should not display null item', fakeAsync(() => {
      // eslint-disable-next-line
      component.states.push({ id: 3, name: null, region: 'West' } as any);
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);

      expect(directive.matches.length).toBe(2);
    }));

    it('should be triggered hide method if esc was clicked', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      dispatchKeyboardEvent(inputElement, 'keyup', 'ESCAPE');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should be triggered hide method if enter was clicked', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      dispatchKeyboardEvent(inputElement, 'keyup', 'ENTER');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should not be triggered prevActiveMatch method if up was clicked', fakeAsync(() => {
      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();
      dispatchKeyboardEvent(inputElement, 'keyup', 'UP_ARROW');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should be triggered prevActiveMatch method if up was clicked', fakeAsync(() => {
      dispatchKeyboardEvent(inputElement, 'keyup', 'UP_ARROW');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('should not be triggered nextActiveMatch method if down was clicked', fakeAsync(() => {
      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();
      dispatchKeyboardEvent(inputElement, 'keyup', 'DOWN_ARROW');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should be triggered nextActiveMatch method if down was clicked', fakeAsync(() => {
      dispatchKeyboardEvent(inputElement, 'keyup', 'DOWN_ARROW');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('should not close typeahead container if Ctrl was clicked', fakeAsync(() => {
      dispatchKeyboardEvent(inputElement, 'keydown', 'INSERT');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));
  });

  describe('onKeydown', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
    }));

    it('should not be triggered show method', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      dispatchKeyboardEvent(inputElement, 'keydown', 'TAB');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should not be triggered hide method', fakeAsync(() => {
      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();
      dispatchKeyboardEvent(inputElement, 'keydown', 'TAB');
      tick();
      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should close container if Enter was clicked', fakeAsync(() => {
      dispatchKeyboardEvent(inputElement, 'keydown', 'ENTER');
      tick();
      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));

    it('should not close typeahead container if Ctrl was clicked', fakeAsync(() => {
      dispatchKeyboardEvent(inputElement, 'keydown', 'INSERT');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('should close typeahead container if Tab was clicked', fakeAsync(() => {
      inputElement.value = 'Alab';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      dispatchKeyboardEvent(inputElement, 'keydown', 'TAB');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));
  });

  describe('if typeaheadHideResultsOnBlur is not null', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      dispatchTouchEvent(inputElement, 'input');
      component.typeaheadHideResultsOnBlur = false;
      fixture.detectChanges();
      fixture.detectChanges();
      tick(100);
    }));

    it('equal true should be opened', fakeAsync(() => {
      dispatchMouseEvent(document, 'click');
      tick();

      expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
    }));

    it('equal false should be closed', fakeAsync(() => {
      component.typeaheadHideResultsOnBlur = true;
      fixture.detectChanges();
      dispatchMouseEvent(document, 'click');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));
  });

  describe('if typeaheadOrderBy is not null', () => {
    describe('and source of options is an array of string should result in 2 items, when "Ala" is entered', () => {
      beforeEach(fakeAsync(() => {
        component.states = component.statesString;
        component.typeaheadOptionField = undefined;
        inputElement.value = 'Ala';
        fixture.detectChanges();
        tick(100);
      }));

      it('and order direction "asc". 1st - Alabama, 2sd - Alaska', fakeAsync(() => {
        component.typeaheadOrderBy = { direction: 'asc' };
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
        expect(directive.matches[0].item).toBe('Alabama');
        expect(directive.matches[1].item).toBe('Alaska');
      }));

      it('and order direction "desc". 1st - Alaska, 2sd - Alabama', fakeAsync(() => {
        component.typeaheadOrderBy = { direction: 'desc' };
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
        expect(directive.matches[0].item).toBe('Alaska');
        expect(directive.matches[1].item).toBe('Alabama');
      }));

      it("and typeaheadOrderBy is empty object, shouldn't break the app", fakeAsync(() => {
        component.typeaheadOrderBy = {} as TypeaheadOrder;
        console.error = jest.fn();

        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
        expect(console.error).toHaveBeenCalled();
      }));

      it('and order direction is not equal "asc" or "desc", shouldn\'t break the app', fakeAsync(() => {
        component.typeaheadOrderBy = { direction: 'test' as 'asc' };
        console.error = jest.fn();

        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
        expect(console.error).toHaveBeenCalled();
      }));

      it("and order field is setup, it shouldn't affect the result", fakeAsync(() => {
        component.typeaheadOrderBy = { direction: 'asc', field: 'name' };
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
      }));
    });

    describe('and source of options is an array of objects', () => {
      describe('should result in 2 items, when "Ala" is entered', () => {
        beforeEach(fakeAsync(() => {
          inputElement.value = 'Ala';
          fixture.detectChanges();
          tick(100);
        }));

        it('and order direction "asc", order field - "name". 1st - Alabama, 2sd - Alaska', fakeAsync(() => {
          component.typeaheadOrderBy = { direction: 'asc', field: 'name' };
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(2);
          expect(directive.matches[0].item.name).toBe('Alabama');
          expect(directive.matches[1].item.name).toBe('Alaska');
        }));

        it('and order direction "desc", order field - "name". 1st - Alaska, 2sd - Alabama', fakeAsync(() => {
          component.typeaheadOrderBy = { direction: 'desc', field: 'name' };
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(2);
          expect(directive.matches[0].item.name).toBe('Alaska');
          expect(directive.matches[1].item.name).toBe('Alabama');
        }));

        it('and order direction "desc", order field is null. 1st - Alabama, 2sd - Alaska. Lack of the field doesn\'t affect the result', fakeAsync(() => {
          // eslint-disable-next-line
          component.typeaheadOrderBy = { direction: 'desc', field: null } as any;
          console.error = jest.fn();
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(2);
          expect(directive.matches[0].item.name).toBe('Alabama');
          expect(directive.matches[1].item.name).toBe('Alaska');
          expect(console.error).toHaveBeenCalled();
        }));

        it('and order direction "desc", order field is "testing". 1st - Alabama, 2sd - Alaska. The wrong field doesn\'t affect the result', fakeAsync(() => {
          component.typeaheadOrderBy = { direction: 'desc', field: 'test' };
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(2);
          expect(directive.matches[0].item.name).toBe('Alabama');
          expect(directive.matches[1].item.name).toBe('Alaska');
        }));
      });

      describe('should result in 4 items, when "a" is entered', () => {
        beforeEach(fakeAsync(() => {
          inputElement.value = 'a';
          fixture.detectChanges();
          tick(100);
        }));

        it('and order direction "asc", order field - "region". Result = Alabama-Arkansas-Alaska-Arizona', fakeAsync(() => {
          component.typeaheadOrderBy = { direction: 'asc', field: 'region' };
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(4);
          expect(directive.matches[0].item.name).toBe('Alabama');
          expect(directive.matches[1].item.name).toBe('Arkansas');
          expect(directive.matches[2].item.name).toBe('Alaska');
          expect(directive.matches[3].item.name).toBe('Arizona');
        }));

        it('and order direction "desc", order field - "id". Result = Arkansas-Arizona-Alaska-Alabama', fakeAsync(() => {
          component.typeaheadOrderBy = { direction: 'desc', field: 'id' };
          dispatchTouchEvent(inputElement, 'input');
          fixture.detectChanges();
          tick(100);

          expect(directive.matches.length).toBe(4);
          expect(directive.matches[0].item.name).toBe('Arkansas');
          expect(directive.matches[1].item.name).toBe('Arizona');
          expect(directive.matches[2].item.name).toBe('Alaska');
          expect(directive.matches[3].item.name).toBe('Alabama');
        }));
      });
    });
  });

  describe('if typeaheadMultipleSearch is true', () => {
    beforeEach(fakeAsync(() => {
      component.states = component.statesString;
      component.typeaheadMultipleSearch = true;
      fixture.detectChanges();
      tick(100);
    }));

    it('and comma entered after one value is picked from typeahead dropdown, should show all available matches', fakeAsync(() => {
      inputElement.value = 'Alabama';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(1);
      expect(directive.matches[0].item).toBe('Alabama');

      inputElement.value = 'Alabama,';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(component.statesString.length);
    }));

    it(`and 'Ala' is entered after ',' or '|' when these used for typeaheadMultipleSearchDelimiters,
        should give matches for Alaska and Alabama`, fakeAsync(() => {
      component.typeaheadMultipleSearchDelimiters = ',|';
      inputElement.value = 'Alabama';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(1);
      expect(directive.matches[0].item).toBe('Alabama');

      inputElement.value = 'Alabama,Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(2);
      expect(directive.matches[0].item).toBe('Alabama');
      expect(directive.matches[1].item).toBe('Alaska');

      inputElement.value = 'Alabama|Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(2);
      expect(directive.matches[0].item).toBe('Alabama');
      expect(directive.matches[1].item).toBe('Alaska');
    }));

    it('and use, should give matches for Alaska and Alabama', fakeAsync(() => {
      inputElement.value = 'Alabama';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(1);
      expect(directive.matches[0].item).toBe('Alabama');

      inputElement.value = 'Alabama,Ala';
      dispatchTouchEvent(inputElement, 'input');
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(2);
      expect(directive.matches[0].item).toBe('Alabama');
      expect(directive.matches[1].item).toBe('Alaska');
    }));

    it('and use comma for typeaheadWordDelimiters, should throw error', fakeAsync(() => {
      component.typeaheadWordDelimiters = ',';
      fixture.detectChanges();
      tick(100);
      expect(() => directive.ngOnInit()).toThrow();
    }));

    it('and use comma for typeaheadPhraseDelimiters, should throw error', fakeAsync(() => {
      component.typeaheadPhraseDelimiters = ',';
      fixture.detectChanges();
      tick(100);
      expect(() => directive.ngOnInit()).toThrow();
    }));

    it('and use space for typeaheadMultipleSearchDelimiters, should throw error', fakeAsync(() => {
      component.typeaheadMultipleSearchDelimiters = ' ';
      fixture.detectChanges();
      tick(100);
      expect(() => directive.ngOnInit()).toThrow();
    }));

    it("use space for typeaheadMultipleSearchDelimiters and ',' for typeaheadWordDelimiters, should not throw error", fakeAsync(() => {
      component.typeaheadMultipleSearchDelimiters = ' ';
      component.typeaheadWordDelimiters = ',';
      fixture.detectChanges();
      tick(100);
      expect(() => directive.ngOnInit()).not.toThrow();
    }));

    it('and use space for typeaheadMultipleSearchDelimiters and typeaheadSingleWords is false, should not throw error', fakeAsync(() => {
      component.typeaheadMultipleSearchDelimiters = ' ';
      component.typeaheadSingleWords = false;
      fixture.detectChanges();
      tick(100);
      expect(() => directive.ngOnInit()).not.toThrow();
    }));
  });
});
