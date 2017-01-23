import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TypeaheadModule } from '../typeahead/typeahead.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypeaheadDirective } from '../typeahead/typeahead.directive';
import { Observable } from 'rxjs';
import { TypeaheadMatch } from '../typeahead/typeahead-match.class';
import { FormsModule } from '@angular/forms';
const { fireEvent } = require('../../scripts/helpers');

interface State {
  id:number;
  name:string;
  region:string;
}

@Component({
  // (typeaheadOnSelect)="typeaheadOnSelect($event)"
  template: `
  <input [(ngModel)]="selectedState" 
         [typeahead]="states" 
         [typeaheadOptionField]="'name'">
`
})
class TestTypeaheadComponent {
  public selectedState:string;
  public states:State[] = [
    {id: 1, name: 'Alabama', region: 'South'},
    {id: 2, name: 'Alaska', region: 'West'}
  ];
}


@Component({
  template: `<div class="no-min-length-async">
  <input [(ngModel)]="selectedState" 
         [typeahead]="dataSourceDelayed" 
         [typeaheadOptionField]="'name'" 
         [typeaheadScrollable]='true'
         [typeaheadMinLength]='0'
         (typeaheadOnSelect)="typeaheadOnSelect($event)">
         </div>
`
})
class TestTypeaheadScrollableAsyncComponent {
  public selectedState: string;
  public states: State[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' }
  ];

  public dataSourceDelayed: Observable<State[]> = Observable.create((observer: any) => {
    // Runs on every search
    setTimeout(() => {
      observer.next(this.selectedState);
    }, 100);
  }).mergeMap((token: string) => this.getStatesSimpleAsObservable(token));

  public getStatesSimpleAsObservable(token: string): Observable<any> {
    let query = new RegExp(token, 'ig');
    return Observable.of(
      this.states.filter((state: any) => {
        return query.test(state);
      })
    );
  }
}

@Component({
  template: `<div class="no-min-length">
  <input [(ngModel)]="selectedState" 
         [typeahead]="states" 
         [typeaheadOptionField]="'name'" 
         [typeaheadScrollable]='true'
         [typeaheadMinLength]='0'
         (typeaheadOnSelect)="typeaheadOnSelect($event)">
         </div>
`
})
class TestTypeaheadScrollableComponent {
  public selectedState: string;
  public states: State[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' }
  ];
}

@Component({
  template: `<div class="min-length">
  <input [(ngModel)]="selectedState" 
         [typeahead]="states" 
         [typeaheadOptionField]="'name'" 
         [typeaheadScrollable]='true'
         [typeaheadMinLength]='3'
         (typeaheadOnSelect)="typeaheadOnSelect($event)">
         </div>
`
})
class TestTypeaheadWithMinLengthComponent {
  public selectedState: string;
  public states: State[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' }
  ];
}


describe('Directive: Typeahead', () => {
  let fixture:ComponentFixture<TestTypeaheadComponent>;
  let component:TestTypeaheadComponent;
  let directive:TypeaheadDirective;
  let inputElement:HTMLInputElement;
  let testBed: any;
  beforeEach(() => {
    testBed = TestBed.configureTestingModule({
      declarations: [TestTypeaheadComponent,TestTypeaheadScrollableAsyncComponent,TestTypeaheadScrollableComponent,TestTypeaheadWithMinLengthComponent],
      imports: [TypeaheadModule.forRoot(), FormsModule]
    });
    fixture = testBed.createComponent(TestTypeaheadComponent);

    fixture.detectChanges();

    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    // get the typeahead directive instance
    let inputs = fixture.debugElement.queryAll(By.directive(TypeaheadDirective));
    directive = inputs.map((de:DebugElement) => de.injector.get(TypeaheadDirective) as TypeaheadDirective)[0];
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

    it('should set a default value for typeaheadWaitMs', () => {
      expect(directive.typeaheadWaitMs).toBe(0);
    });

    it('should set a default value for typeaheadAsync', () => {
      expect(directive.typeaheadAsync).toBeFalsy();
    });

    it('should typeaheadAsync to false, if typeahead is an observable', () => {
      directive.typeahead = Observable.of(component.states);
      directive.ngOnInit();

      expect(directive.typeaheadAsync).toBeTruthy();
    });

    it('should not render the typeahead-container', () => {
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));

      expect(typeaheadContainer).toBeNull();
    });

    it('should not set the container reference', () => {
      expect(directive._container).toBeFalsy();
    });
  });

  describe('onChange', () => {

    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      inputElement.focus();
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      fixture.detectChanges();
      tick(100);
      
    }));

    it('should render the typeahead-container child element', () => {
      
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      

      expect(typeaheadContainer).not.toBeNull();
    });

    it('should set the container reference', () => {
      expect(directive._container).toBeTruthy();
    });

    it('should result in a total of 2 matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches.length).toBe(2);
    }));

    it('should result in 2 item matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches).toContain(new TypeaheadMatch({id: 1, name: 'Alabama', region: 'South'}, 'Alabama'));
      expect(directive.matches).toContain(new TypeaheadMatch({id: 2, name: 'Alaska', region: 'West'}, 'Alaska'));
    }));

    it('should result in 0 matches, when input does not match', fakeAsync(() => {
      inputElement.value = 'foo';
      inputElement.focus();
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');

      fixture.detectChanges();
      tick(100);

      expect(directive.matches.length).toBe(0);
    }));
  });

  describe('onChange keyup with minlength', () => {
    beforeEach(fakeAsync(() => {
      fixture = testBed.createComponent(TestTypeaheadWithMinLengthComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.css('.min-length input')).nativeElement as HTMLInputElement;

      // get the typeahead directive instance
      let inputs = fixture.debugElement.queryAll(By.directive(TypeaheadDirective));
      directive = inputs.map((de: DebugElement) => de.injector.get(TypeaheadDirective) as TypeaheadDirective)[0];
      inputElement.focus();
      inputElement.value = '';

      fireEvent(inputElement, 'input');

      fixture.detectChanges();
      tick(1);

    }));

    it('should not render the typeahead-container child element', fakeAsync(() => {
      let typeaheadContainer = fixture.debugElement.query(By.css('.min-length typeahead-container'));
      expect(typeaheadContainer).toBeNull();
    }));

    it('should render the typeahead-container child element when 3 chars are typed', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'ala';

      fireEvent(inputElement, 'input');

      fixture.detectChanges();
      tick(1);
      let typeaheadContainer = fixture.debugElement.query(By.css('.min-length typeahead-container'));
      expect(typeaheadContainer).not.toBeNull();
    }));

    it('should emit not loading if less than 3 chars', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'a';
      let event: any = {
        target: {
          value: 'a'
        },
        preventDefault: (): any => undefined
      };
      let emitSpy = spyOn(directive.typeaheadLoading, 'emit').and.callThrough();
      directive.onChange(event as Event);
      expect(emitSpy.calls.count()).toBe(1);
    }));
  });



  describe('onKeyDown', () => {
    beforeEach(fakeAsync(() => {

      inputElement.focus();
      inputElement.value = 'Ala';
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      
      fixture.detectChanges();
      tick(1);

    }));
 

    it('should preventDefault on enter', () => {
      let event: any = {
        keyCode: 13,
        preventDefault: (): any => undefined
      };
      let preventDefaultSpy = spyOn(event, 'preventDefault').and.callThrough();

      expect(directive._container).toBeTruthy();
      directive.onKeydown(event as KeyboardEvent);
      expect(preventDefaultSpy.calls.count()).toBe(1);
    });

    xit('should hide typeahead-container', () => {
      let event: any = {
        keyCode: 9,
        preventDefault: (): any => undefined
      };

      let hideSpy = spyOn(directive, 'hide').and.callThrough();
      directive.onKeydown(event as KeyboardEvent);
      expect(hideSpy.calls.count()).toBe(1);
    });

    it('should select active match', () => {
      let event: any = {
        keyCode: 13,
        preventDefault: (): any => undefined,
        target: {
          value: 'Ala'
        }
      };
      let selectActiveMatchSpy = spyOn(directive._container, 'selectActiveMatch').and.callThrough();
      directive.onKeyUp(event as Event);
      expect(selectActiveMatchSpy.calls.count()).toBe(1);

    });

    it('should select next active match', () => {
      let event: any = {
        keyCode: 40,
        preventDefault: (): any => undefined,
        target: {
          value: 'Ala'
        }
      };
      let prevActiveMatchSpy = spyOn(directive._container, 'nextActiveMatch').and.callThrough();
      directive.onKeyUp(event as Event);
      expect(prevActiveMatchSpy.calls.count()).toBe(1);

    });

    it('should select prev match', () => {
      let event: any = {
        keyCode: 38,
        preventDefault: (): any => undefined,
        target: {
          value: 'Ala'
        }
      };
      let prevActiveMatchSpy = spyOn(directive._container, 'prevActiveMatch').and.callThrough();
      directive.onKeyUp(event as Event);
      expect(prevActiveMatchSpy.calls.count()).toBe(1);

    });

    xit('should hide typeahead-container on esc', () => {
      let tmpFixture = testBed.createComponent(TestTypeaheadComponent);
      tmpFixture.detectChanges();

      // get the typeahead directive instance
      let inputs = tmpFixture.debugElement.queryAll(By.directive(TypeaheadDirective));
      let tmpDirective = inputs.map((de: DebugElement) => de.injector.get(TypeaheadDirective) as TypeaheadDirective)[0];
      let event: any = {
        keyCode: 27,
        preventDefault: (): any => undefined,
        target: {
          value: 'Ala'
        }
      };

      let hideSpy2 = spyOn(tmpDirective, 'hide').and.callThrough();
      directive.onChange(event as Event);
      expect(hideSpy2.calls.count()).toBe(1);

    });

  });
  

  describe('onChange grouped', () => {

    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      inputElement.focus();
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      directive.typeaheadGroupField = 'region';

      fixture.detectChanges();
      tick(100);
    }));

    it('should result in a total of 4 matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches.length).toBe(4);
    }));

    it('should result in 2 header matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches).toContain(new TypeaheadMatch('South', 'South', true));
      expect(directive.matches).toContain(new TypeaheadMatch('West', 'West', true));
    }));

    it('should result in 2 item matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches).toContain(new TypeaheadMatch({id: 1, name: 'Alabama', region: 'South'}, 'Alabama'));
      expect(directive.matches).toContain(new TypeaheadMatch({id: 2, name: 'Alaska', region: 'West'}, 'Alaska'));
    }));
  });

  describe('changeModel', () => {
    it('should set the selectedState value', () => {
      directive.changeModel(new TypeaheadMatch({id: 1, name: 'Alabama', region: 'South'}, 'Alabama'));

      expect(component.selectedState).toBe('Alabama');
    });
  });

  describe('no minlength', () => {
    beforeEach(() => {

      fixture = testBed.createComponent(TestTypeaheadScrollableComponent);

      fixture.detectChanges();

      component = fixture.componentInstance;
      let inputDirective = fixture.debugElement.query(By.css('.no-min-length input'));

      inputElement = inputDirective.nativeElement as HTMLInputElement;
      // get the typeahead directive instance
      directive = inputDirective.injector.get(TypeaheadDirective) as TypeaheadDirective;
    });

    it('should render the typeahead-container child element', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = '';
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      fixture.detectChanges();
      tick(1);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      expect(typeaheadContainer).toBeTruthy();
    }));

    it('should render it agian', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Alaba';
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      fixture.detectChanges();
      tick(1);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      expect(typeaheadContainer).toBeTruthy();
      expect(directive._container).toBeTruthy();
    }));

    it('should use same container', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Alaba';
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      fixture.detectChanges();
      tick(1);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      const firstContainer = directive._container;
      expect(typeaheadContainer).toBeTruthy();
      expect(directive._container).toBeTruthy();
      inputElement.value = 'Ala';
      fireEvent(inputElement, 'input');
      fireEvent(inputElement, 'keyup');
      fixture.detectChanges();
      tick(1);
      expect(firstContainer === directive._container).toBe(true);
    }));

  });

});
