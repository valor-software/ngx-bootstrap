import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponent } from '../tabset.component';
import { TabDirective } from '../tab.directive';
import { TabsModule } from '../tabs.module';

@Component({
  standalone: true,
  imports: [CommonModule, TabsModule],
  template: `
    <tabset>
      <tab heading="Tab 3" [tabOrder]="3" *ngIf="showTab3">
        Tab 3 content
      </tab>
      <tab heading="Tab 1" [tabOrder]="1" *ngIf="showTab1">
        Tab 1 content
      </tab>
      <tab heading="Tab 2" [tabOrder]="2" *ngIf="showTab2">
        Tab 2 content
      </tab>
      <tab heading="No Order Tab" *ngIf="showNoOrderTab">
        No order tab content
      </tab>
    </tabset>
  `
})
class TestTabOrderingComponent {
  @ViewChild(TabsetComponent, { static: true }) tabset!: TabsetComponent;
  
  showTab1 = true;
  showTab2 = true;
  showTab3 = true;
  showNoOrderTab = true;
}

@Component({
  standalone: true,
  imports: [CommonModule, TabsModule],
  template: `
    <tabset>
      <tab heading="Default 1">
        Default tab 1
      </tab>
      <tab heading="Default 2">
        Default tab 2
      </tab>
      <tab heading="Default 3">
        Default tab 3
      </tab>
    </tabset>
  `
})
class TestDefaultOrderingComponent {
  @ViewChild(TabsetComponent, { static: true }) tabset!: TabsetComponent;
}

@Component({
  standalone: true,
  imports: [CommonModule, TabsModule],
  template: `
    <tabset>
      <tab heading="Mixed 3" [tabOrder]="30">
        Mixed tab 3
      </tab>
      <tab heading="Mixed Default 1">
        Mixed default 1
      </tab>
      <tab heading="Mixed 1" [tabOrder]="10">
        Mixed tab 1
      </tab>
      <tab heading="Mixed Default 2">
        Mixed default 2
      </tab>
      <tab heading="Mixed 2" [tabOrder]="20">
        Mixed tab 2
      </tab>
    </tabset>
  `
})
class TestMixedOrderingComponent {
  @ViewChild(TabsetComponent, { static: true }) tabset!: TabsetComponent;
}

describe('TabDirective and TabsetComponent - Tab Ordering (Issue #823)', () => {
  let component: TestTabOrderingComponent;
  let fixture: ComponentFixture<TestTabOrderingComponent>;
  let defaultComponent: TestDefaultOrderingComponent;
  let defaultFixture: ComponentFixture<TestDefaultOrderingComponent>;
  let mixedComponent: TestMixedOrderingComponent;
  let mixedFixture: ComponentFixture<TestMixedOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestTabOrderingComponent, 
        TestDefaultOrderingComponent,
        TestMixedOrderingComponent
      ]
    }).compileComponents();
  });

  describe('Tab Ordering with tabOrder Property', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabOrderingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create tabs with correct ordering', () => {
      expect(component.tabset).toBeTruthy();
      expect(component.tabset.tabs.length).toBe(4);
    });

    it('should order tabs correctly based on tabOrder value', () => {
      const tabs = component.tabset.tabs;
      
      // Should be ordered: Tab 1 (order 1), Tab 2 (order 2), Tab 3 (order 3), No Order Tab (no order)
      expect(tabs[0].heading).toBe('Tab 1');
      expect(tabs[0].tabOrder).toBe(1);
      
      expect(tabs[1].heading).toBe('Tab 2');
      expect(tabs[1].tabOrder).toBe(2);
      
      expect(tabs[2].heading).toBe('Tab 3');
      expect(tabs[2].tabOrder).toBe(3);
      
      expect(tabs[3].heading).toBe('No Order Tab');
      expect(tabs[3].tabOrder).toBeUndefined();
    });

    it('should handle manual tab insertion correctly', () => {
      // Create a fresh component to test manual insertion
      const freshFixture = TestBed.createComponent(TestTabOrderingComponent);
      const freshComponent = freshFixture.componentInstance;
      
      // Start with all tabs hidden
      freshComponent.showTab1 = false;
      freshComponent.showTab2 = false;
      freshComponent.showTab3 = false;
      freshComponent.showNoOrderTab = false;
      freshFixture.detectChanges();
      
      expect(freshComponent.tabset.tabs.length).toBe(0);
      
      // Add Tab 3 first (order 3)
      freshComponent.showTab3 = true;
      freshFixture.detectChanges();
      expect(freshComponent.tabset.tabs.length).toBe(1);
      expect(freshComponent.tabset.tabs[0].heading).toBe('Tab 3');
      expect(freshComponent.tabset.tabs[0].tabOrder).toBe(3);
      
      // Add Tab 1 (order 1) - should go before Tab 3
      freshComponent.showTab1 = true;
      freshFixture.detectChanges();
      expect(freshComponent.tabset.tabs.length).toBe(2);
      expect(freshComponent.tabset.tabs[0].heading).toBe('Tab 1');
      expect(freshComponent.tabset.tabs[0].tabOrder).toBe(1);
      expect(freshComponent.tabset.tabs[1].heading).toBe('Tab 3');
      expect(freshComponent.tabset.tabs[1].tabOrder).toBe(3);
    });

    it('should handle dynamic tab addition with correct ordering', () => {
      // Remove Tab 2
      component.showTab2 = false;
      fixture.detectChanges();
      
      expect(component.tabset.tabs.length).toBe(3);
      expect(component.tabset.tabs[0].heading).toBe('Tab 1');
      expect(component.tabset.tabs[1].heading).toBe('Tab 3');
      
      // Add Tab 2 back
      component.showTab2 = true;
      fixture.detectChanges();
      
      expect(component.tabset.tabs.length).toBe(4);
      expect(component.tabset.tabs[0].heading).toBe('Tab 1');
      expect(component.tabset.tabs[1].heading).toBe('Tab 2');
      expect(component.tabset.tabs[2].heading).toBe('Tab 3');
    });

    it('should handle tabs appearing in different orders due to *ngIf', () => {
      // Start with all hidden
      component.showTab1 = false;
      component.showTab2 = false;
      component.showTab3 = false;
      component.showNoOrderTab = false;
      fixture.detectChanges();
      
      expect(component.tabset.tabs.length).toBe(0);
      
      // Show tabs in reverse order
      component.showTab3 = true;
      fixture.detectChanges();
      expect(component.tabset.tabs.length).toBe(1);
      expect(component.tabset.tabs[0].heading).toBe('Tab 3');
      
      component.showTab1 = true;
      fixture.detectChanges();
      expect(component.tabset.tabs.length).toBe(2);
      expect(component.tabset.tabs[0].heading).toBe('Tab 1'); // Should be first due to order 1
      expect(component.tabset.tabs[1].heading).toBe('Tab 3');
      
      component.showTab2 = true;
      fixture.detectChanges();
      expect(component.tabset.tabs.length).toBe(3);
      expect(component.tabset.tabs[0].heading).toBe('Tab 1');
      expect(component.tabset.tabs[1].heading).toBe('Tab 2'); // Should be inserted in middle
      expect(component.tabset.tabs[2].heading).toBe('Tab 3');
    });
  });

  describe('Backward Compatibility - Default Ordering', () => {
    beforeEach(() => {
      defaultFixture = TestBed.createComponent(TestDefaultOrderingComponent);
      defaultComponent = defaultFixture.componentInstance;
      defaultFixture.detectChanges();
    });

    it('should maintain insertion order when no tabOrder is specified', () => {
      const tabs = defaultComponent.tabset.tabs;
      
      expect(tabs.length).toBe(3);
      expect(tabs[0].heading).toBe('Default 1');
      expect(tabs[1].heading).toBe('Default 2');
      expect(tabs[2].heading).toBe('Default 3');
      
      // All should have undefined tabOrder
      expect(tabs[0].tabOrder).toBeUndefined();
      expect(tabs[1].tabOrder).toBeUndefined();
      expect(tabs[2].tabOrder).toBeUndefined();
    });

    it('should work exactly like before when tabOrder is not used', () => {
      // This ensures backward compatibility
      expect(defaultComponent.tabset.tabs.length).toBe(3);
      
      // First tab should be active by default
      expect(defaultComponent.tabset.tabs[0].active).toBe(true);
      expect(defaultComponent.tabset.tabs[1].active).toBe(false);
      expect(defaultComponent.tabset.tabs[2].active).toBe(false);
    });
  });

  describe('Mixed Ordered and Unordered Tabs', () => {
    beforeEach(() => {
      mixedFixture = TestBed.createComponent(TestMixedOrderingComponent);
      mixedComponent = mixedFixture.componentInstance;
      mixedFixture.detectChanges();
    });

    it('should handle mix of ordered and unordered tabs correctly', () => {
      const tabs = mixedComponent.tabset.tabs;
      
      expect(tabs.length).toBe(5);
      
      // Ordered tabs should come first, then unordered tabs in insertion order
      expect(tabs[0].heading).toBe('Mixed 1');
      expect(tabs[0].tabOrder).toBe(10);
      
      expect(tabs[1].heading).toBe('Mixed 2');
      expect(tabs[1].tabOrder).toBe(20);
      
      expect(tabs[2].heading).toBe('Mixed 3');
      expect(tabs[2].tabOrder).toBe(30);
      
      // Unordered tabs should maintain their insertion order after ordered tabs
      expect(tabs[3].heading).toBe('Mixed Default 1');
      expect(tabs[3].tabOrder).toBeUndefined();
      
      expect(tabs[4].heading).toBe('Mixed Default 2');
      expect(tabs[4].tabOrder).toBeUndefined();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabOrderingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle duplicate tabOrder values gracefully', () => {
      // Manually add tabs with duplicate orders to test edge case
      const tabset = component.tabset;
      
      // Create mock tabs with same order
      const mockTab1 = {
        heading: 'Duplicate 1',
        tabOrder: 1,
        active: false
      } as TabDirective;
      
      const mockTab2 = {
        heading: 'Duplicate 2', 
        tabOrder: 1,
        active: false
      } as TabDirective;
      
      const initialCount = tabset.tabs.length;
      tabset.addTab(mockTab1);
      tabset.addTab(mockTab2);
      
      // Should handle duplicates without errors
      expect(tabset.tabs.length).toBe(initialCount + 2);
    });

    it('should handle negative tabOrder values', () => {
      const tabset = component.tabset;
      
      const mockTab = {
        heading: 'Negative Order',
        tabOrder: -1,
        active: false
      } as TabDirective;
      
      tabset.addTab(mockTab);
      
      // Tab with negative order should be first
      expect(tabset.tabs[0]).toBe(mockTab);
    });

    it('should handle very large tabOrder values', () => {
      const tabset = component.tabset;
      
      const mockTab = {
        heading: 'Large Order',
        tabOrder: 9999,
        active: false
      } as TabDirective;
      
      tabset.addTab(mockTab);
      
      // Tab with large order should be last among ordered tabs
      expect(tabset.tabs[tabset.tabs.length - 2]).toBe(mockTab); // -2 because "No Order Tab" is last
    });

    it('should handle zero tabOrder value', () => {
      const tabset = component.tabset;
      
      const mockTab = {
        heading: 'Zero Order',
        tabOrder: 0,
        active: false
      } as TabDirective;
      
      tabset.addTab(mockTab);
      
      // Tab with order 0 should be first
      expect(tabset.tabs[0]).toBe(mockTab);
    });
  });
});