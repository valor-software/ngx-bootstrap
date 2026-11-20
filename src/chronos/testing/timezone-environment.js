// Jest runs spec files in a sandbox whose `process.env` is a copy, so a spec cannot switch
// the time zone of `Date` by itself. This environment does it from the outside:
//
//   /**
//    * @jest-environment <rootDir>/testing/timezone-environment.js
//    * @timezone Africa/Cairo
//    */
const { TestEnvironment } = require('jest-environment-jsdom');

class TimezoneEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
    // deleting TZ does not make node go back to the system zone, so remember the zone by name
    this.originalTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    process.env.TZ = context.docblockPragmas.timezone;
  }

  async teardown() {
    process.env.TZ = this.originalTimezone;
    await super.teardown();
  }
}

module.exports = TimezoneEnvironment;
