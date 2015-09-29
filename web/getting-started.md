# Getting started

### First of all, Welcome!

This module is currently in alfa while an Angular2 in alfa too ;)

It contains a lot of issues, no really a looot of issues,
and it is a great chance to contribute and help us bring it to life!

**80%** of baseline functionality is already **rewritten** to Angular2,
currently Modal, Popover and Typeahed are left.

*Note*: template-url and animation not yet implemented

While animations is just another feature,
template-url implementation in Angular 2 seems no trivial task,
more of that it has a chance to be against new Angular mental model.

Most probably template-url will be replaced by:
1. temporal hack with dynamic components
2. template-ref, could became a standard
3. component extension with template overwriting

### Dependencies
This module consists of native Angular2 components and directives, no jQuery or Bootstrap javascript is required.

Always actual list of JS dependencies you can find [here](https://david-dm.org/valor-software/ng2-bootstrap)

Plus this module plays nice with Bootstrap CSS [v3](http://getbootstrap.com/css/) and [v4](http://v4-alpha.getbootstrap.com)

*Note* later on each component will be available independently via npm, jspm, etc.

### Installation

Currently preferable way to install this module is `npm`:

```bash
npm install --save ng2-bootstrap
```

You may find angular2 bootstrap starter [repo](https://github.com/valor-software/angular2-bootstrap-starter) useful, until we added plunker examples

Just 4 commands to start hacking Angular2 with bootstrap ;)
```bash
git clone git@github.com:valor-software/angular2-bootstrap-starter.git
cd angular2-bootstrap-starter
npm i && npm start
```

Have fun!

### Reading documentation

Each `ng2-bootstrap` component has api and annotation docs, examples and working demo. Each `property` and `event` has type annotation and default value if any.

