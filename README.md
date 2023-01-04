<a href="http://valor-software.com/ngx-bootstrap/#/">
<div align="center">
<img class="mx-auto center-block d-block" src="https://valor-software.com/ngx-bootstrap/assets/images/logos/ngx-bootstrap-logo.svg" alt="ngx-bootstrap" width="200" height="200">
    <h1>ngx-bootstrap</h1>
</div>
</a>

<p align="center">
The best way to quickly integrate <a href="https://getbootstrap.com/docs/5.2">Bootstrap 5</a> <a href="https://getbootstrap.com/docs/4.0">Bootstrap 4</a> Components with <a href="https://angular.io/">Angular</a>
<br/>
<br/>
<i><strong>Note: </strong>ngx-bootstrap for <a href="https://getbootstrap.com/docs/3.3/">Bootstrap 3</a> is still available but is no longer maintained or updated.</i>
development
</p>

<p align="center">
<a href="https://npmjs.org/ngx-bootstrap"><img src="https://img.shields.io/npm/v/ngx-bootstrap/latest.svg" alt="npm latest version" ></a>
<a href="https://npmjs.org/ngx-bootstrap"><img src="https://img.shields.io/npm/v/ngx-bootstrap/next.svg" alt="npm next version" ></a>
<br/>
<a href="https://github.com/valor-software/ngx-bootstrap/actions/workflows/on-push-or-pull.yml"><img src="https://github.com/valor-software/ngx-bootstrap/actions/workflows/on-push-or-pull.yml/badge.svg" alt="npm version" ></a>
<a href="https://npmjs.org/ngx-bootstrap"><img src="https://img.shields.io/npm/dm/ngx-bootstrap.svg" alt="npm downloads" ></a>
<a target="_blank" href="https://opencollective.com/ngx-bootstrap"><img src="https://opencollective.com/ngx-bootstrap/tiers/backer/badge.svg?label=backer&color=brightgreen" /></a>

<br/>
<a href="https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY">
<img src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-btwjnu/Slack_RGB.png?width=1200&height=150" alt="slack" ></a>

</p>

## Links

- [Documentation](http://valor-software.com/ngx-bootstrap/)
- [Release Notes](https://github.com/valor-software/ngx-bootstrap/blob/development/CHANGELOG.md)
- [Slack Community](https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY)

<!-- [![codecov](https://codecov.io/gh/valor-software/ngx-bootstrap/branch/development/graph/badge.svg)](https://codecov.io/gh/valor-software/ngx-bootstrap) -->

<!-- [![Sauce Test Status](https://saucelabs.com/browser-matrix/valorkin.svg)](https://saucelabs.com/u/valorkin)
-->

## Table of contents
1. [Getting Started](#getting-started)
2. [Usage & Demo](#usage--demo)
3. [Supporting](#supporting-ngx-bootstrap)
4. [Installation](#installation)
5. [Compatibility](#compatibility)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contribution)
8. [Credits](#credits)
9. [License](#license)
10. [Valor Can Help](#valor-software-can-help)

## Getting Started

ngx-bootstrap provides Bootstrap components powered by Angular, so you don't need to include original JS components.

Check our [Getting started guide](https://valor-software.com/ngx-bootstrap/#/documentation#getting-started) if it's your 
first project with Angular Bootstrap.

## Usage & Demo

Bootstrap components for Angular applications, dozens of demos and API documentation could be found here:
[https://valor-software.com/ngx-bootstrap/](https://valor-software.com/ngx-bootstrap/).

<!-- Server side rendered version of this documentation available <a href="https://ngx-universal.herokuapp.com/">here</a> 
served with Angular universal and [nest.js](https://nestjs.com/). -->

## Supporting ngx-bootstrap
ngx-bootstrap is an Open Source (MIT Licensed) project, it's an independent project with ongoing development made possible 
thanks to the support of our awesome backers.
If you also would like to show support or simply give back to Open Source community, please consider becoming a backing 
sponsor of [ngx-bootstrap on OpenCollective](https://opencollective.com/ngx-bootstrap).

All donated funds are managed transparently on OpenCollective and will be used solely for compensating work and expenses 
for contributors. Valor Software employees and contractors are not eligible for use of these funds.

What's in it for you? Proper recognition and exposure of your name/logo/website on our page.
Our main sponsors will be presented under this section! Be the first!

## Installation
You can see the below simple example working on [StackBlitz](https://stackblitz.com/edit/vs-ngx-bootstrap-tooltip?file=src%2Findex.html)

##### Angular CLI way
Use the Angular CLI ng add command for updating your Angular project.
```bash
ng add ngx-bootstrap
```

##### Manual way
Install `ngx-bootstrap` from `npm`:
```bash
npm install ngx-bootstrap --save
```

Add wanted package to NgModule imports:
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

You will need to add bootstrap css:
This can be done with the css file directly in the index.html, or alternatively through a styles import in the 
`angular.json` file or via `styles.scss` import. However the latter two options require additionally installing bootstrap via npm.
- `Bootstrap 5`
```
<!--- index.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
```

- `Bootstrap 4`
```
<!--- index.html -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2">
```

### Setting up the bootstrap version manually

As you may know `ngx-bootstrap` supports several `bootstrap.css` versions at the same time and has automatic tool 
to guess current used version of library, but if this guess fails you can specify version of `bootstrap.css` manually. 

Sometimes, your project might contain some library that could interfere with the bootstrap framework, or you might
have a customized version of bootstrap. The consequence is that the process of determining bootstrap version might 
be failed, which can break the UI. In that case, we can still set the bootstrap version manually in the bootstrapping 
component (i.e. `AppComponent`):
```
import { setTheme } from 'ngx-bootstrap/utils';

@Component({...})
export class AppComponent {
  constructor() {
    setTheme('bs5'); // or 'bs4'
    ...
  }
}
```

### How to build lib for development

First time:

```bash
git clone https://github.com/valor-software/ngx-bootstrap.git
cd ngx-bootstrap
npm ci
npm run build
npm start
```

## Compatibility

The only two dependencies are [Angular](https://angular.io) and [Bootstrap](https://getbootstrap.com) CSS.
Here is the version compatibility list:

| ngx-bootstrap | Angular         | Bootstrap CSS  |
|---------------|-----------------|----------------|
| 10.x.x        | 15.x.x | 5.x.x or 4.x.x |
| 9.0.0         | 14.x.x          | 5.x.x or 4.x.x or 3.x.x |
| 8.0.0         | 12.x.x - 13.x.x | 5.x.x or 4.x.x or 3.x.x |
| 7.1.0         | 11.x.x - 12.x.x | 5.x.x or 4.x.x or 3.x.x |
| 7.0.0         | 11.x.x - 12.x.x | 3.x.x or 4.x.x |
| 6.0.0         | 9.x.x - 10.x.x  | 3.x.x or 4.x.x |
| 5.6.x         | 7.x.x - 9.1.0   | 3.x.x or 4.x.x |
| 5.0.0 - 5.6.0 | 7.x.x - 8.x.x   | 3.x.x or 4.x.x |
| 4.x.x         | 6.x.x - 7.x.x   | 3.x.x or 4.x.x |
| 3.x.x         | 6.x.x - 7.x.x   | 3.x.x or 4.x.x |
| 2.x.x         | 2.x.x - 4.x.x   | 3.x.x or 4.x.x |
| 1.x.x         | 2.x.x           | 3.x.x or 4.x.x |


## Troubleshooting

So if you are in trouble, here's where you can look for help.

The best place to ask questions is on [StackOverflow (under the `ngx-bootstrap` tag)](https://stackoverflow.com/questions/tagged/ngx-bootstrap) 
where there is a strong community of individuals asking and answering questions. 

You can also join [our Slack channel](https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY) and link your stackoverflow question there. But try to avoid asking generic help questions directly on Slack since they can easily get lost in the chat. You can also [search among the existing GitHub issues](https://github.com/valor-software/ngx-bootstrap/issues?utf8=%E2%9C%93&q=is%3Aissue).

If none of the above helped, please feel free to open a [new issue](https://github.com/valor-software/ngx-bootstrap/issues/new).

## Contribution

All contributions very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

Please read our [contribution guidelines](https://github.com/valor-software/ngx-bootstrap/blob/development/CONTRIBUTING.md).

### Credits
Crossbrowser testing sponsored by [Saucelabs](https://saucelabs.com/)
[<img src="https://avatars2.githubusercontent.com/u/88837?s=200&v=4" alt="Saucelabs" width="31" height="31">](https://saucelabs.com/)

End-to-end testing sponsored by [Cypress](https://www.cypress.io/)
[<img src="https://raw.githubusercontent.com/cypress-io/cypress-icons/master/src/favicon/favicon.ico" alt="Cypress" width="31" height="31">](https://www.cypress.io/)

### License

[MIT](https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE)

### Valor Software Can Help

At [Valor Software](https://valor-software.com/) our people are not resources, our people are human beings, helping to create a better world through our efforts and knowledge. 
We are here to assist you with your project.  We have a wonderful, ever-growing team that is ready and able.  If you're looking for someone to guide you and your team
please feel free to reach out to us on our site or at sales@valor-software.com, we would love to chat.
