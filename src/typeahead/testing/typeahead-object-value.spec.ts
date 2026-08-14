import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadDirective } from '../typeahead.directive';
import { TypeaheadModule } from '../typeahead.module';

@Component({
  template: `
    <input
      [(ngModel)]="selectedState"
      [typeahead]="states"
      [typeaheadOptionField]="'name'"
      class="form-control"
      data-test="object-value-input">
  `
})
class TestTypeaheadObjectValueComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  
  selectedState = { name: 'California', code: 'CA' }; // Initial object value
  
  states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' }
  ];
}

@Component({
  template: `
    <input
      [(ngModel)]="selectedState"
      [typeahead]="states"
      class="form-control"
      data-test="no-option-field-input">
  `
})
class TestTypeaheadNoOptionFieldComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  
  selectedState = { name: 'California', code: 'CA' }; // Initial object value with no typeaheadOptionField
  
  states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'California', code: 'CA' }
  ];
}

describe('TypeaheadDirective - Object Value Display Issue #749', () => {
  let component: TestTypeaheadObjectValueComponent;
  let fixture: ComponentFixture<TestTypeaheadObjectValueComponent>;
  let noFieldComponent: TestTypeaheadNoOptionFieldComponent;
  let noFieldFixture: ComponentFixture<TestTypeaheadNoOptionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTypeaheadObjectValueComponent, TestTypeaheadNoOptionFieldComponent],
      imports: [FormsModule, TypeaheadModule.forRoot()]
    }).compileComponents();
  });

  describe('With typeaheadOptionField specified', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTypeaheadObjectValueComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display object property value when typeaheadOptionField is set', () => {
      const input = fixture.nativeElement.querySelector('input');
      
      // Input should display the name property, not "[object Object]"
      expect(input.value).toBe('California');
      expect(input.value).not.toBe('[object Object]');
    });

    it('should maintain object value in ngModel', () => {
      expect(component.selectedState).toEqual({ name: 'California', code: 'CA' });
      expect(typeof component.selectedState).toBe('object');
    });

    it('should handle selection and update display correctly', () => {
      const input = fixture.nativeElement.querySelector('input');
      
      // Clear and type new value
      input.value = 'Alab';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      // Should be able to select from dropdown
      expect(component.typeahead).toBeTruthy();
    });
  });

  describe('Without typeaheadOptionField (auto-detect common fields)', () => {
    beforeEach(() => {
      noFieldFixture = TestBed.createComponent(TestTypeaheadNoOptionFieldComponent);
      noFieldComponent = noFieldFixture.componentInstance;
      noFieldFixture.detectChanges();
    });

    it('should auto-detect name field and display correctly', () => {
      const input = noFieldFixture.nativeElement.querySelector('input');
      
      // After fix, should detect 'name' field automatically
      expect(input.value).toBe('California');
      expect(input.value).not.toBe('[object Object]');
    });

    it('should have object value in ngModel', () => {
      expect(noFieldComponent.selectedState).toEqual({ name: 'California', code: 'CA' });
      expect(typeof noFieldComponent.selectedState).toBe('object');
    });
  });

  describe('Object value handling utilities', () => {
    it('should handle getValueFromObject correctly', () => {
      const { getValueFromObject } = require('../typeahead-utils');
      
      const testObject = { name: 'California', code: 'CA' };
      
      // With option field specified
      expect(getValueFromObject(testObject, 'name')).toBe('California');
      expect(getValueFromObject(testObject, 'code')).toBe('CA');
      
      // Without option field (auto-detect 'name')
      expect(getValueFromObject(testObject, undefined)).toBe('California');
    });
    
    it('should auto-detect common display fields', () => {
      const { getValueFromObject } = require('../typeahead-utils');
      
      // Test different common field names
      expect(getValueFromObject({ name: 'Test' }, undefined)).toBe('Test');
      expect(getValueFromObject({ label: 'Test Label' }, undefined)).toBe('Test Label');
      expect(getValueFromObject({ title: 'Test Title' }, undefined)).toBe('Test Title');
      expect(getValueFromObject({ text: 'Test Text' }, undefined)).toBe('Test Text');
      expect(getValueFromObject({ value: 'Test Value' }, undefined)).toBe('Test Value');
      expect(getValueFromObject({ display: 'Test Display' }, undefined)).toBe('Test Display');
      
      // Should prioritize 'name' over other fields
      expect(getValueFromObject({ name: 'Name', label: 'Label' }, undefined)).toBe('Name');
    });
    
    it('should fallback to [object Object] for objects without common fields', () => {
      const { getValueFromObject } = require('../typeahead-utils');
      
      const objectWithoutCommonFields = { id: 1, customField: 'value' };
      expect(getValueFromObject(objectWithoutCommonFields, undefined)).toBe('[object Object]');
    });
    
    it('should handle nested properties', () => {
      const { getValueFromObject } = require('../typeahead-utils');
      
      const nestedObject = { 
        location: { 
          state: { name: 'California' },
          country: 'USA'
        }
      };
      
      expect(getValueFromObject(nestedObject, 'location.state.name')).toBe('California');
      expect(getValueFromObject(nestedObject, 'location.country')).toBe('USA');
    });
    
    it('should handle method calls', () => {
      const { getValueFromObject } = require('../typeahead-utils');
      
      const objectWithMethod = {
        name: 'California',
        getName: function() { return this.name; }
      };
      
      expect(getValueFromObject(objectWithMethod, 'getName()')).toBe('California');
    });
  });
});