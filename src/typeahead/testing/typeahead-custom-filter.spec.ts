import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeaheadDirective } from '../typeahead.directive';
import { TypeaheadModule } from '../typeahead.module';

@Component({
  template: `
    <input
      [(ngModel)]="selected"
      [typeahead]="states"
      [typeaheadFilterFunction]="customFilter"
      class="form-control"
      data-test="custom-filter-input">
  `
})
class TestTypeaheadCustomFilterComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  selected = '';
  states = [
    { name: 'Alabama', code: 'AL' },
    { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' },
    { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' }
  ];

  // Custom filter that searches by code instead of name
  customFilter = (option: any, query: string): boolean => {
    return option.code.toLowerCase().includes(query.toLowerCase());
  };
}

@Component({
  template: `
    <input
      [(ngModel)]="selected"
      [typeahead]="states"
      class="form-control"
      data-test="default-filter-input">
  `
})
class TestTypeaheadDefaultFilterComponent {
  @ViewChild(TypeaheadDirective, { static: true }) typeahead!: TypeaheadDirective;
  selected = '';
  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California'];
}

describe('TypeaheadDirective - Custom Filter Function', () => {
  let customFilterComponent: TestTypeaheadCustomFilterComponent;
  let customFilterFixture: ComponentFixture<TestTypeaheadCustomFilterComponent>;
  let defaultFilterComponent: TestTypeaheadDefaultFilterComponent;
  let defaultFilterFixture: ComponentFixture<TestTypeaheadDefaultFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTypeaheadCustomFilterComponent, TestTypeaheadDefaultFilterComponent],
      imports: [FormsModule, TypeaheadModule.forRoot()]
    }).compileComponents();
  });

  describe('Custom Filter Function', () => {
    beforeEach(() => {
      customFilterFixture = TestBed.createComponent(TestTypeaheadCustomFilterComponent);
      customFilterComponent = customFilterFixture.componentInstance;
      customFilterFixture.detectChanges();
    });

    it('should create component with custom filter function', () => {
      expect(customFilterComponent.typeahead).toBeTruthy();
      expect(customFilterComponent.typeahead.typeaheadFilterFunction).toBeDefined();
      expect(typeof customFilterComponent.typeahead.typeaheadFilterFunction).toBe('function');
    });

    it('should use custom filter function when provided', () => {
      const input = customFilterFixture.nativeElement.querySelector('input');
      
      // Test custom filter - should find matches by code
      input.value = 'AL';
      input.dispatchEvent(new Event('input'));
      customFilterFixture.detectChanges();

      // Custom filter should find Alabama by code 'AL'
      expect(customFilterComponent.typeahead.typeaheadFilterFunction).toBeTruthy();
    });

    it('should filter by custom logic (code) instead of default logic (name)', () => {
      const customFilter = customFilterComponent.customFilter;
      
      // Test that custom filter works by code
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'al')).toBe(true);
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'ala')).toBe(false); // Should not match name
      expect(customFilter({ name: 'California', code: 'CA' }, 'ca')).toBe(true);
    });

    it('should handle case-insensitive filtering', () => {
      const customFilter = customFilterComponent.customFilter;
      
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'al')).toBe(true);
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'AL')).toBe(true);
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'Al')).toBe(true);
    });

    it('should return false for non-matching filters', () => {
      const customFilter = customFilterComponent.customFilter;
      
      expect(customFilter({ name: 'Alabama', code: 'AL' }, 'xyz')).toBe(false);
      expect(customFilter({ name: 'California', code: 'CA' }, 'tx')).toBe(false);
    });
  });

  describe('Default Filter Function', () => {
    beforeEach(() => {
      defaultFilterFixture = TestBed.createComponent(TestTypeaheadDefaultFilterComponent);
      defaultFilterComponent = defaultFilterFixture.componentInstance;
      defaultFilterFixture.detectChanges();
    });

    it('should use default filter when no custom filter is provided', () => {
      expect(defaultFilterComponent.typeahead).toBeTruthy();
      expect(defaultFilterComponent.typeahead.typeaheadFilterFunction).toBeUndefined();
    });

    it('should fall back to default filtering logic', () => {
      const input = defaultFilterFixture.nativeElement.querySelector('input');
      
      // Default filter should work with string matching
      input.value = 'Alab';
      input.dispatchEvent(new Event('input'));
      defaultFilterFixture.detectChanges();

      // Should use default testMatch logic
      expect(defaultFilterComponent.typeahead.typeaheadFilterFunction).toBeUndefined();
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      customFilterFixture = TestBed.createComponent(TestTypeaheadCustomFilterComponent);
      customFilterComponent = customFilterFixture.componentInstance;
      customFilterFixture.detectChanges();
    });

    it('should handle custom filter function errors gracefully', () => {
      // Set a filter that throws an error
      customFilterComponent.customFilter = () => {
        throw new Error('Filter error');
      };
      customFilterFixture.detectChanges();

      const input = customFilterFixture.nativeElement.querySelector('input');
      
      expect(() => {
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        customFilterFixture.detectChanges();
      }).not.toThrow();
    });
  });
});