# ngx-bootstrap Dependency Upgrade Guide

This document outlines the necessary steps to upgrade outdated dependencies in the ngx-bootstrap project. The analysis is based on the output of `npm outdated` as of December 2024.

## Overview

The project has several packages that can be updated, ranging from minor patches to major version upgrades that may require migration work.

## Angular Ecosystem Updates

### Angular Core & CLI (Minor Updates)
**Current:** 19.0.1-19.0.2 → **Latest:** 19.2.13

All Angular packages can be safely updated to the latest 19.x version:
- `@angular/animations`, `@angular/common`, `@angular/core`, etc.
- `@angular-devkit/build-angular`, `@angular/cli`
- `@angular-eslint/*` packages

**Migration:** These are patch/minor updates within the same major version - should be safe to update.

```bash
ng update @angular/core @angular/cli
ng update @angular-eslint/schematics
```

## Major Version Upgrades (Breaking Changes)

### 1. Nx Monorepo Tools
**Current:** 20.2.0 → **Latest:** 21.1.2

**Breaking Changes:**
- Angular CLI v20.0.0-rc.3 support added
- Migrated to Angular Rspack for build and module federation
- Enhanced task runner and process management
- Improved cache and remote cache handling

**Migration Steps:**
```bash
npx nx migrate latest
npm install
npx nx migrate --run-migrations
```

**Action Required:**
- Review module federation configurations
- Test parallel task execution
- Verify cache and remote cache settings

### 2. ESLint
**Current:** 8.57.0 → **Latest:** 9.27.0

**Breaking Changes:**
- New configuration format with `defineConfig()`
- Flat config is now preferred
- Some older configuration methods deprecated
- Enhanced TypeScript syntax support

**Migration Steps:**
1. Update ESLint configuration to use flat config format
2. Review and update deprecated rule usages
3. Test custom rules for compatibility

```bash
npm install eslint@9 --save-dev
# Review and update .eslintrc configuration
```

### 3. TypeScript ESLint
**Current:** 7.18.0 → **Latest:** 8.32.1

**Breaking Changes:**
- New standalone packages: "project-service" and "tsconfig-utils"
- New ESLint rules: `no-unnecessary-type-conversion`, updated `prefer-nullish-coalescing`
- Enhanced type safety and code quality rules

**Migration Steps:**
```bash
npm install @typescript-eslint/eslint-plugin@8 @typescript-eslint/parser@8 --save-dev
```

**Action Required:**
- Review ESLint configurations for new rule options
- Test thoroughly for new rule behaviors

### 4. Playwright
**Current:** 1.35.1 → **Latest:** 1.52.0

**Breaking Changes:**
- New headless mode for Chrome and Edge channels
- `expect(locator).toBeEditable()` API changes
- Glob URL pattern changes in `page.route()` (no `?` wildcard support)
- `route.continue()` cannot override `Cookie` header
- macOS 13 deprecated for WebKit

**Migration Steps:**
```bash
npm install @playwright/test@latest --save-dev
npx playwright install
```

**Action Required:**
- Review and update test configurations
- Check routing and snapshot modifications
- Update any glob patterns in route handling

### 5. Express.js
**Current:** 4.21.2 → **Latest:** 5.1.0

**Breaking Changes:**
- Requires Node.js 18+
- Updated to `path-to-regexp@8.x`
- Removed sub-expression regex patterns for security
- Middleware can return rejected promises
- Removed deprecated API methods from v3/v4

**Migration Steps:**
```bash
npm install express@5 --save
```

**Action Required:**
- Ensure Node.js version is 18+
- Review middleware error handling with promises
- Check for deprecated method signatures
- Follow [official migration guide](https://expressjs.com/en/guide/migrating-5.html)

### 6. @ngneat/spectator
**Current:** 11.1.0 → **Latest:** 19.6.1

**Major Version Jump:** This is a significant upgrade spanning multiple major versions.

**Action Required:**
- Review the project's changelog for breaking changes
- Test all spectator-based tests thoroughly
- Consider gradual migration approach

## Recommended Safe Updates

### Minor/Patch Updates (Low Risk)
These can be updated without breaking changes:

```bash
# Development tools
npm install --save-dev \
  prettier@3.5.3 \
  ts-jest@29.3.4 \
  ts-node@10.9.2 \
  webpack-bundle-analyzer@4.10.2 \
  jest-preset-angular@14.5.5

# Runtime dependencies
npm install \
  rxjs@7.8.2 \
  zone.js@0.15.1 \
  moment@2.30.1 \
  ajv@8.17.1
```

## High-Risk Updates (Major Versions)

### marked.js
**Current:** 4.0.18 → **Latest:** 15.0.12

This is a massive version jump (11 major versions). Recommend:
1. Review changelog carefully
2. Test markdown rendering thoroughly
3. Consider migration in separate PR

### Other Notable Updates
- `@stackblitz/sdk`: 1.8.0 → 1.11.0 (safe minor update)
- `husky`: 8.0.1 → 9.1.7 (review configuration changes)
- `release-it`: 16.1.0 → 19.0.2 (review release workflow)

## Migration Strategy

### Phase 1: Safe Updates
1. Update Angular packages to 19.2.13
2. Update minor/patch versions of development tools
3. Update TypeScript to 5.8.3

### Phase 2: Medium Risk
1. Update Nx to 21.x (use migration tools)
2. Update Playwright to 1.52.0
3. Update TypeScript ESLint to 8.x

### Phase 3: High Risk
1. Update ESLint to 9.x
2. Update Express to 5.x
3. Update @ngneat/spectator to 19.x
4. Update marked.js to 15.x

## Testing Checklist

After each phase:
- [ ] Run all unit tests: `npm test`
- [ ] Run all e2e tests: `npm run e2e`
- [ ] Run linting: `npm run lint`
- [ ] Build the project: `npm run build`
- [ ] Test SSR functionality: `npm run build:ssr`
- [ ] Verify documentation generation works

## Command Summary

```bash
# Phase 1: Safe updates
ng update @angular/core @angular/cli
npm update # For patch updates

# Phase 2: Medium risk
npx nx migrate latest
npm install @playwright/test@latest --save-dev
npm install @typescript-eslint/eslint-plugin@8 @typescript-eslint/parser@8 --save-dev

# Phase 3: High risk (do separately)
npm install eslint@9 --save-dev
npm install express@5 --save
npm install @ngneat/spectator@latest --save-dev
npm install marked@latest --save-dev
```

## Notes

- Always create feature branches for major version upgrades
- Consider updating packages individually rather than all at once
- Have rollback plan ready for each major update
- Update CI/CD pipelines if Node.js version requirements change
- Review and update documentation after migrations

Generated on: December 2024