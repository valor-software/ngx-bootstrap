# ng2-bootstrap [![npm version](https://badge.fury.io/js/ng2-bootstrap.svg)](http://badge.fury.io/js/ng2-bootstrap) [![npm downloads](https://img.shields.io/npm/dm/ng2-bootstrap.svg)](https://npmjs.org/ng2-bootstrap)
Native Angular2 directives for Bootstrap, works with Bootstrap 3 and 4-alfa

Follow me at [twitter](https://twitter.com/valorkin) to be notified about new releases.

[![Code Climate](https://codeclimate.com/github/valor-software/ng2-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/valor-software/ng2-bootstrap)
[![Join the chat at https://gitter.im/valor-software/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/valor-software/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/valor-software/ng2-bootstrap.svg)](https://david-dm.org/valor-software/ng2-bootstrap)
[![devDependency Status](https://david-dm.org/valor-software/ng2-bootstrap/dev-status.svg)](https://david-dm.org/valor-software/ng2-bootstrap#info=devDependencies)
[![Throughput Graph](https://graphs.waffle.io/valor-software/ng2-bootstrap/throughput.svg)](https://waffle.io/valor-software/ng2-bootstrap/metrics)


<!---
[![Test Coverage](https://codeclimate.com/github/valor-software/angular2-bootstrap/badges/coverage.svg)](https://codeclimate.com/github/valor-software/angular2-bootstrap/coverage)
-->

# Usage & Demo

[http://valor-software.github.io/ng2-bootstrap/](http://valor-software.github.io/ng2-bootstrap/)

## If you need more modules check [here](https://github.com/valor-software/ng2-plans)

# Starter packages

With webpack: [https://github.com/AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

With gulp: [pkozlowski-opensource/ng2-play](https://github.com/pkozlowski-opensource/ng2-play/pull/34)

With angular2-seed: [mgechev/angular2-seed](http://ludohenin.github.io/angular2-seed-ng2-bootstrap/)

## Install from npm

```bash
npm i ng2-bootstrap --save
```

## Quick start

**Important**: angular2 5 min quickstart tutorial is using angular2 `0-beta`, ng2-bootstrap is already updated for `1-beta`,
to avoid facing wierd issues, please update following dependecies in `package.json`
```json
  "dependencies": {
    "angular2": "2.0.1-beta.0",
    ...
  }
```

If you are following [Angular2 5 min quickstart guide](https://angular.io/docs/ts/latest/quickstart.html), just add one line
```html
<!-- index.html -->
<script src="node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
```

And update your `app.component.ts` to have following content:

```ts
import {Component} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'my-app',
  directives: [Alert],
  template: `<alert type="info">ng2-bootstrap hello world!</alert>`
})
export class AppComponent {
}
```

And you are ready to go! :)

<!--
## Components

- [x] Accordion
- [x] Alert
- [x] Buttons
- [x] Carousel
- [x] Collapse
- [+-] Datepicker (Datepicker popup not implemented)
- [x] Dropdown
- [ ] Modal (in progress...)
- [x] Pagination
- [ ] Popover
- [x] Progressbar
- [x] Rating
- [x] Tabs
- [x] Timepicker
- [+-] Tooltip
- [x] Typeahead
-->

## API
Check demo for API [documentation](http://valor-software.github.io/ng2-bootstrap/)

## Contribution

Please read central `ng2` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach and welcome :)
