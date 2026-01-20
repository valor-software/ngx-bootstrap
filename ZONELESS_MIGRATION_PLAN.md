# Zoneless Migration Plan for ngx-bootstrap

This document outlines the comprehensive plan to migrate ngx-bootstrap to support Angular's zoneless change detection (experimental in Angular 18+, stable in Angular 20+).

## Table of Contents

1. [Overview](#overview)
2. [Current State Analysis](#current-state-analysis)
3. [Migration Strategy](#migration-strategy)
4. [Phase 1: Preparation](#phase-1-preparation)
5. [Phase 2: Component Updates](#phase-2-component-updates)
6. [Phase 3: Service Updates](#phase-3-service-updates)
7. [Phase 4: Testing & Validation](#phase-4-testing--validation)
8. [Phase 5: Documentation & Release](#phase-5-documentation--release)
9. [Files Requiring Changes](#files-requiring-changes)
10. [Risk Assessment](#risk-assessment)

---

## Overview

### What is Zoneless Angular?

Zoneless Angular removes the dependency on `zone.js` for change detection. Instead of relying on zone.js to automatically trigger change detection after async operations, developers explicitly signal when updates should occur using:

- **Signals** (`signal()`, `computed()`, `effect()`)
- **`ChangeDetectorRef.markForCheck()`** for OnPush components
- **`afterRenderEffect()`** for DOM-related side effects
- **`afterNextRender()`** for one-time DOM operations

### Benefits

- **Better Performance**: No overhead from zone.js patching async APIs
- **Smaller Bundle Size**: Removing zone.js saves ~13KB gzipped
- **Predictable Change Detection**: Explicit control over when updates happen
- **Better Debugging**: Clearer async stack traces
- **SSR Improvements**: Better server-side rendering performance

### ngx-bootstrap Current Version

- **Angular**: 20.0.2
- **zone.js**: 0.15.0 (listed in dependencies)

---

## Current State Analysis

### NgZone Usage Patterns

The following files currently use `NgZone` directly:

| File | Usage Pattern | Purpose |
|------|---------------|---------|
| `src/carousel/carousel.component.ts` | `runOutsideAngular()`, `run()` | Timer management for auto-sliding |
| `src/component-loader/component-loader.class.ts` | `onStable` subscription | Positioning updates after zone stabilization |
| `src/component-loader/component-loader.factory.ts` | NgZone injection | Factory dependency |
| `src/positioning/positioning.service.ts` | `runOutsideAngular()` | Scroll/resize event handling |
| `src/focus-trap/focus-trap.ts` | `runOutsideAngular()` | Focus anchor event listeners |
| `src/focus-trap/configurable-focus-trap.ts` | NgZone injection | Dependency |
| `src/focus-trap/configurable-focus-trap-factory.ts` | NgZone injection | Factory dependency |
| `src/focus-trap/event-listener-inert-strategy.ts` | `runOutsideAngular()` | Focus event listener registration |

### Change Detection Strategies

Components using `ChangeDetectionStrategy.OnPush`:

1. `src/alert/alert.component.ts`
2. `src/progressbar/bar.component.ts`
3. `src/progressbar/progressbar.component.ts`
4. `src/tooltip/tooltip-container.component.ts`
5. `src/popover/popover-container.component.ts`
6. `src/dropdown/bs-dropdown-container.component.ts`
7. `src/rating/rating.component.ts`
8. `src/timepicker/timepicker.component.ts`
9. `src/datepicker/themes/bs/bs-custom-dates-view.component.ts`
10. `src/datepicker/themes/bs/bs-datepicker-day-decorator.directive.ts`
11. `src/datepicker/themes/bs/bs-days-calendar-view.component.ts`
12. `src/datepicker/themes/bs/bs-datepicker-navigation-view.component.ts`

### Components Using ChangeDetectorRef

Files using `ChangeDetectorRef` for manual change detection:

1. `src/alert/alert.component.ts`
2. `src/datepicker/bs-datepicker-input.directive.ts`
3. `src/datepicker/bs-daterangepicker-input.directive.ts`
4. `src/typeahead/typeahead-container.component.ts`
5. `src/typeahead/typeahead.directive.ts`
6. `src/timepicker/timepicker.component.ts`
7. `src/pagination/pager.component.ts`
8. `src/pagination/pagination.component.ts`
9. `src/dropdown/bs-dropdown-toggle.directive.ts`
10. `src/dropdown/bs-dropdown-container.component.ts`
11. `src/rating/rating.component.ts`
12. `src/buttons/button-radio-group.directive.ts`
13. `src/buttons/button-radio.directive.ts`

---

## Migration Strategy

### Approach: Gradual Migration with Backward Compatibility

We recommend a **gradual migration approach** that:

1. Maintains backward compatibility with zone.js-based applications
2. Adds zoneless support incrementally
3. Uses feature detection to work in both environments
4. Leverages Angular's new primitives (signals, effects) where beneficial

### Key Principles

1. **Don't break existing users**: All changes must be backward compatible
2. **Opt-in zoneless support**: Library should work seamlessly in both modes
3. **Use Angular's recommended patterns**: Follow Angular's official zoneless migration guide
4. **Test in both environments**: Ensure functionality in zone and zoneless modes

---

## Phase 1: Preparation

### 1.1 Update Documentation App for Zoneless Testing

Add zoneless configuration to the documentation app for testing:

```typescript
// apps/ngx-bootstrap-docs/src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    // ... other providers
  ]
});
```

### 1.2 Create Feature Detection Utility

Create a utility to detect the current change detection mode:

```typescript
// src/utils/zoneless-detection.ts
import { inject, NgZone, ɵNoopNgZone } from '@angular/core';

export function isZoneless(): boolean {
  const ngZone = inject(NgZone);
  // In zoneless mode, Angular provides a NoopNgZone instance
  return ngZone instanceof ɵNoopNgZone;
}

// Alternative approach using zone.js detection
export function hasZoneJs(): boolean {
  return typeof Zone !== 'undefined' && Zone.current?.name !== 'angular';
}
```

### 1.3 Set Up Dual Testing Infrastructure

Configure Jest/testing utilities to run tests in both zone and zoneless modes.

---

## Phase 2: Component Updates

### 2.1 Carousel Component

**File**: `src/carousel/carousel.component.ts`

**Current Pattern**:
```typescript
private restartTimer() {
  // Uses NgZone to manage timer outside Angular
  this.currentInterval = this.ngZone.runOutsideAngular<number>(() => {
    return window.setInterval(() => {
      this.ngZone.run(() => {
        // ... carousel logic
      });
    }, interval);
  });
}
```

**Zoneless Pattern**:
```typescript
import { ChangeDetectorRef, inject } from '@angular/core';

private cdr = inject(ChangeDetectorRef);

private restartTimer() {
  this.currentInterval = window.setInterval(() => {
    if (this.isPlaying && this.slides.length) {
      this.nextSlideFromInterval();
      this.cdr.markForCheck(); // Explicitly mark for check
    }
  }, interval);
}
```

**Changes Required**:
- Replace `NgZone.runOutsideAngular()` and `NgZone.run()` pattern with direct calls
- Add `ChangeDetectorRef.markForCheck()` after state changes
- Consider using signals for reactive state management

### 2.2 Alert Component

**File**: `src/alert/alert.component.ts`

**Current State**: Already uses `OnPush` and `ChangeDetectorRef`

**Recommended Updates**:
- Convert to signals for state management
- Ensure all async operations trigger `markForCheck()`

### 2.3 Timepicker Component

**File**: `src/timepicker/timepicker.component.ts`

**Recommended Updates**:
- Already uses `OnPush` strategy
- Review async operations for proper change detection triggers

### 2.4 Dropdown Component

**Files**: 
- `src/dropdown/bs-dropdown-container.component.ts`
- `src/dropdown/bs-dropdown-toggle.directive.ts`

**Recommended Updates**:
- Review event handling for change detection
- Ensure `markForCheck()` is called after dropdown state changes

### 2.5 All Other Components

For components **not** using `OnPush`:
- Add `changeDetection: ChangeDetectionStrategy.OnPush` to component decorator
- Inject `ChangeDetectorRef`
- Call `markForCheck()` after any state changes

---

## Phase 3: Service Updates

### 3.1 Component Loader

**File**: `src/component-loader/component-loader.class.ts`

**Current Pattern**:
```typescript
this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
  if (!this._componentRef) {
    return;
  }
  this._posService.calcPosition();
});
```

**Zoneless Pattern**:
```typescript
import { afterRenderEffect } from '@angular/core';

// In component or service initialization
afterRenderEffect(() => {
  if (this._componentRef) {
    this._posService.calcPosition();
  }
});
```

**Alternative (Backward Compatible)**:
```typescript
private setupPositioning(): void {
  if (this._ngZone) {
    // Zone mode: use onStable
    this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
      this._posService.calcPosition();
    });
  } else {
    // Zoneless mode: use afterRenderEffect or requestAnimationFrame
    this.schedulePositionUpdate();
  }
}

private schedulePositionUpdate(): void {
  requestAnimationFrame(() => {
    if (this._componentRef) {
      this._posService.calcPosition();
    }
  });
}
```

### 3.2 Positioning Service

**File**: `src/positioning/positioning.service.ts`

**Current Pattern**:
```typescript
constructor(ngZone: NgZone, ...) {
  ngZone.runOutsideAngular(() => {
    this.triggerEvent$ = merge(
      fromEvent(window, 'scroll', { passive: true }),
      fromEvent(window, 'resize', { passive: true }),
      // ...
    );
  });
}
```

**Zoneless Pattern**:
The pattern of running event listeners outside Angular for performance remains valid in zoneless mode. However, the `runOutsideAngular` becomes a no-op. The service should:

1. Continue to work with `runOutsideAngular` (it's harmless in zoneless mode)
2. Ensure any callbacks that need UI updates call `markForCheck()`

**Recommended Update**:
```typescript
@Injectable({ providedIn: 'root' })
export class PositioningService {
  private ngZone = inject(NgZone, { optional: true });
  
  constructor(...) {
    const setupEvents = () => {
      this.triggerEvent$ = merge(
        fromEvent(window, 'scroll', { passive: true }),
        fromEvent(window, 'resize', { passive: true }),
        // ...
      );
    };
    
    // runOutsideAngular is a no-op in zoneless, but harmless
    if (this.ngZone) {
      this.ngZone.runOutsideAngular(setupEvents);
    } else {
      setupEvents();
    }
  }
}
```

### 3.3 Focus Trap

**Files**:
- `src/focus-trap/focus-trap.ts`
- `src/focus-trap/configurable-focus-trap.ts`
- `src/focus-trap/configurable-focus-trap-factory.ts`
- `src/focus-trap/event-listener-inert-strategy.ts`

**Current Pattern**: Uses `NgZone.runOutsideAngular()` for event listeners

**Zoneless Pattern**: 
The `runOutsideAngular` pattern for focus trapping event listeners is primarily for performance optimization. In zoneless mode:
- Event listeners don't trigger change detection automatically
- The `runOutsideAngular` call becomes unnecessary but harmless

**Recommended Update**:
- Make `NgZone` optional injection
- Keep existing pattern for backward compatibility
- Add null checks for NgZone

---

## Phase 4: Testing & Validation

### 4.1 Unit Tests

Create zoneless-specific test configurations:

```typescript
// jest-zoneless.config.ts
import baseConfig from './jest.config';

export default {
  ...baseConfig,
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest-zoneless.ts'
  ],
};
```

```typescript
// setup-jest-zoneless.ts
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()]
  });
});
```

### 4.2 E2E Tests

Update Playwright tests to run against zoneless configuration:

```typescript
// Create a separate test app configuration for zoneless
// apps/ngx-bootstrap-docs-zoneless/
```

### 4.3 Test Scenarios

For each component, test:

1. **Initial rendering** in zoneless mode
2. **User interactions** (clicks, inputs, keyboard events)
3. **Async operations** (timers, HTTP, animations)
4. **Dynamic content** (modals, dropdowns, tooltips)
5. **Form interactions** (validation, value changes)

### 4.4 CI Pipeline Updates

Add zoneless testing to CI:

```yaml
# .github/workflows/ci.yml
jobs:
  test-zoneless:
    runs-on: ubuntu-latest
    steps:
      - name: Run zoneless tests
        run: npm run test:zoneless
```

---

## Phase 5: Documentation & Release

### 5.1 Update README

Add zoneless compatibility section:

```markdown
## Zoneless Support

ngx-bootstrap fully supports Angular's zoneless change detection. To use zoneless mode:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()]
});
```

### 5.2 Migration Guide for Users

Create a migration guide for library users who want to switch to zoneless.

### 5.3 Changelog

Document all zoneless-related changes in CHANGELOG.md.

### 5.4 Version Bump

Consider this a minor version bump (e.g., 20.1.0) since it adds functionality without breaking existing usage.

---

## Files Requiring Changes

### High Priority (Core functionality)

| File | Changes | Effort |
|------|---------|--------|
| `src/carousel/carousel.component.ts` | Replace NgZone timer pattern | Medium |
| `src/component-loader/component-loader.class.ts` | Replace onStable subscription | Medium |
| `src/component-loader/component-loader.factory.ts` | Optional NgZone injection | Low |
| `src/positioning/positioning.service.ts` | Optional NgZone, add markForCheck | Medium |

### Medium Priority (Focus trap)

| File | Changes | Effort |
|------|---------|--------|
| `src/focus-trap/focus-trap.ts` | Optional NgZone injection | Low |
| `src/focus-trap/configurable-focus-trap.ts` | Optional NgZone | Low |
| `src/focus-trap/configurable-focus-trap-factory.ts` | Optional NgZone | Low |
| `src/focus-trap/event-listener-inert-strategy.ts` | Handle missing NgZone | Low |

### Lower Priority (Already using OnPush)

These components already use `OnPush` but should be reviewed:

| File | Changes | Effort |
|------|---------|--------|
| `src/alert/alert.component.ts` | Review async operations | Low |
| `src/progressbar/bar.component.ts` | Review async operations | Low |
| `src/tooltip/tooltip-container.component.ts` | Review async operations | Low |
| `src/popover/popover-container.component.ts` | Review async operations | Low |
| `src/dropdown/bs-dropdown-container.component.ts` | Review async operations | Low |
| `src/rating/rating.component.ts` | Review async operations | Low |
| `src/timepicker/timepicker.component.ts` | Review async operations | Low |

### Components to Add OnPush

Components currently using default change detection should be updated to `OnPush`:

| Directory | Components to Update |
|-----------|---------------------|
| `src/accordion/` | All components |
| `src/buttons/` | Button directives |
| `src/collapse/` | Collapse component |
| `src/datepicker/` | Non-OnPush components |
| `src/modal/` | Modal components |
| `src/pagination/` | Pagination components |
| `src/sortable/` | Sortable components |
| `src/tabs/` | Tab components |
| `src/typeahead/` | Typeahead components |

---

## Risk Assessment

### Low Risk

- Adding `OnPush` to components that already properly manage their state
- Making `NgZone` optional with fallback behavior
- Adding `markForCheck()` calls

### Medium Risk

- Replacing `NgZone.onStable` subscriptions (may affect timing)
- Modifying timer management in carousel
- Changes to positioning calculations timing

### High Risk

- Breaking existing applications that depend on zone.js behavior
- Missing change detection triggers causing UI to not update

### Mitigation Strategies

1. **Feature flags**: Add configuration option to enable/disable zoneless optimizations
2. **Thorough testing**: Test all components in both zone and zoneless modes
3. **Gradual rollout**: Release as opt-in feature first
4. **Documentation**: Clear migration guides and breaking change notices

---

## Implementation Timeline

### Week 1-2: Phase 1 (Preparation)
- Set up zoneless testing infrastructure
- Create utility functions
- Update documentation app configuration

### Week 3-4: Phase 2 (Component Updates)
- Update carousel component
- Update alert, timepicker, dropdown components
- Add OnPush to remaining components

### Week 5-6: Phase 3 (Service Updates)
- Update component loader
- Update positioning service
- Update focus trap

### Week 7-8: Phase 4 (Testing)
- Run full test suite in zoneless mode
- Fix any discovered issues
- Performance benchmarking

### Week 9: Phase 5 (Documentation & Release)
- Update documentation
- Create migration guide
- Release new version

---

## Conclusion

The migration to zoneless Angular for ngx-bootstrap is achievable with careful planning and incremental changes. The key is maintaining backward compatibility while adding support for the new zoneless mode. By following this plan, ngx-bootstrap can fully support Angular's zoneless change detection while continuing to work seamlessly with traditional zone.js-based applications.

## References

- [Angular Zoneless Documentation](https://angular.dev/guide/experimental/zoneless)
- [Angular Change Detection Guide](https://angular.dev/best-practices/runtime-performance)
- [Angular Signals Guide](https://angular.dev/guide/signals)
