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
         [typeaheadOptionField]="'name'"
         (typeaheadOnBlur)="onBlurEvent($event)"
         (typeaheadLoading)="onLoading($event)">
`
})
class TestTypeaheadComponent {
  public selectedState:string;
  public states:State[] = [
    {id: 1, name: 'Alabama', region: 'South'},
    {id: 2, name: 'Alaska', region: 'West'}
  ];

  public onBlurEvent (activeItem) { };
  public onLoading (activeItem) { };
}


describe('Directive: Typeahead', () => {
  let fixture:ComponentFixture<TestTypeaheadComponent>;
  let component:TestTypeaheadComponent;
  let directive:TypeaheadDirective;
  let inputElement:HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestTypeaheadComponent],
      imports: [TypeaheadModule.forRoot(), FormsModule]
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
      expect(directive._container).toBeFalsy();
    });
  });

  describe('onChange', () => {

    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
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
      fireEvent(inputElement, 'keyup');

      fixture.detectChanges();
      tick(100);

      expect(directive.matches.length).toBe(0);
    }));

    it('should not show the typeahead if the input length is shorter than the min length', fakeAsync(() =>{
      directive.typeaheadMinLength = 2;

      inputElement.value = 'A';
      fireEvent(inputElement, 'keyup');

      fixture.detectChanges();
      tick(100);
      
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'))
      expect(typeaheadContainer).toBeNull();
    }));

    it('should close container when escape key is pressed', fakeAsync(() =>{
      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 27;
      keyboardEvent['which'] = 27;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);
      
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).toBeNull();
    }));

    it('should select active match when enter key is pressed', fakeAsync(() =>{
      let defaultActive = directive._container.active;

      let match :TypeaheadMatch;
      let sub = directive.typeaheadOnSelect.subscribe(m => {
        match = m;
        sub.unsubscribe();
      });

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      expect(match).toBe(defaultActive);
    }));

    it('should select active match when tab key is pressed', fakeAsync(() =>{
      let defaultActive = directive._container.active;

      let match :TypeaheadMatch;
      let sub = directive.typeaheadOnSelect.subscribe(m => {
        match = m;
        sub.unsubscribe();
      });

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 9;
      keyboardEvent['which'] = 9;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      expect(match).toBe(defaultActive);
    }));

    it('should select next match when down key is pressed', fakeAsync(() =>{
      directive._container.nextActiveMatch();
      let nextActive = directive._container.active;
      directive._container.prevActiveMatch();

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 40;
      keyboardEvent['which'] = 40;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      expect(directive._container.active).toBe(nextActive);
    }));

    it('should select previous match when up key is pressed', fakeAsync(() =>{
      directive._container.prevActiveMatch();
      let prevActive = directive._container.active;
      directive._container.nextActiveMatch();

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 38;
      keyboardEvent['which'] = 38;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      expect(directive._container.active).toBe(prevActive);
    }));

    it('should not trigger typeahead on enter', fakeAsync(() =>{
      directive.hide();

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).toBeNull();
    }));

    it('should do nothing if there is no active item on enter', fakeAsync(() =>{
      directive._container.selectActive(null);

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keyup', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).not.toBeNull();
    }));
    
    describe('on custom defined key',() =>{
      beforeEach(fakeAsync(() =>{
        directive.typeaheadSelectKeys = [49];
        directive.typeaheadEscapeKeys = [50];
        directive.typeaheadIgnoreKeys = [13];
      }));

      it('should select active match when the 1 (keyCode 49) key is pressed', fakeAsync(() =>{
        let defaultActive = directive._container.active;
        
        let match :TypeaheadMatch;
        let sub = directive.typeaheadOnSelect.subscribe(m => {
          match = m;
          sub.unsubscribe();
        });

        var keyboardEvent = document.createEvent("Events");
        keyboardEvent.initEvent('keyup', true, true);
        keyboardEvent['keyCode'] = 49;
        keyboardEvent['which'] = 49;
        inputElement.dispatchEvent(keyboardEvent); 
        
        fixture.detectChanges();
        tick(100);

        expect(match).toBe(defaultActive);
      }));

      it('should close container when the 2 (keyCode 50) key is pressed', fakeAsync(() =>{
        var keyboardEvent = document.createEvent("Events");
        keyboardEvent.initEvent('keyup', true, true);
        keyboardEvent['keyCode'] = 27;
        keyboardEvent['which'] = 27;
        inputElement.dispatchEvent(keyboardEvent); 
        
        fixture.detectChanges();
        tick(100);
        
        let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
        expect(typeaheadContainer).toBeNull();
      }));

      it('should ignore the enter key', fakeAsync(() =>{
        let match :TypeaheadMatch;
        let sub = directive.typeaheadOnSelect.subscribe(m => {
          match = m;
          sub.unsubscribe();
        });

        var keyboardEvent = document.createEvent("Events");
        keyboardEvent.initEvent('keyup', true, true);
        keyboardEvent['keyCode'] = 13;
        keyboardEvent['which'] = 13;
        inputElement.dispatchEvent(keyboardEvent); 
        
        fixture.detectChanges();
        tick(100);

        expect(match).toBeUndefined();
      }));

    })
  });

  describe('onChange grouped', () => {

    beforeEach(fakeAsync(() => {
      inputElement.value = 'Ala';
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

  describe('onBlur', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Alab';
      fireEvent(inputElement, 'keyup');
 
      fixture.detectChanges();
      tick(100);
    }));

    it('blur event should send the correct active item', () => {
      spyOn(fixture.componentInstance, 'onBlurEvent').and.callFake((param) => {
        expect(param.item.id).toBe(1);
      });
      directive.onBlur();
      fixture.detectChanges();
    });
  });

  describe('onKeydown', () => {
    beforeEach(fakeAsync(() => {
      inputElement.value = 'Alab';
      fireEvent(inputElement, 'keyup');
 
      fixture.detectChanges();
      tick(100);
    }));

    it('should do nothing if there is no container', fakeAsync(() =>{
      directive.hide();
      fireEvent(inputElement, 'keydown');

      fixture.detectChanges();
      tick(100);

      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).toBeNull();
    }));

    it('should do nothing if there is an active item', fakeAsync(() =>{
      fireEvent(inputElement, 'keydown');

      fixture.detectChanges();
      tick(100);

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 

      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).not.toBeNull();
    }));

    it('should ignore defaults of keys defined for specific roles', fakeAsync(() => {
      directive.typeaheadEscapeKeys = [13];

      let match :TypeaheadMatch;
      let sub = directive.typeaheadOnSelect.subscribe(m => {
        match = m;
        sub.unsubscribe();
      });

      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);

      expect(match).toBeUndefined();
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'));
      expect(typeaheadContainer).not.toBeNull();
    }));

    it('should close container on enter if there is no current active', fakeAsync(() => {
      directive._container.selectActive(null);
      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent['keyCode'] = 13;
      keyboardEvent['which'] = 13;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);
      let typeaheadContainer = fixture.debugElement.query(By.css('typeahead-container'))

      expect(typeaheadContainer).toBeNull();
    }));

    it('should ignore default for tab', fakeAsync(() => {
      var keyboardEvent = document.createEvent("Events");
      keyboardEvent.initEvent('keydown', true, true);
      keyboardEvent['keyCode'] = 9;
      keyboardEvent['which'] = 9;
      inputElement.dispatchEvent(keyboardEvent); 
      
      fixture.detectChanges();
      tick(100);
      expect(directive._container.active).toBeTruthy();
    }));
  });

  describe('onFocus', () =>{
    it('blur event should send the correct active item', fakeAsync(() => {
      directive.typeaheadMinLength = 0;
      let loading = false;
      let sub = directive.typeaheadLoading.subscribe(b => {
        loading = b;
        sub.unsubscribe();
      });
      directive.onFocus();
      fixture.detectChanges();
      tick(100);

      expect(loading).toBeTruthy();
    }));
  });
});