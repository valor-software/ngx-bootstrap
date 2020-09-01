<a href="http://valor-software.com/ngx-bootstrap/#/">
    <h1 align="center">ngx-bootstrap</h1>
</a>
Server side rendered version of this documentation available
<a href="https://ngx-universal.herokuapp.com/">here</a> served with Angular universal and <a href="https://nestjs.com">nest.js</a>

<p align="center">
Best way to quickly integrate <a href="https://getbootstrap.com/">Bootstrap 3</a> or <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4</a> Components with <a href="https://angular.io/">Angular</a>
</p>

<p align="center">
<a href="https://badge.fury.io/js/ngx-bootstrap"><img src="https://badge.fury.io/js/ngx-bootstrap.svg" alt="npm version" ></a>
<a href="https://npmjs.org/ngx-bootstrap"><img src="https://img.shields.io/npm/dm/ngx-bootstrap.svg" alt="npm downloads" ></a>
<a href="https://travis-ci.org/valor-software/ngx-bootstrap"><img alt="" src="https://travis-ci.org/valor-software/ngx-bootstrap.svg?branch=development"></a>
<a target="_blank" href="https://opencollective.com/ngx-bootstrap"><img src="https://opencollective.com/ngx-bootstrap/tiers/backer/badge.svg?label=backer&color=brightgreen" /></a>

<br/>
<a  href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY"><img src="https://thehomeofthefuture.files.wordpress.com/2018/12/Joinslack.png" width="20%" alt="slack" ></a>

</p>

## Links

- [Documentation](http://valor-software.com/ngx-bootstrap/)
- [Release Notes](https://github.com/valor-software/ngx-bootstrap/blob/development/CHANGELOG.md)
- [Slack Community](https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY)

<!-- [![codecov](https://codecov.io/gh/valor-software/ngx-bootstrap/branch/development/graph/badge.svg)](https://codecov.io/gh/valor-software/ngx-bootstrap) -->

<!-- [![NPM](https://nodei.co/npm/ngx-bootstrap.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-bootstrap)
[![NPM](https://nodei.co/npm-dl/ngx-bootstrap.png?height=3&months=6)](https://npmjs.org/ngx-bootstrap)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/valorkin.svg)](https://saucelabs.com/u/valorkin)
-->

## Table of contents
1. [Getting Started](#getting-started)
2. [Supporting](#supporting-ngx-bootstrap)
3. [Installation instructions](#installation-instructions)
4. [Usage & Demo](#usage--demo)
5. [API](#api)
6. [Compatibility](#compatibility)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contribution)

## Getting Started

ngx-bootstrap contains all core (and not only) Bootstrap components powered by Angular. So you don't need to include original JS components, but we are using markup and CSS provided by Bootstrap.

## Supporting NGX-Bootstrap
ngx-bootstrap is an Open Source (MIT Licensed) project, it's an independent project with ongoing development made possible thanks to the support of our awesome backers.
If you also would like to show support or simply give back to Open Source community, please consider becoming a backer sponsor of [ngx-bootstrap on OpenCollective](https://opencollective.com/ngx-bootstrap).

All donated funds are managed transparently on OpenCollective and will be used solely for compensating work and expenses for contributors. Valor Software employees and contractors are not eligible to use these funds.

What's there for you? Proper recognition and exposure of your name/logo/website on our page.
Our main sponsors will be presented under this section! Be the first!

## Installation instructions
##### Method 1
Install `ngx-bootstrap` from `npm`:
```bash
npm install ngx-bootstrap --save
```

Add needed package to NgModule imports:
```
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  ...
  imports: [TooltipModule.forRoot(),...]
  ...
})
```

Add component to your page:
```
<button type="button" class="btn btn-primary"
        tooltip="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Simple demo
</button>
```

You will need bootstrap styles:
- `Bootstrap 3`
```
<!-- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

- `Bootstrap 4`
```
<!--- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
```
##### Method 2
Use the Angular CLI ng add command for updating your Angular project.
```bash
ng add ngx-bootstrap
```

Or use `ng add` to add needed component (for example tooltip).
```bash
ng add ngx-bootstrap --component tooltip
```
Add component to your page:
```
<button type="button" class="btn btn-primary"
        tooltip="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Simple demo
</button>
```
### Setting up the bootstrap version manually
Sometimes, your project might contain some library that could interfere with the bootstrap framework, or you might have a customized version of bootstrap. The consequence is that the process of determining bootstrap version might be failed, which can break the UI. In that case, we can still set the bootstrap version manually in the bootstrapping component (i.e. `AppComponent`):
```
import { setTheme } from 'ngx-bootstrap/utils';

@Component({...})
export class AppComponent {
  constructor() {
    setTheme('bs3'); // or 'bs4'
    ...
  }
}
```

## Usage & Demo

Main source of API documentation and usage scenarios available here:
[https://valor-software.com/ngx-bootstrap/](https://valor-software.com/ngx-bootstrap/).

Additionally you can find demos and docs deployed from latest code with <a href="https://ngx-bootstrap.surge.sh/">angular@latest</a> and <a
  href="https://ngx-bootstrap-latest.surge.sh/">angular@next</a>.

Server side rendered version of this documentation available <a href="https://ngx-universal.herokuapp.com/">here</a> served with Angular universal and [nest.js](https://nestjs.com/).

## API
Check demo page for API [reference](https://valor-software.com/ngx-bootstrap/).

### How to use it with:
 - `Bootstrap and angular-cli` please refer to [using-with-bootstrap-and-angular-cli](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/bootstrap.md)
 - `angular-seed` please refer to [getting-started-with-angular-seed](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/angular-seed.md)
 - `system.js` (and [angular2 quickstart](https://angular.io/docs/ts/latest/quickstart.html)) please checkout [sample repository](https://github.com/valor-software/angular2-quickstart)
 - `plnkr` sample available [here](https://plnkr.co/edit/0NipkZrnckZZROAcnjzB?p=preview)
 - `AoT using ngc and rollup` please refer to [ngx-bootstrap-with-aot](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/aot.md)
 - `ASP.NET Core 2.0` please refer to [using-with-asp.net-core-2](https://github.com/csegyud/ASPNETCore_ngx-bootstrap_Sample/blob/master/README.md)

### How to build lib for development

First time:
 - clone repository
 - `npm install`
 - `npm run build`

If you're using Windows, run:
 - `npm run build.windows` instead of `npm run build`
 - You will have to install [cwRsync](https://en.wikipedia.org/wiki/CwRsync) because one of
 the scripts requires `rsync`

To update your fork and prepare it for local usage:
 - `git pull upstream development`
 - `rm -rf node_modules`
 - `npm install`
 - `npm run build`

To run the demo:
 - `npm run demo.serve` _*// to serve local demo. This is for testing only, without watchers.*_

For local development run:
 - `npm run build.watch` _*// in first terminal*_
 - `ng serve` _*// in second*_

If you want to run the demo with Angular Universal:
 - `npm run demo.serve-universal`

## Compatibility

The only two dependencies are [Angular](https://angular.io) and [Bootstrap](https://getbootstrap.com) CSS.
Here is the versions compatibility list:

| ngx-bootstrap |    Angular    |  Bootstrap CSS |
| ------------- | ------------- | -------------- |
| 6.0.0         | 9.x.x - 10.x.x | 3.x.x or 4.x.x |
| 5.6.x         | 7.x.x - 9.1.0 | 3.x.x or 4.x.x |
| 5.0.0 - 5.6.0 | 7.x.x - 8.x.x | 3.x.x or 4.x.x |
| 4.x.x         | 6.x.x - 7.x.x | 3.x.x or 4.x.x |
| 3.x.x         | 6.x.x - 7.x.x | 3.x.x or 4.x.x |
| 2.x.x         | 2.x.x - 4.x.x | 3.x.x or 4.x.x |
| 1.x.x         |     2.x.x     | 3.x.x or 4.x.x |


## Troubleshooting

So if you are in trouble, here's where you can look for help.

The best place to ask questions is on [StackOverflow (under the `ngx-bootstrap` tag)](https://stackoverflow.com/questions/tagged/ngx-bootstrap)
You can also join [our Slack channel](https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY) and link your stackoverflow question there. But try to avoid asking generic help questions directly on Slack since they can easily get lost in the chat. You can also [search among the existing GitHub issues](https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue).

If, **and only if**, none of the above helped, please open a [new issue](https://github.com/valor-software/ngx-bootstrap/issues/new).

## Contribution

All contributions very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

Please read our [contribution guidelines](https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md).

### If you need more modules, check [here](https://github.com/valor-software/ng2-plans)

Please read central `ngx` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach.

### Credits
Crossbrowser testing sponsored by [Saucelabs](https://saucelabs.com/)
[<img src="https://avatars2.githubusercontent.com/u/88837?s=200&v=4" alt="Saucelabs" width="31" height="31">](https://saucelabs.com/)

End-to-end testing sponsored by [Cypress](https://www.cypress.io/)
[<img src="https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/favicon/favicon.ico" alt="Cypress" width="31" height="31">](https://www.cypress.io/)

### License

[MIT](https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE)
