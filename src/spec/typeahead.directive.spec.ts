/* tslint:disable:max-file-line-count */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { dispatchMouseEvent, dispatchTouchEvent, dispatchKeyboardEvent } from '@netbasal/spectator';
import { of } from 'rxjs';
import { TypeaheadMatch, TypeaheadDirective, TypeaheadModule } from '../typeahead';

interface State {
  id: number;
  name: string;
  region: string;
}

@Component({
  template: `
    <input [(ngModel)]="selectedState"
           [typeahead]="states"
           [typeaheadOptionField]="'name'"
           (typeaheadOnBlur)="onBlurEvent($event)">`
})
class TestTypeaheadComponent {
  selectedState: string;
  states: State[] = [
    {id: 1, name: 'Alabama', region: 'South'},
    {id: 2, name: 'Alaska', region: 'West'},
    {id: 3, name: 'Arizona', region: 'West'},
    {id: 4, name: 'Arkansas', region: 'South'}
  ];

  onBlurEvent(activeItem) { return undefined; }
}

describe('Directive: Typeahead', () => {
  let fixture: ComponentFixture<TestTypeaheadComponent>;
  let component: TestTypeaheadComponent;
  let directive: TypeaheadDirective;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestTypeaheadComponent],
      imports: [TypeaheadModule.forRoot(), BrowserAnimationsModule, FormsModule]
    }).createComponent(TestTypeaheadComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    // get the typeahead directive instance
    const inputs = fixture.debugElement.queryAll(
      By.directive(TypeaheadDirective)
    );
    directive = inputs.map(
      (de: DebugElement) =>
        de.injector.get<TypeaheadDirective>(TypeaheadDirective)
    )[0];
  });

  it('should be defined on the test component', () => {
    expect(directive).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should set a default value for typeaheadOptionsLimit', () => {
      expect(directive.typeaheadOptionsLimit).toBe(20);
    });

    it('should set a default value for typeaheadMinLength', () => {
      expect(directive.typeaheadMinLength).toBe(1);
    });

    it('should get a value for typeaheadMinLength if user added it', () => {
      directive.typeaheadMinLength = 4;

      directive.ngOnInit();

      expect(directive.typeaheadMinLength).toBe(4);
    });

    it('should set a default value for typeaheadAsync', () => {
      expect(directive.typeaheadAsync).toBeFalsy();
    });
    it('should set a default value for typeaheadHideResultsOnBlur', () => {
      expect(directive.typeaheadHideResultsOnBlur).toBeTruthy();
    });

    it('should not set the container reference', () => {
      expect(directive._container).toBeFalsy();
    });

    it('should set a default value for typeaheadWaitMs', () => {
      expect(directive.typeaheadWaitMs).toBe(0);
    });

    it('should set a default value for typeaheadSelectFirstItem', () => {
      expect(directive.typeaheadSelectFirstItem).toBeTruthy();
    });

    it('should typeaheadAsync to false, if typeahead is an observable', () => {
      directive.typeahead = of(component.states);

      directive.ngOnInit();

      expect(directive.typeaheadAsync).toBeTruthy();
    });

    it('should not render the typeahead-container', () => {
      const typeaheadContainer = fixture.debugElement.query(
        By.css('typeahead-container')
      );

      expect(typeaheadContainer).toBeNull();
    });
  });

  describe('onInput', () => {
    it('should be called show method', fakeAsync(() => {
        inputElement.value = 'a';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      })
    );

    it('and dropup equal true should be called show method', fakeAsync(() => {
        directive.dropup = true;
        inputElement.value = 'al';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      })
    );

    it('if value was changed to invalid should be called hide method', fakeAsync(() => {
        inputElement.value = 'al';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        inputElement.value = ' ';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
      })
    );

    it('if value equal 0 should be called hide method', fakeAsync(() => {
        inputElement.value = ' ';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
      })
    );

    it('if click event triggers on outside element should be called onOutsideClick method',
      fakeAsync(() => {
        inputElement.value = 'al';
        dispatchTouchEvent(inputElement, 'input');
        tick();

        inputElement.value = ' ';
        dispatchMouseEvent(document, 'click');
        tick();

        expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
      })
    );
  });

  describe('onFocus', () => {
    it('should work if typeaheadMinLength equal 0', fakeAsync(() => {
      directive.typeaheadMinLength = 0;
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
      directive.changeModel(
        new TypeaheadMatch(
          {id: 1, name: 'Alabama', region: 'South'},
          'Alabama'
        )
      );
      expect(component.selectedState).toBe('Alabama');
    });
  });

  describe('onChange grouped', () => {
    beforeEach(
      fakeAsync(() => {
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');
        directive.typeaheadGroupField = 'region';

        fixture.detectChanges();
        tick(100);
      })
    );

    it(
      'should result in a total of 4 matches, when "Ala" is entered',
      fakeAsync(() => {
        expect(directive.matches.length).toBe(4);
      })
    );

    it(
      'should result in 2 header matches, when "Ala" is entered',
      fakeAsync(() => {
        expect(directive.matches).toContain(
          new TypeaheadMatch('South', 'South', true)
        );
        expect(directive.matches).toContain(
          new TypeaheadMatch('West', 'West', true)
        );
      })
    );

    it(
      'should result in 2 item matches, when "Ala" is entered',
      fakeAsync(() => {
        expect(directive.matches).toContain(
          new TypeaheadMatch(
            {id: 1, name: 'Alabama', region: 'South'},
            'Alabama'
          )
        );
        expect(directive.matches).toContain(
          new TypeaheadMatch(
            {id: 2, name: 'Alaska', region: 'West'},
            'Alaska'
          )
        );
      })
    );
  });

  describe('onBlur', () => {
    it('blur event should send the correct active item', fakeAsync(() => {
      inputElement.value = 'Alab';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      spyOn(fixture.componentInstance, 'onBlurEvent').and.callFake(param => {
        expect(param.item.id).toBe(1);
      });
      directive.onBlur();
      expect(directive._container.isFocused).toBeFalsy();
      fixture.detectChanges();
    }));

  });

  describe('if typeaheadHideResultsOnBlur', () => {
    beforeEach(
      fakeAsync(() => {
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');
        directive.typeaheadHideResultsOnBlur = false;
        fixture.detectChanges();
        tick(100);
      })
    );

    it('equal true should be opened',
      fakeAsync(() => {
        dispatchMouseEvent(document, 'click');
        tick();

        expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      })
    );

    it('equal false should be closed',
      fakeAsync(() => {
        directive.typeaheadHideResultsOnBlur = true;
        dispatchMouseEvent(document, 'click');
        tick();

        expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
      })
    );
  });

  describe('onChange', () => {
    beforeEach(
      fakeAsync(() => {
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');

        fixture.detectChanges();
        tick(100);
      })
    );

    it('should render the typeahead-container child element', () => {
      const typeaheadContainer = fixture.debugElement.nativeElement.querySelector(
        'typeahead-container'
      );
      expect(typeaheadContainer).not.toBeNull();
    });

    it('should set the container reference', () => {
      expect(directive._container).toBeTruthy();
    });

    it('should result in a total of 2 matches, when "Ala" is entered', fakeAsync(() => {
        expect(directive.matches.length).toBe(2);
      })
    );

    it('should result in 2 item matches, when "Ala" is entered', fakeAsync(() => {
        expect(directive.matches).toContain(
          new TypeaheadMatch(
            {id: 1, name: 'Alabama', region: 'South'},
            'Alabama'
          )
        );
        expect(directive.matches).toContain(
          new TypeaheadMatch(
            {id: 2, name: 'Alaska', region: 'West'},
            'Alaska'
          )
        );
      })
    );

    it('should result in 0 matches, when input does not match', fakeAsync(() => {
        inputElement.value = 'foo';
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(0);
      })
    );

    it('should not display null item', fakeAsync(() => {
        component.states.push({id: 3, name: null, region: 'West'});
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);

        expect(directive.matches.length).toBe(2);
      })
    );

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
    beforeEach(
      fakeAsync(() => {
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');
        fixture.detectChanges();
        tick(100);
      })
    );

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
      inputElement.value = ' ';
      dispatchTouchEvent(inputElement, 'input');
      tick();

      directive.typeaheadSelectFirstItem = false;
      directive.isActiveItemChanged = true;
      inputElement.value = 'Alab';
      dispatchTouchEvent(inputElement, 'input');
      tick();
      dispatchKeyboardEvent(inputElement, 'keydown', 'TAB');
      tick();

      expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
    }));
  });

  describe('if typeaheadHideResultsOnBlur', () => {
    beforeEach(
      fakeAsync(() => {
        inputElement.value = 'Ala';
        dispatchTouchEvent(inputElement, 'input');
        directive.typeaheadHideResultsOnBlur = false;
        fixture.detectChanges();
        tick(100);
      })
    );

    it('equal true should be opened',
      fakeAsync(() => {
        dispatchMouseEvent(document, 'click');
        tick();

        expect(fixture.nativeElement.querySelector('.dropdown').classList).toContain('open');
      })
    );

    it('equal false should be closed',
      fakeAsync(() => {
        directive.typeaheadHideResultsOnBlur = true;
        dispatchMouseEvent(document, 'click');
        tick();

        expect(fixture.debugElement.query(By.css('typeahead-container'))).toBeNull();
      })
    );
  });
});
