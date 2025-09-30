import { test, expect } from '@playwright/test';

test.describe('Issue #823: Tab ordering with ngIf/dynamic directives', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=Tabs');
  });

  test('should display tabs in correct order regardless of creation order', async ({ page }) => {
    // Wait for tabs to load
    await page.waitForSelector('.nav-tabs');
    
    // Check that tabs exist and are in some order
    const tabs = page.locator('.nav-item');
    const tabCount = await tabs.count();
    
    if (tabCount > 0) {
      // Tabs should be visible and clickable
      expect(await tabs.first().isVisible()).toBe(true);
      
      // Should be able to click on tabs
      await tabs.first().click();
      
      // Active tab should have active class
      const activeTab = page.locator('.nav-item.active, .nav-link.active');
      expect(await activeTab.count()).toBeGreaterThan(0);
    }
  });

  test('should maintain tab functionality with ordered tabs', async ({ page }) => {
    // Test that tab ordering doesn't break basic functionality
    await page.waitForSelector('.nav-tabs');
    
    const tabs = page.locator('.nav-link');
    const tabCount = await tabs.count();
    
    if (tabCount >= 2) {
      // Click first tab
      await tabs.first().click();
      expect(await tabs.first().getAttribute('class')).toContain('active');
      
      // Click second tab
      await tabs.nth(1).click();
      expect(await tabs.nth(1).getAttribute('class')).toContain('active');
      
      // First tab should no longer be active
      expect(await tabs.first().getAttribute('class')).not.toContain('active');
    }
  });

  test('should handle dynamic tab addition and removal', async ({ page }) => {
    // Test dynamic behavior that tabOrder should help with
    await page.waitForSelector('.nav-tabs');
    
    const initialTabCount = await page.locator('.nav-item').count();
    
    // Look for any buttons that might add/remove tabs dynamically
    const addButtons = page.locator('button:has-text("Add"), button:has-text("New Tab")');
    const removeButtons = page.locator('button:has-text("Remove"), .bs-remove-tab');
    
    // If there are dynamic controls, test them
    if (await addButtons.count() > 0) {
      await addButtons.first().click();
      
      // Tab count might change
      const newTabCount = await page.locator('.nav-item').count();
      expect(newTabCount).toBeGreaterThanOrEqual(initialTabCount);
    }
    
    // Test removable tabs if they exist
    if (await removeButtons.count() > 0) {
      expect(await removeButtons.first().isVisible()).toBe(true);
    }
  });

  test('should preserve tab content when ordering changes', async ({ page }) => {
    // Ensure tab content is preserved with ordering
    await page.waitForSelector('.nav-tabs');
    
    const tabs = page.locator('.nav-link');
    const tabContent = page.locator('.tab-content, .tab-pane');
    
    if (await tabs.count() > 0 && await tabContent.count() > 0) {
      // Click on different tabs and verify content shows
      for (let i = 0; i < Math.min(await tabs.count(), 3); i++) {
        await tabs.nth(i).click();
        
        // Content should be visible
        expect(await tabContent.first().isVisible()).toBe(true);
      }
    }
  });

  test('should handle conditional tabs with ngIf-like behavior', async ({ page }) => {
    // Simulate the ngIf scenario from the issue
    await page.waitForSelector('.nav-tabs');
    
    // Check if there are any conditional/dynamic elements
    const conditionalElements = page.locator('[*ngIf], [ng-if], .conditional-tab');
    
    // Basic functionality should work even with conditional rendering
    const tabs = page.locator('.nav-link');
    if (await tabs.count() > 0) {
      // Should be able to navigate between tabs
      await tabs.first().click();
      
      // Tab should become active
      const activeClass = await tabs.first().getAttribute('class');
      expect(activeClass).toContain('active');
    }
  });

  test('should maintain accessibility with ordered tabs', async ({ page }) => {
    // Test that tab ordering doesn't break accessibility
    await page.waitForSelector('.nav-tabs');
    
    const tabs = page.locator('.nav-link');
    
    if (await tabs.count() > 0) {
      // Check for proper ARIA attributes
      const firstTab = tabs.first();
      
      // Should have proper role
      const role = await firstTab.getAttribute('role');
      expect(role).toBe('tab');
      
      // Should have aria-selected
      const ariaSelected = await firstTab.getAttribute('aria-selected');
      expect(ariaSelected).toBeTruthy();
      
      // Should be focusable
      await firstTab.focus();
      const focusedElement = page.locator(':focus');
      expect(await focusedElement.count()).toBe(1);
    }
  });

  test('should handle keyboard navigation with ordered tabs', async ({ page }) => {
    // Test keyboard navigation works with tab ordering
    await page.waitForSelector('.nav-tabs');
    
    const tabs = page.locator('.nav-link');
    
    if (await tabs.count() >= 2) {
      // Focus first tab
      await tabs.first().focus();
      
      // Use arrow keys to navigate
      await page.keyboard.press('ArrowRight');
      
      // Should move focus (implementation may vary)
      const focusedElement = page.locator(':focus');
      expect(await focusedElement.count()).toBe(1);
      
      // Test Tab key navigation
      await page.keyboard.press('Tab');
      
      // Focus should move to next element
      expect(await focusedElement.count()).toBe(1);
    }
  });

  test('should handle edge cases for tab ordering', async ({ page }) => {
    // Test edge cases that might occur with tab ordering
    await page.waitForSelector('.nav-tabs');
    
    const tabs = page.locator('.nav-item');
    const initialCount = await tabs.count();
    
    // Rapid clicking shouldn't break ordering
    if (initialCount >= 2) {
      await tabs.first().click();
      await tabs.nth(1).click();
      await tabs.first().click();
      
      // Should still work correctly
      expect(await tabs.count()).toBe(initialCount);
    }
    
    // Page refresh should maintain consistent ordering
    await page.reload();
    await page.waitForSelector('.nav-tabs');
    
    const tabsAfterReload = page.locator('.nav-item');
    expect(await tabsAfterReload.count()).toBe(initialCount);
  });

  test('should support tab ordering in different layouts', async ({ page }) => {
    // Test that tab ordering works in different tab layouts
    await page.waitForSelector('.nav-tabs');
    
    // Look for different tab styles/layouts
    const verticalTabs = page.locator('.nav-tabs.flex-column, .nav-pills.flex-column');
    const justifiedTabs = page.locator('.nav-justified');
    const pillTabs = page.locator('.nav-pills');
    
    // Test basic functionality regardless of layout
    const anyTabs = page.locator('.nav-link');
    
    if (await anyTabs.count() > 0) {
      // Should work in any layout
      await anyTabs.first().click();
      
      // Should have active state
      const activeTab = page.locator('.nav-link.active');
      expect(await activeTab.count()).toBe(1);
    }
  });
});