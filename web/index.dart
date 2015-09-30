import "package:angular2/angular2.dart";
import "package:ng2-strap/index.dart";

import "components/accordion-section.dart";
import "components/alert-section.dart";
import "components/buttons-section.dart";
import "components/carousel-section.dart";
import "components/collapse-section.dart";
import "components/datepicker-section.dart";
import "components/demo-header.dart";
import "components/dropdown-section.dart";
import "components/pagination-section.dart";
import "components/progressbar-section.dart";
import "components/rating-section.dart";
import "components/tabs-section.dart";
import "components/timepicker-section.dart";
import "components/tooltip-section.dart";
import "components/typeahead-section.dart";

@Component (selector: "app")
@View (template: '''
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
    <div class="col-md-12 card card-block panel panel-default">
      <selection>
          <h1>ng2-bootstrap available with:
          <a class="btn btn-default btn-secondary btn-lg" [ng-class]="{active: isBs3}" href="./">Bootstrap 3</a>
          <a class="btn btn-default btn-secondary btn-lg" [ng-class]="{active: !isBs3}" href="./index-bs4.html">Bootstrap 4</a>
          </h1>
      </selection>
    </div>
    <br>
    <section id="getting-started">\${gettingStarted}</section>

    <accordion-section class="col-md-12"></accordion-section>
    <alert-section class="col-md-12"></alert-section>
    <buttons-section class="col-md-12"></buttons-section>
    <carousel-section class="col-md-12"></carousel-section>
    <collapse-section class="col-md-12"></collapse-section>
    <datepicker-section class="col-md-12"></datepicker-section>
    <dropdown-section class="col-md-12"></dropdown-section>
    <pagination-section class="col-md-12"></pagination-section>
    <progressbar-section class="col-md-12"></progressbar-section>
    <rating-section class="col-md-12"></rating-section>
    <tabs-section class="col-md-12"></tabs-section>
    <timepicker-section class="col-md-12"></timepicker-section>
    <tooltip-section class="col-md-12"></tooltip-section>
    <typeahead-section class="col-md-12"></typeahead-section>
  </div>

  </div>
  <footer class="footer">
    <div class="container">
      <p class="text-muted text-center"><a href="https://github.com/valor-software/ng2-bootstrap">ng2-bootstrap</a> is maintained by <a href="https://github.com/valor-software">valor-software</a>.</p>
    </div>
  </footer>
  ''',
    directives: const [
      NgClass,
      DemoHeader,
      AccordionSection,
      AlertSection,
      ButtonsSection,
      CarouselSection,
      CollapseSection,
      DatepickerSection,
      DropdownSection,
      PaginationSection,
      ProgressbarSection,
      RatingSection,
      TabsSection,
      TimepickerSection,
      TooltipSection,
      TypeaheadSection
    ])
class Demo {
  bool isBs3 = identical(Ng2BootstrapConfig.theme, Ng2BootstrapTheme.BS3);
}

main() {
//var gettingStarted = require("./getting-started.md");
//  var w = window;
//  if (w && identical(w.___theme, "bs4")) {
//    Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
//  }
  bootstrap(Demo);
}