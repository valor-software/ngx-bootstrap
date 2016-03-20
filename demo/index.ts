/// <reference path="../typings/browser.d.ts" />
import {
  Component, enableProdMode,
} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';

import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';

// todo: enable prod mod only for prod build
enableProdMode();

let w:any = window;
if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}


import {AccordionSection} from './components/accordion-section';
import {AlertSection} from './components/alert-section';
import {ButtonsSection} from './components/buttons-section';
import {CarouselSection} from './components/carousel-section';
import {CollapseSection} from './components/collapse-section';
import {DatepickerSection} from './components/datepicker-section';
import {DropdownSection} from './components/dropdown-section';
import {PaginationSection} from './components/pagination-section';
import {ProgressbarSection} from './components/progressbar-section';
import {RatingSection} from './components/rating-section';
import {TabsSection} from './components/tabs-section';
import {TimepickerSection} from './components/timepicker-section';
import {TooltipSection} from './components/tooltip-section';
import {TypeaheadSection} from './components/typeahead-section';

import {DemoHeader} from './components/demo-header';

let gettingStarted = require('./getting-started.md');

@Component({
  selector: 'app',
  template: `
  <demo-header>Loading header</demo-header>
  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-bootstrap</h1>
      <p>Native Angular2 directives for Bootstrap</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-bootstrap">View on GitHub</a>
      <div class="row">
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
      </div>
    </div>
  </main>

  <div class="container">
    <h1 id="overview" class="page-header">
      ng2-bootstrap available with:
      <a class="btn btn-default btn-secondary btn-lg" [ngClass]="{active: isBs3}" href="./">Bootstrap 3</a>
      <a class="btn btn-default btn-secondary btn-lg" [ngClass]="{active: !isBs3}" href="./index-bs4.html">Bootstrap 4</a>
    </h1>
    
    <section id="getting-started">${gettingStarted}</section>

    <accordion-section></accordion-section>
    <alert-section></alert-section>
    <buttons-section></buttons-section>
    <carousel-section></carousel-section>
    <collapse-section></collapse-section>
    <datepicker-section></datepicker-section>
    <dropdown-section></dropdown-section>
    <pagination-section></pagination-section>
    <progressbar-section></progressbar-section>
    <rating-section></rating-section>
    <tabs-section></tabs-section>
    <timepicker-section></timepicker-section>
    <tooltip-section></tooltip-section>
    <typeahead-section></typeahead-section>
  </div>

  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center">
        <a href="https://github.com/valor-software/ng2-bootstrap">ng2-bootstrap</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.
      </p>
    </div>
  </footer>
  `,
  directives: [
    CORE_DIRECTIVES,
    DemoHeader,

    AccordionSection,
    AlertSection,
    ButtonsSection,
    CarouselSection,
    CollapseSection,

    // todo: fix it to much write value calls!!!
    DatepickerSection,

    DropdownSection,
    PaginationSection,
    ProgressbarSection,
    RatingSection,
    TabsSection,
    TimepickerSection,
    TooltipSection,
    TypeaheadSection
  ]
})
export class Demo {
  private isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
}

bootstrap(Demo);
