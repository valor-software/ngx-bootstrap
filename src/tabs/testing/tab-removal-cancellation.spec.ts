import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TabDirective } from '../tab.directive';
import { TabsetComponent } from '../tabset.component';
import { TabsModule } from '../tabs.module';

@Component({
  template: `
    <tabset>
      <tab heading="Tab 1" [removable]="true" (beforeRemove)="onBeforeRemove($event)">
        Tab 1 content
      </tab>
      <tab heading="Tab 2" [removable]="true" (beforeRemove)="onBeforeRemovePrevent($event)">
        Tab 2 content
      </tab>
      <tab heading="Tab 3" [removable]="true">
        Tab 3 content
      </tab>
    </tabset>
  `
})
class TestTabRemovalComponent {
  @ViewChild(TabsetComponent, { static: true }) tabset!: TabsetComponent;
  
  beforeRemoveCalled = false;
  beforeRemoveEvent: any = null;
  
  onBeforeRemove(event: any) {
    this.beforeRemoveCalled = true;
    this.beforeRemoveEvent = event;
    // Allow removal (don't call preventDefault)
  }
  
  onBeforeRemovePrevent(event: any) {
    this.beforeRemoveCalled = true;
    this.beforeRemoveEvent = event;
    // Prevent removal
    event.preventDefault();
  }
}

@Component({
  template: `
    <tabset>
      <tab heading="Removable Tab" [removable]="true" (beforeRemove)="onBeforeRemove($event)" (removed)="onRemoved($event)">
        Content
      </tab>
    </tabset>
  `
})
class TestTabEventsComponent {
  @ViewChild(TabsetComponent, { static: true }) tabset!: TabsetComponent;
  
  beforeRemoveCallCount = 0;
  removedCallCount = 0;
  lastBeforeRemoveEvent: any = null;
  lastRemovedTab: TabDirective | null = null;
  
  onBeforeRemove(event: any) {
    this.beforeRemoveCallCount++;
    this.lastBeforeRemoveEvent = event;
  }
  
  onRemoved(tab: TabDirective) {
    this.removedCallCount++;
    this.lastRemovedTab = tab;
  }
}

describe('TabDirective - Removal Cancellation (Issue #786)', () => {
  let component: TestTabRemovalComponent;
  let fixture: ComponentFixture<TestTabRemovalComponent>;
  let eventsComponent: TestTabEventsComponent;
  let eventsFixture: ComponentFixture<TestTabEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTabRemovalComponent, TestTabEventsComponent],
      imports: [TabsModule.forRoot()]
    }).compileComponents();
  });

  describe('Tab Removal Cancellation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabRemovalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create tabs with beforeRemove event support', () => {
      expect(component.tabset).toBeTruthy();
      expect(component.tabset.tabs.length).toBe(3);
      expect(component.tabset.tabs[0].removable).toBe(true);
      expect(component.tabset.tabs[1].removable).toBe(true);
      expect(component.tabset.tabs[2].removable).toBe(true);
    });

    it('should emit beforeRemove event when attempting to remove tab', () => {
      const firstTab = component.tabset.tabs[0];
      
      // Attempt to remove first tab
      component.tabset.removeTab(firstTab);
      
      expect(component.beforeRemoveCalled).toBe(true);
      expect(component.beforeRemoveEvent).toBeTruthy();
      expect(component.beforeRemoveEvent.tab).toBe(firstTab);
    });

    it('should allow tab removal when beforeRemove event is not prevented', () => {
      const initialTabCount = component.tabset.tabs.length;
      const firstTab = component.tabset.tabs[0];
      
      // Remove first tab (should succeed)
      component.tabset.removeTab(firstTab);
      
      expect(component.tabset.tabs.length).toBe(initialTabCount - 1);
      expect(component.tabset.tabs.indexOf(firstTab)).toBe(-1);
    });

    it('should prevent tab removal when beforeRemove event calls preventDefault', () => {
      const initialTabCount = component.tabset.tabs.length;
      const secondTab = component.tabset.tabs[1]; // This one prevents removal
      
      // Attempt to remove second tab (should be prevented)
      component.tabset.removeTab(secondTab);
      
      expect(component.tabset.tabs.length).toBe(initialTabCount);
      expect(component.tabset.tabs.indexOf(secondTab)).toBeGreaterThan(-1);
    });

    it('should provide preventDefault function in beforeRemove event', () => {
      const secondTab = component.tabset.tabs[1];
      
      // Attempt to remove tab that prevents removal
      component.tabset.removeTab(secondTab);
      
      expect(component.beforeRemoveEvent).toBeTruthy();
      expect(typeof component.beforeRemoveEvent.preventDefault).toBe('function');
      expect(component.beforeRemoveEvent.preventDefault).toBe(true); // Should be set to true after calling
    });

    it('should work with keyboard deletion (Delete key)', () => {
      const tabset = component.tabset;
      const initialTabCount = tabset.tabs.length;
      
      // Simulate Delete key on first tab (index 0) - should succeed
      const event = new KeyboardEvent('keydown', { key: 'Delete', keyCode: 46 });
      tabset.keyNavActions(event, 0);
      
      expect(tabset.tabs.length).toBe(initialTabCount - 1);
    });

    it('should prevent keyboard deletion when beforeRemove is prevented', () => {
      const tabset = component.tabset;
      const initialTabCount = tabset.tabs.length;
      
      // Simulate Delete key on second tab (index 1) - should be prevented
      const event = new KeyboardEvent('keydown', { key: 'Delete', keyCode: 46 });
      tabset.keyNavActions(event, 1);
      
      expect(tabset.tabs.length).toBe(initialTabCount);
    });
  });

  describe('Event Sequence and Backward Compatibility', () => {
    beforeEach(() => {
      eventsFixture = TestBed.createComponent(TestTabEventsComponent);
      eventsComponent = eventsFixture.componentInstance;
      eventsFixture.detectChanges();
    });

    it('should emit beforeRemove before removed event', () => {
      const tab = eventsComponent.tabset.tabs[0];
      
      eventsComponent.tabset.removeTab(tab);
      
      expect(eventsComponent.beforeRemoveCallCount).toBe(1);
      expect(eventsComponent.removedCallCount).toBe(1);
      expect(eventsComponent.lastRemovedTab).toBe(tab);
    });

    it('should not emit removed event if beforeRemove prevents removal', () => {
      const tab = eventsComponent.tabset.tabs[0];
      
      // Modify the handler to prevent removal
      eventsComponent.onBeforeRemove = (event: any) => {
        eventsComponent.beforeRemoveCallCount++;
        eventsComponent.lastBeforeRemoveEvent = event;
        event.preventDefault();
      };
      
      eventsComponent.tabset.removeTab(tab);
      
      expect(eventsComponent.beforeRemoveCallCount).toBe(1);
      expect(eventsComponent.removedCallCount).toBe(0); // Should not be called
      expect(eventsComponent.lastRemovedTab).toBe(null);
    });

    it('should maintain backward compatibility when no beforeRemove handler is provided', () => {
      // Create a tab without beforeRemove handler
      const tabWithoutHandler = eventsComponent.tabset.tabs[0];
      
      // Should still work normally
      const initialCount = eventsComponent.tabset.tabs.length;
      eventsComponent.tabset.removeTab(tabWithoutHandler);
      
      expect(eventsComponent.tabset.tabs.length).toBe(initialCount - 1);
    });

    it('should handle options.emit = false correctly', () => {
      const tab = eventsComponent.tabset.tabs[0];
      
      // Remove tab with emit = false
      eventsComponent.tabset.removeTab(tab, { emit: false });
      
      expect(eventsComponent.beforeRemoveCallCount).toBe(0);
      expect(eventsComponent.removedCallCount).toBe(0);
      expect(eventsComponent.tabset.tabs.length).toBe(0); // Tab should still be removed
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabRemovalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle removing non-existent tab gracefully', () => {
      const fakeTab = new TabDirective(component.tabset, { nativeElement: {} } as any, {} as any);
      const initialCount = component.tabset.tabs.length;
      
      // Should not throw error or change tab count
      component.tabset.removeTab(fakeTab);
      
      expect(component.tabset.tabs.length).toBe(initialCount);
    });

    it('should handle multiple preventDefault calls correctly', () => {
      const secondTab = component.tabset.tabs[1];
      const initialCount = component.tabset.tabs.length;
      
      // Modify handler to call preventDefault multiple times
      component.onBeforeRemovePrevent = (event: any) => {
        event.preventDefault();
        event.preventDefault(); // Second call should not cause issues
      };
      
      component.tabset.removeTab(secondTab);
      
      expect(component.tabset.tabs.length).toBe(initialCount);
    });
  });
});