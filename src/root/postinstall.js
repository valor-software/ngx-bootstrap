/**
 * ngx-bootstrap v21.2.0 postinstall warning
 * Notifies users about breaking changes introduced by the zoneless migration.
 */

const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const WARNING = `
${RED}${BOLD}╔══════════════════════════════════════════════════════════════════════════════╗${RESET}
${RED}${BOLD}║                  ngx-bootstrap v21.2.0 — BREAKING CHANGES                   ║${RESET}
${RED}${BOLD}╚══════════════════════════════════════════════════════════════════════════════╝${RESET}

${YELLOW}${BOLD}⚠  ZONELESS MIGRATION — BREAKING CHANGES${RESET}

  This version completes the migration to Angular's ${CYAN}zoneless change detection${RESET}.
  If you are upgrading from a previous version, please review the following:

${YELLOW}  1. zone.js is no longer required${RESET}
     Remove ${CYAN}zone.js${RESET} from your polyfills and dependencies.
     Use ${CYAN}provideZonelessChangeDetection()${RESET} in your app bootstrap.

${YELLOW}  2. @Input() / @Output() decorators replaced${RESET}
     All ${CYAN}@Input()${RESET} decorators are now ${CYAN}input()${RESET} signal functions.
     All ${CYAN}@Output()${RESET} decorators are now ${CYAN}output()${RESET} functions.
     Programmatic access to inputs requires signal read syntax: ${CYAN}component.myInput()${RESET}

${YELLOW}  3. Angular 21.2.0+ required${RESET}
     This version requires ${CYAN}Angular ^21.2.0${RESET}. Older Angular versions are not supported.

${YELLOW}  4. ChangeDetectionStrategy.OnPush everywhere${RESET}
     All components now use ${CYAN}OnPush${RESET} change detection.
     Ensure your app properly triggers change detection for async operations.

${CYAN}  For full migration guide, see:${RESET}
  ${CYAN}https://github.com/valor-software/ngx-bootstrap/blob/development/ZONELESS_MIGRATION_PLAN.md${RESET}

`;

try {
  console.log(WARNING);
} catch (_) {
  // silently ignore if console is not available
}
