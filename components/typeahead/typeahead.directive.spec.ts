import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TypeaheadModule } from './typeahead.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypeaheadDirective } from './typeahead.directive';
import { Observable } from 'rxjs';
import { TypeaheadMatch } from './typeahead-match.class';

const template = `
  <input [(ngModel)]="selectedState" [typeahead]="states" (typeaheadOnSelect)="typeaheadOnSelect($event)">
`;

@Component({
  template
})
class TestTypeaheadComponent {
  public selectedState:string;
  public states:string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'];
}

describe('Directive: Typeahead', () => {
  let fixture:ComponentFixture<TestTypeaheadComponent>;
  let component:TestTypeaheadComponent;
  let directive:TypeaheadDirective;
  let inputElement:HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestTypeaheadComponent],
      imports: [TypeaheadModule]
    }).createComponent(TestTypeaheadComponent);

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
      expect(directive.container).toBeFalsy();
    });
  });

  describe('onChange', () => {

    it('should result in 2 matches, when \"Ala\" is entered', fakeAsync(() => {
      inputElement.value = 'Ala';
      inputElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick(100);

      expect(directive.matches).toEqual([new TypeaheadMatch('Alabama'), new TypeaheadMatch('Alaska')]);
    }));

    it('should result in 0 matches, when input does not match', fakeAsync(() => {
      inputElement.value = 'foo';
      inputElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick(100);

      expect(directive.matches).toEqual([]);
    }));

  });

  describe('show', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'California';
      inputElement.dispatchEvent(new Event('keyup'));

      fixture.detectChanges();
      tick(100);
    }));

    it('should render the typeahead-container child element', () => {
      fixture.detectChanges();
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));

      expect(typeaheadContainer).not.toBeNull();
    });

    it('should set the container reference', () => {
      expect(directive.container).toBeTruthy();
    });
  });

});
