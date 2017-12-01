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
7. [License](#license)

# Getting Started

ngx-bootstrap contains all core (and not only) Bootstrap components powered by Angular. So you don't need to include original JS components, but we are using markup and css provided by Bootstrap.

# Installation instructions

Install `ngx-bootstrap` from `npm`
```bash
npm install ngx-bootstrap --save
```

You will need bootstrap styles (Bootstrap 3)

```
<!-- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

Or Bootstrap 4
```
<!--- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" rel="stylesheet">
```
To enable bootstrap 4 theme templates in ngx-bootstrap, please read
[this](https://github.com/valor-software/ngx-bootstrap/blob/development/docs/getting-started/bootstrap4.md) .

# Usage & Demo

Main source of API documentation and usage scenarios available here:
[https://valor-software.com/ngx-bootstrap/](https://valor-software.com/ngx-bootstrap/)

Additionally you can find demos and docs deployed from latest code with <a href="https://ngx-bootstrap.surge.sh/">angular v4</a> and <a
  href="https://ngx-bootstrap-latest.surge.sh/">angular v5</a>

Server side rendered version of this documentation available <a href="https://ngx-universal.herokuapp.com/">here</a>

# API
Check demo page for API [reference](https://valor-software.com/ngx-bootstrap/)

## How to use it with:
 - `angular-cli` please refer to [getting-started-with-ng-cli](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/ng-cli.md)
 - `angular-seed` please refer to [getting-started-with-angular-seed](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/angular-seed.md)
 - `system.js` (and [angular2 quickstart](https://angular.io/docs/ts/latest/quickstart.html)) please checkout [sample repository](https://github.com/valor-software/angular2-quickstart)
 - `plnkr` sample available [here](http://bit.ly/ngx-bootstrap-plnkr)
 - `AoT using ngc and rollup` please refer to [ngx-bootstrap-with-aot](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/aot.md)
 - `Bootstrap 4 and angular-cli` please refer to [using-with-bootstrap-4-and-angular-cli](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/bootstrap4.md)

# How to build lib for development

First time
 - clone repository
 - `npm install`
 - `npm run test` it will build the lib and create a link in `node_modules`

 To run bootstrap 3 and 4 demo:
 - `npm run demo.serve` to serve local demo. This is for testing only, without watchers.

 For local development run
 - `npm run build.watch` in first terminal
 - `ng serve` in second

  If you want to run the demo with Angular Universal:
  - `npm run demo.serve-universal`

# Troubleshooting

So if you are in trouble, here's where you can look for help.

The best place to ask questions is on [StackOverflow (under the `ngx-bootstrap` tag)](https://stackoverflow.com/questions/tagged/ngx-bootstrap)
You can also join [our Slack channel](https://ngx-slack.herokuapp.com/) and link your stackoverflow question there. But try to avoid asking generic help questions directly on Slack since they can easily get lost in the chat. You can also [search among the existing GitHub issues](https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue).

If, **and only if**, none of the above helped, please open a [new issue](https://github.com/valor-software/ngx-bootstrap/issues/new).

# Contribution

Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

Please read our [contribution guidelines](https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md).

## If you need more modules check [here](https://github.com/valor-software/ng2-plans)

Please read central `ngx` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach

## Credits
Crossbrowser testing sponsored by [Browser Stack](https://www.browserstack.com)
[<img src="https://camo.githubusercontent.com/a7b268f2785656ab3ca7b1cbb1633ee5affceb8f/68747470733a2f2f64677a6f7139623561736a67312e636c6f756466726f6e742e6e65742f70726f64756374696f6e2f696d616765732f6c61796f75742f6c6f676f2d6865616465722e706e67" alt="Browser Stack" height="31px" style="background: cornflowerblue;">](https://www.browserstack.com)
