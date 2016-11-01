import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { TypeaheadModule } from './typeahead.module';
import { Component, DebugElement } from '@angular/core';
import { TypeaheadDirective } from './typeahead.directive';
import { Observable } from 'rxjs';
import { TypeaheadMatch } from './typeahead-match.class';
import { By } from '@angular/platform-browser';

interface State {
  id: number;
  name: string;
  region: string;
}

@Component({
  template: `<div class='default'>
  <input [(ngModel)]="selectedState" 
         [typeahead]="states" 
         [typeaheadOptionField]="'name'" 
         (typeaheadOnSelect)="typeaheadOnSelect($event)"></div>
`
})
class TestTypeaheadComponent {
  public selectedState: string;
  public states: State[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' }
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
  public fakeCallback: EventEmitter<any> = new EventEmitter();
  public dataSourceDelayed: Observable<State[]> = Observable.create((observer: any) => {
    // Runs on every search
    setTimeout(() => {
      observer.next(this.selectedState);
      this.fakeCallback.emit(this.selectedState);
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

describe('Directive: Typeahead', () => {
  let fixture: ComponentFixture<TestTypeaheadComponent>;
  let component: TestTypeaheadComponent;
  let directive: TypeaheadDirective;
  let inputElement: HTMLInputElement;
  let testBed: any;
  beforeEach(() => {
    testBed = TestBed.configureTestingModule({
      declarations: [TestTypeaheadComponent, TestTypeaheadScrollableComponent, TestTypeaheadScrollableAsyncComponent],
      imports: [TypeaheadModule]
    });
    fixture = testBed.createComponent(TestTypeaheadComponent);

    fixture.detectChanges();

    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('.default input')).nativeElement as HTMLInputElement;

    // get the typeahead directive instance
    let inputs = fixture.debugElement.queryAll(By.directive(TypeaheadDirective));
    directive = inputs.map((de: DebugElement) => de.injector.get(TypeaheadDirective) as TypeaheadDirective)[0];
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
      let typeaheadContainer = fixture.debugElement.query(By.css('.default typeahead-container'));

      expect(typeaheadContainer).toBeNull();
    });

    it('should not set the container reference', () => {
      expect(directive.container).toBeFalsy();
    });

  });

  describe('onChange keyup', () => {

    beforeEach(fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Ala';

      inputElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick(100);
    }));

    it('should render the typeahead-container child element', fakeAsync(() => {
      let typeaheadContainer = fixture.debugElement.query(By.css('.default typeahead-container'));
      expect(typeaheadContainer).not.toBeNull();
    }));

    it('should set the container reference', () => {
      expect(directive.container).toBeTruthy();
    });

    it('should result in a total of 2 matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches.length).toBe(2);
    }));

    it('should result in 2 item matches, when \"Ala\" is entered', fakeAsync(() => {
      expect(directive.matches).toContain(new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama'));
      expect(directive.matches).toContain(new TypeaheadMatch({ id: 2, name: 'Alaska', region: 'West' }, 'Alaska'));
    }));

    it('should result in 0 matches, when input does not match', fakeAsync(() => {
      inputElement.value = 'foo';
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      expect(directive.matches.length).toBe(0);
    }));

    it('should prevent default on enter', () => {
      let event: any = {
        keyCode: 13,
        preventDefault: () => undefined
      };
      let preventDefaultSpy = spyOn(event, 'preventDefault').and.callThrough();
      expect(directive.container).toBeTruthy();
      directive.onKeydown(event as KeyboardEvent);
      expect(preventDefaultSpy.calls.count()).toBe(1);
    });

    it('should hide typeahead-container', () => {
      let event: any = {
        keyCode: 9,
        preventDefault: () => undefined
      };
      let hideSpy = spyOn(directive, 'hide').and.callThrough();
      directive.onKeydown(event as KeyboardEvent);
      expect(hideSpy.calls.count()).toBe(1);

    });

  });

  describe('onChange grouped', () => {

    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
      inputElement.dispatchEvent(new Event('keyup'));
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
      expect(directive.matches).toContain(new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama'));
      expect(directive.matches).toContain(new TypeaheadMatch({ id: 2, name: 'Alaska', region: 'West' }, 'Alaska'));
    }));
  });

  describe('changeModel', () => {
    it('should set the selectedState value', () => {
      directive.changeModel(new TypeaheadMatch({ id: 1, name: 'Alabama', region: 'South' }, 'Alabama'));
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
      inputElement.dispatchEvent(new Event('keydown'));
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      expect(typeaheadContainer).toBeTruthy();
    }));

    it('should render it agian', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Alaba';
      inputElement.dispatchEvent(new Event('keydown'));
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      expect(typeaheadContainer).toBeTruthy();
      expect(directive.container).toBeTruthy();
    }));

    it('should use same container', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Alaba';
      inputElement.dispatchEvent(new Event('keydown'));
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      const firstContainer = directive.container;
      expect(typeaheadContainer).toBeTruthy();
      expect(directive.container).toBeTruthy();
      inputElement.value = 'Ala';
      inputElement.dispatchEvent(new Event('keydown'));
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      expect(firstContainer === directive.container).toBe(true);
    }));

  });

  describe('no minlength and async', () => {
    let componentAsync: TestTypeaheadScrollableAsyncComponent;
    let fakeElement: HTMLElement;
    beforeEach(() => {

      fixture = testBed.createComponent(TestTypeaheadScrollableAsyncComponent);

      fixture.detectChanges();

      componentAsync = fixture.componentInstance;
      let inputDirective = fixture.debugElement.query(By.css('.no-min-length-async input'));

      inputElement = inputDirective.nativeElement as HTMLInputElement;
      // get the typeahead directive instance

      directive = inputDirective.injector.get(TypeaheadDirective) as TypeaheadDirective;

      inputElement.value = '';
      fakeElement = document.createElement('input');
      document.body.appendChild(fakeElement);

    });

    it('should not set input to focused when user blur input before async load', fakeAsync(() => {
      inputElement.focus();
      inputElement.value = 'Alaba';
      inputElement.dispatchEvent(new Event('keydown'));
      inputElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      tick(100);
      fakeElement.focus();
      (directive as any).finalizeAsyncCall(component.states);
      let typeaheadContainer = fixture.debugElement.query(By.css('.no-min-length typeahead-container'));
      expect(typeaheadContainer).toBeFalsy();
      expect(directive.container).toBeFalsy();
      tick(100);
      fixture.detectChanges();
    }));

    afterEach(() => {
      fakeElement.remove();
    });
  });

});
