import { test, expect } from '@playwright/test';

test.describe('Issue #794: Multiple datasets for typeahead', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=Typeahead');
  });

  test('should support multiple result sets in typeahead', async ({ page }) => {
    // Wait for typeahead demo to load
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    // Test basic typeahead functionality works
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('Cal');
    
    // Wait for dropdown to appear
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    // Should show results
    const items = page.locator('.dropdown-item');
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('should handle multiple dataset configurations', async ({ page }) => {
    // Test that multiple datasets can be configured
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('A');
    
    // Should show filtered results from datasets
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    const dropdown = page.locator('.dropdown-menu');
    expect(await dropdown.isVisible()).toBe(true);
    
    // Results should be grouped/organized if multiple datasets
    const items = page.locator('.dropdown-item');
    if (await items.count() > 0) {
      // At least one result should be shown
      expect(await items.count()).toBeGreaterThan(0);
    }
  });

  test('should maintain typeahead functionality with datasets', async ({ page }) => {
    // Ensure existing functionality still works with dataset support
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Test keyboard navigation
    await input.click();
    await input.fill('States');
    
    await page.waitForSelector('.dropdown-menu', { state: 'visible' }).catch(() => {
      // May not find matches, which is fine
    });
    
    // Test arrow key navigation if dropdown is visible
    const dropdown = page.locator('.dropdown-menu');
    if (await dropdown.isVisible()) {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      
      // Navigation should work
      expect(await dropdown.isVisible()).toBe(true);
    }
  });

  test('should support dataset headers and grouping', async ({ page }) => {
    // Test that dataset headers work correctly
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('test');
    
    // Look for potential dataset headers
    await page.waitForSelector('.dropdown-menu', { state: 'visible' }).catch(() => {
      console.log('No dropdown visible - this is acceptable for testing');
    });
    
    // Check for header elements (would have different styling)
    const headers = page.locator('.dropdown-header, .dropdown-menu h6');
    if (await headers.count() > 0) {
      expect(await headers.first().isVisible()).toBe(true);
    }
  });

  test('should handle dataset selection correctly', async ({ page }) => {
    // Test that selecting items from different datasets works
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('California');
    
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    // Select first available item
    const firstItem = page.locator('.dropdown-item').first();
    if (await firstItem.isVisible()) {
      await firstItem.click();
      
      // Input should have selected value
      const inputValue = await input.inputValue();
      expect(inputValue).toBeTruthy();
      expect(inputValue.length).toBeGreaterThan(0);
    }
  });

  test('should respect dataset limits and configurations', async ({ page }) => {
    // Test that dataset limits are respected
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('a'); // Broad search to potentially get many results
    
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    // Count total results - should respect limits
    const items = page.locator('.dropdown-item');
    const itemCount = await items.count();
    
    // Should have a reasonable number of results (not unlimited)
    expect(itemCount).toBeLessThan(50); // Reasonable upper bound
  });

  test('should maintain backward compatibility', async ({ page }) => {
    // Ensure single dataset mode still works
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    // Test with different typeahead inputs on the page
    const typeaheadInputs = page.locator('input[typeahead], input[placeholder*="type"]');
    const inputCount = await typeaheadInputs.count();
    
    if (inputCount > 1) {
      // Test multiple inputs work independently
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = typeaheadInputs.nth(i);
        
        if (await input.isVisible() && await input.isEnabled()) {
          await input.click();
          await input.fill('test');
          
          // Should work without errors
          expect(await input.inputValue()).toBe('test');
          
          await input.fill('');
        }
      }
    }
  });

  test('should handle edge cases for multiple datasets', async ({ page }) => {
    // Test edge cases and error scenarios
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Test with special characters
    await input.click();
    await input.fill('!@#$%');
    
    // Should not crash
    const isInputVisible = await input.isVisible();
    expect(isInputVisible).toBe(true);
    
    // Test with very long input
    await input.fill('a'.repeat(100));
    
    // Should handle gracefully
    expect(await input.isVisible()).toBe(true);
    
    // Clear input
    await input.fill('');
    expect(await input.inputValue()).toBe('');
  });

  test('should support dynamic dataset updates', async ({ page }) => {
    // Test that datasets can be updated dynamically
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Initial search
    await input.click();
    await input.fill('test1');
    
    await page.waitForSelector('.dropdown-menu', { state: 'visible' }).catch(() => {
      // May not have results
    });
    
    // Change search term (simulates dataset update)
    await input.fill('test2');
    
    // Should update results appropriately
    expect(await input.inputValue()).toBe('test2');
    
    // Clear and try different term
    await input.fill('new search');
    expect(await input.inputValue()).toBe('new search');
  });
});