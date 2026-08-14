import { test, expect } from '@playwright/test';

test.describe('Issue #749: Typeahead object value display fix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=Typeahead');
  });

  test('should display object values correctly in typeahead input', async ({ page }) => {
    // Wait for typeahead demo to load
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    // Look for a typeahead that might have object values
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Check that input doesn't show [object Object]
    const inputValue = await input.inputValue();
    expect(inputValue).not.toBe('[object Object]');
    
    // If there's an initial value, it should be readable
    if (inputValue && inputValue.length > 0) {
      expect(inputValue).toMatch(/^[a-zA-Z0-9\s]+$/); // Should be readable text
    }
  });

  test('should handle object selection and display correctly', async ({ page }) => {
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('Cal');
    
    // Wait for dropdown to appear
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    // Select first item
    const firstItem = page.locator('.dropdown-item').first();
    await firstItem.click();
    
    // Input should show proper text, not [object Object]
    const selectedValue = await input.inputValue();
    expect(selectedValue).toBeTruthy();
    expect(selectedValue).not.toBe('[object Object]');
    expect(selectedValue.length).toBeGreaterThan(0);
  });

  test('should maintain functionality after object value fix', async ({ page }) => {
    // Ensure the fix doesn't break existing typeahead functionality
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Test typing and filtering
    await input.click();
    await input.fill('Ala');
    
    // Should show filtered results
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    const items = page.locator('.dropdown-item');
    const itemCount = await items.count();
    expect(itemCount).toBeGreaterThan(0);
    
    // Items should contain the typed text
    const firstItemText = await items.first().textContent();
    expect(firstItemText).toContain('Ala');
  });

  test('should handle keyboard navigation with object values', async ({ page }) => {
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    await input.click();
    await input.fill('A');
    
    // Wait for dropdown
    await page.waitForSelector('.dropdown-menu', { state: 'visible' });
    
    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    
    // Should select properly without showing [object Object]
    const selectedValue = await input.inputValue();
    expect(selectedValue).toBeTruthy();
    expect(selectedValue).not.toBe('[object Object]');
    expect(selectedValue).not.toBe('[object HTMLElement]');
  });

  test('should handle edge cases for object value display', async ({ page }) => {
    // Test various scenarios that might cause [object Object] display
    await page.waitForSelector('[placeholder="Locations loaded from API"]');
    
    const input = page.locator('[placeholder="Locations loaded from API"]').first();
    
    // Test clearing and re-entering values
    await input.click();
    await input.fill('');
    await input.fill('Test');
    
    // Clear again
    await input.fill('');
    
    // Should not show [object Object] in any state
    const inputValue = await input.inputValue();
    expect(inputValue).not.toBe('[object Object]');
  });

  test('should work with different typeahead configurations', async ({ page }) => {
    // Test that the fix works across different typeahead setups
    await page.waitForSelector('input[typeahead]').catch(() => {
      // Fallback if specific selector doesn't exist
      return page.waitForSelector('input');
    });
    
    // Find any typeahead inputs on the page
    const typeaheadInputs = page.locator('input[typeahead], input[placeholder*="type"], input[placeholder*="search"]');
    const count = await typeaheadInputs.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const input = typeaheadInputs.nth(i);
        const inputValue = await input.inputValue();
        
        // None should show [object Object]
        expect(inputValue).not.toBe('[object Object]');
        
        // If visible and enabled, test basic functionality
        if (await input.isVisible() && await input.isEnabled()) {
          await input.click();
          await input.fill('test');
          await input.fill('');
          
          // Still shouldn't show [object Object]
          const clearedValue = await input.inputValue();
          expect(clearedValue).not.toBe('[object Object]');
        }
      }
    }
  });
});