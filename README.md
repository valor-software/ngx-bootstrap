<a href="http://valor-software.com/ngx-bootstrap/#/">
    <h1 align="center">ngx-bootstrap</h1>
</a>

<p align="center">
Best way to quickly integrate <a href="https://getbootstrap.com/">Bootstrap 3</a> or <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4</a> Components with <a href="https://angular.io/">Angular</a>
</p>

<p align="center">
<a href="https://badge.fury.io/js/ngx-bootstrap"><img src="https://badge.fury.io/js/ngx-bootstrap.svg" alt="npm version" ></a>
<a href="https://npmjs.org/ngx-bootstrap"><img src="https://img.shields.io/npm/dm/ngx-bootstrap.svg" alt="npm downloads" ></a>
<a href="https://travis-ci.org/valor-software/ngx-bootstrap"><img alt="" src="https://travis-ci.org/valor-software/ngx-bootstrap.svg?branch=development"></a>

<br/>
<a href="https://ngx-slack.herokuapp.com"><img src="https://ngx-slack.herokuapp.com/badge.svg" alt="slack" ></a>
</p>

## Links

- [Documentation](http://valor-software.com/ngx-bootstrap/)
- [Release Notes](https://github.com/valor-software/ngx-bootstrap/blob/development/CHANGELOG.md)
- [Slack Community](https://ngx-slack.herokuapp.com)

<!-- [![codecov](https://codecov.io/gh/valor-software/ngx-bootstrap/branch/development/graph/badge.svg)](https://codecov.io/gh/valor-software/ngx-bootstrap) -->

<!-- [![NPM](https://nodei.co/npm/ngx-bootstrap.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-bootstrap)
[![NPM](https://nodei.co/npm-dl/ngx-bootstrap.png?height=3&months=6)](https://npmjs.org/ngx-bootstrap)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/valorkin.svg)](https://saucelabs.com/u/valorkin)
-->

## Table of contents
1. [Getting Started](#getting-started)
2. [Installation instructions](#installation-instructions)
3. [Usage & Demo](#usage--demo)
4. [API](#api)
5. [Troubleshooting](#troubleshooting)
6. [Contributing](#contribution)

## Getting Started

ngx-bootstrap contains all core (and not only) Bootstrap components powered by Angular. So you don't need to include original JS components, but we are using markup and css provided by Bootstrap.

## Installation instructions

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
### Setting up the bootstrap version manually
Sometimes, your project might contain some library that could interfear with the bootstrap framework, or you might have a customized version of bootstrap. The consequence is that the process of determining bootstrap version might be failed, which can break the UI. In that case, we can still set the bootstrap version manually in the boostraping component (i.e. `AppComonent`):
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
[https://valor-software.com/ngx-bootstrap/](https://valor-software.com/ngx-bootstrap/)

Additionally you can find demos and docs deployed from latest code with <a href="https://ngx-bootstrap.surge.sh/">angular v4</a> and <a
  href="https://ngx-bootstrap-latest.surge.sh/">angular v5</a>

Server side rendered version of this documentation available <a href="https://ngx-universal.herokuapp.com/">here</a>

## API
Check demo page for API [reference](https://valor-software.com/ngx-bootstrap/)

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
 - `npm run test`

To update your fork and prepare it for local usage:
 - `git pull upstream development`
 - `rm -rf node_modules`
 - `npm install`
 - `npm run test` _*// it will build the lib, create a link in node_modules and run package's "test" script*_

To run the demo:
 - `npm run demo.serve` _*// to serve local demo. This is for testing only, without watchers.*_

For local development run:
 - `npm run build.watch` _*// in first terminal*_
 - `ng serve` _*// in second*_

If you want to run the demo with Angular Universal:
 - `npm run demo.serve-universal`

## Troubleshooting

So if you are in trouble, here's where you can look for help.

The best place to ask questions is on [StackOverflow (under the `ngx-bootstrap` tag)](https://stackoverflow.com/questions/tagged/ngx-bootstrap)
You can also join [our Slack channel](https://ngx-slack.herokuapp.com/) and link your stackoverflow question there. But try to avoid asking generic help questions directly on Slack since they can easily get lost in the chat. You can also [search among the existing GitHub issues](https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue).

If, **and only if**, none of the above helped, please open a [new issue](https://github.com/valor-software/ngx-bootstrap/issues/new).

## Contribution

Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

Please read our [contribution guidelines](https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md).

### If you need more modules check [here](https://github.com/valor-software/ng2-plans)

Please read central `ngx` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach

### Credits
Crossbrowser testing sponsored by [Browser Stack](https://www.browserstack.com)
[<img src="https://camo.githubusercontent.com/a7b268f2785656ab3ca7b1cbb1633ee5affceb8f/68747470733a2f2f64677a6f7139623561736a67312e636c6f756466726f6e742e6e65742f70726f64756374696f6e2f696d616765732f6c61796f75742f6c6f676f2d6865616465722e706e67" alt="Browser Stack" height="31px" style="background: cornflowerblue;">](https://www.browserstack.com)

### License

MIT
