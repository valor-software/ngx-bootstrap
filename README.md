# ng2-bootstrap
Native Angular2 directives for Bootstrap

Works with Bootstrap 3 and 4-alfa

Goal: smooth transition from ui-bootstrap to angular2,
all components will have same API

[![Code Climate](https://codeclimate.com/github/valor-software/ng2-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/valor-software/ng2-bootstrap)
[![Dependency Status](https://david-dm.org/valor-software/ng2-bootstrap.svg)](https://david-dm.org/valor-software/ng2-bootstrap)
[![devDependency Status](https://david-dm.org/valor-software/ng2-bootstrap/dev-status.svg)](https://david-dm.org/valor-software/ng2-bootstrap#info=devDependencies)
<!---
[![Test Coverage](https://codeclimate.com/github/valor-software/angular2-bootstrap/badges/coverage.svg)](https://codeclimate.com/github/valor-software/angular2-bootstrap/coverage)
-->

# Usage & Demo

[http://valor-software.github.io/ng2-bootstrap/](http://valor-software.github.io/ng2-bootstrap/)

# Starter package

You can start hacking by cloning starter repo:
[https://github.com/valor-software/angular2-bootstrap-starter](https://github.com/valor-software/angular2-bootstrap-starter)

## Install from npm

```bash
npm i ng2-bootstrap --save
# if you are developing with typescript it will link .d.ts from package definition
tsd link
```

## Install from source

```bash
  npm i
  npm start
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
- [ ] publish to bower, etc.
- [ ] migration guide from Angular 1 to Angular 2
- [x] publish to npm
