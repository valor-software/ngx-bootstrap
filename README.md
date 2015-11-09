# ng2-bootstrap
Native Angular2 directives for Bootstrap, works with Bootstrap 3 and 4-alfa

Goal: smooth transition from ui-bootstrap to angular2,
all components will have same API

[![Code Climate](https://codeclimate.com/github/valor-software/ng2-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/valor-software/ng2-bootstrap)
[![Join the chat at https://gitter.im/valor-software/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/valor-software/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/valor-software/ng2-bootstrap.svg)](https://david-dm.org/valor-software/ng2-bootstrap)
[![devDependency Status](https://david-dm.org/valor-software/ng2-bootstrap/dev-status.svg)](https://david-dm.org/valor-software/ng2-bootstrap#info=devDependencies)

Follow to be notified about new releases: [twitter](https://twitter.com/valorkin)
<!---
[![Test Coverage](https://codeclimate.com/github/valor-software/angular2-bootstrap/badges/coverage.svg)](https://codeclimate.com/github/valor-software/angular2-bootstrap/coverage)
-->

# Usage & Demo

[http://valor-software.github.io/ng2-bootstrap/](http://valor-software.github.io/ng2-bootstrap/)

## If you need more modules check [here](https://github.com/valor-software/ng2-plans)

# Starter packages

With webpack: [https://github.com/valor-software/angular2-bootstrap-starter](https://github.com/valor-software/angular2-bootstrap-starter)

With gulp: [pkozlowski-opensource/ng2-play](https://github.com/pkozlowski-opensource/ng2-play/pull/34)

With angular2-seed: [mgechev/angular2-seed](http://ludohenin.github.io/angular2-seed-ng2-bootstrap/)

## Install from npm

```bash
npm i ng2-bootstrap --save
```

## Quick start

```ts
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app'
})
@View({
  template: `
    <alert type="info">ng2-bootstrap hello world!</alert>
    This is a webpack sample:
  `,
  directives: [
    Alert
  ]
})
export class Home {
}
```

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

- [x] NgTransclude - to transclude templates
- [x] positional service
- [ ] template url support

## Contribution

Please read central `ng2` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach and welcome :)


### TODO
- [ ] find a better way to detect is event handler is set (see alerts.ts)
- [ ] support `templateUrl` for directives
- [ ] support animation  (in progress...)
- [x] demo page
- [x] docs
- [x] publish to npm
