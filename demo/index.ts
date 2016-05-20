import {Component, enableProdMode} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from '../ng2-bootstrap';
import {AccordionSectionComponent} from './components/accordion-section';
import {AlertSectionComponent} from './components/alert-section';
import {ButtonsSectionComponent} from './components/buttons-section';
import {CarouselSectionComponent} from './components/carousel-section';
import {CollapseSectionComponent} from './components/collapse-section';
import {DatepickerSectionComponent} from './components/datepicker-section';
import {DropdownSectionComponent} from './components/dropdown-section';
import {ModalSectionComponent} from './components/modal-section';
import {PaginationSectionComponent} from './components/pagination-section';
import {ProgressbarSectionComponent} from './components/progressbar-section';
import {RatingSectionComponent} from './components/rating-section';
import {TabsSectionComponent} from './components/tabs-section';
import {TimepickerSectionComponent} from './components/timepicker-section';
import {TooltipSectionComponent} from './components/tooltip-section';
import {TypeaheadSectionComponent} from './components/typeahead-section';
import {DemoHeaderComponent} from './components/demo-header';

// todo: enable prod mod only for prod build
// if (false) {
enableProdMode();
// }

let w:any = window;
if (w && w.__theme === 'bs4') {
  Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
}

let gettingStarted = require('./getting-started.md');

@Component({
  selector: 'app',
  template: `
  <!--<demo-header>Loading header</demo-header>-->
<!--  <main class="bd-pageheader">
    <div class="container">
      <h1>ng2-bootstrap</h1>
      <p>Native Angular2 directives for Bootstrap</p>
      <a class="btn btn-primary" href="https://github.com/valor-software/ng2-bootstrap">View on GitHub</a>
      <div class="row">
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
        <div class="col-lg-1"><iframe src="https://ghbtns.com/github-btn.html?user=valor-software&repo=ng2-bootstrap&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
      </div>
    </div>
  </main>-->

  <div class="container">
    <!--<h1 id="overview" class="page-header">-->
      <!--ng2-bootstrap available with:-->
      <!--<a class="btn btn-default btn-secondary btn-lg" [ngClass]="{active: isBs3}" href="./">Bootstrap 3</a>-->
      <!--<a class="btn btn-default btn-secondary btn-lg" [ngClass]="{active: !isBs3}" href="./index-bs4.html">Bootstrap 4</a>-->
    <!--</h1>-->
    
    <!--<section id="getting-started">${gettingStarted}</section>-->

    <accordion-section></accordion-section>
    <alert-section></alert-section>
    <buttons-section></buttons-section>
    <carousel-section></carousel-section>
    <collapse-section></collapse-section>
    <datepicker-section></datepicker-section>
    <dropdown-section></dropdown-section>
    <modal-section></modal-section>
    <pagination-section></pagination-section>
    <progressbar-section></progressbar-section>
    <rating-section></rating-section>
    <tabs-section></tabs-section>
    <timepicker-section></timepicker-section>
    <tooltip-section></tooltip-section>
    <typeahead-section></typeahead-section>
  </div>

  <!--<footer class="footer">-->
    <!--<div class="container">-->
      <!--<p class="text-muted text-center">-->
        <!--<a href="https://github.com/valor-software/ng2-bootstrap">ng2-bootstrap</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.-->
      <!--</p>-->
    <!--</div>-->
  <!--</footer>-->
  `,
  directives: [
    CORE_DIRECTIVES,
    // DemoHeaderComponent,

    // AccordionSectionComponent,
    // AlertSectionComponent,
    // ButtonsSectionComponent,
    // CarouselSectionComponent,
    // CollapseSectionComponent,

    // todo: fix it to much write value calls!!!
    // DatepickerSectionComponent,
    //
    // DropdownSectionComponent,
    ModalSectionComponent,
    // PaginationSectionComponent,
    // ProgressbarSectionComponent,
    // RatingSectionComponent,
    // TabsSectionComponent,
    // TimepickerSectionComponent,
    // TooltipSectionComponent,
    // TypeaheadSectionComponent
  ]
})
export class DemoComponent {
  public isBs3:boolean = Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS3;
}

bootstrap(DemoComponent);
