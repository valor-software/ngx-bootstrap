# ngx-bootstrap [![npm version](https://badge.fury.io/js/ngx-bootstrap.svg)](http://badge.fury.io/js/ngx-bootstrap) [![npm downloads](https://img.shields.io/npm/dm/ng2-bootstrap.svg)](https://npmjs.org/ngx-bootstrap)[![slack](https://ngx-slack.herokuapp.com/badge.svg)](https://ngx-slack.herokuapp.com)

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/valor-software/ngx-bootstrap.svg?branch=master)](https://travis-ci.org/valor-software/ngx-bootstrap)
[![codecov](https://codecov.io/gh/valor-software/ngx-bootstrap/branch/development/graph/badge.svg)](https://codecov.io/gh/valor-software/ngx-bootstrap)
[![Dependency Status](https://david-dm.org/valor-software/ngx-bootstrap.svg)](https://david-dm.org/valor-software/ngx-bootstrap)

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
    
Additionally to allow reach experience while working with Dates we are using [moment.js](http://momentjs.com/), de facto base date manipulation library at the moment.

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
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet">
```
To enable bootstrap 4 theme templates in ngx-bootstrap, please read
[here](https://github.com/valor-software/ngx-bootstrap/blob/development/docs/getting-started/bootstrap4.md)

```
<!-- index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```


## How to use it with:
 - `angular-cli` please refer to [getting-started-with-ng-cli](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/ng-cli.md)
 - `angular-seed` please refer to [getting-started-with-angular-seed](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/angular-seed.md)
 - `system.js` (and [angular quickstart](https://angular.io/docs/ts/latest/quickstart.html)) please checkout [sample repository](https://github.com/valor-software/angular2-quickstart) 
 - `plnkr` sample available [here](http://bit.ly/ng2-bootstrap-plnkr)
 - `AoT using ngc and rollup` please refer to [ngx-bootstrap-with-aot](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/aot.md)
 - `Bootstrap 4 and angular-cli` please refer to [using-with-bootstrap-4-and-angular-cli](https://github.com/valor-software/ngx-bootstrap/tree/development/docs/getting-started/bootstrap4.md)

# Usage & Demo

Main source of API documentation and usage scenarious available here: 
[http://valor-software.github.io/ngx-bootstrap/](http://valor-software.github.io/ngx-bootstrap/)

# API
Check demo page for API [reference](http://valor-software.github.io/ngx-bootstrap/)

# Troubleshooting

So you are in trouble, where to get help:
- you can search and ask for help at [StackOverflow](https://stackoverflow.com/questions/tagged/ngx-bootstrap)
- you can join [gitter](https://gitter.im/valor-software/ngx-bootstrap) or [slack](https://ngx-slack.herokuapp.com/) and ask a question ( response in slack will be faster )
- if none of this helped please [search](https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue) and only then open new issue

# Contribution

Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance! 

## If you need more modules check [here](https://github.com/valor-software/ng2-plans)

Please read central `ngx` modules [readme](https://github.com/valor-software/ng2-plans) for details, plans and approach

## Credits
Crossbrowser testing sponsored by [Browser Stack](https://www.browserstack.com)
[<img src="https://camo.githubusercontent.com/a7b268f2785656ab3ca7b1cbb1633ee5affceb8f/68747470733a2f2f64677a6f7139623561736a67312e636c6f756466726f6e742e6e65742f70726f64756374696f6e2f696d616765732f6c61796f75742f6c6f676f2d6865616465722e706e67" alt="Browser Stack" height="31px" style="background: cornflowerblue;">](https://www.browserstack.com)
