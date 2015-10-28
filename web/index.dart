import "package:angular2/angular2.dart";
import "package:ng2-strap/index.dart";
import 'package:angular2/bootstrap.dart';
import 'dart:html';
import 'package:markdown/markdown.dart' hide Element;

import "components/demo-header.dart";
import "components/demo-section.dart";
import 'components/accordion/accordion-demo.dart';
import 'components/alert/alert-demo.dart';
import 'components/buttons/buttons-demo.dart';
import 'components/carousel/carousel-demo.dart';
import 'components/datepicker/datepicker-demo.dart';
import 'components/collapse/collapse-demo.dart';
import 'components/dropdown/dropdown-demo.dart';
import 'components/pagination/pagination-demo.dart';
import 'components/progressbar/progressbar-demo.dart';
import 'components/rating/rating-demo.dart';
import 'components/tabs/tabs-demo.dart';
import 'components/typeahead/typeahead-demo.dart';
import 'components/tooltip/tooltip-demo.dart';
import 'components/timepicker/timepicker-demo.dart';

@Component(
    selector: "app",
    templateUrl: 'demo.html',
    directives: const [
      NgClass,
      DemoHeader,
      DemoSection,
      AccordionDemo,
      AlertDemo,
      ButtonsDemo,
      CarouselDemo,
      CollapseDemo,
      DatepickerDemo,
      DropdownDemo,
      PaginationDemo,
      ProgressbarDemo,
      RatingDemo,
      TabsDemo,
      TimepickerDemo,
      TooltipDemo,
      TypeaheadDemo
    ])
class Demo implements OnInit {
  bool isBs3 = Ng2BootstrapConfig.theme == Ng2BootstrapTheme.BS3;

  ViewContainerRef viewRef;

  Demo(@Inject(ViewContainerRef) this.viewRef);
  @override
  onInit() {
    HttpRequest.getString('./getting-started.md').then((result) {
      (viewRef.element.nativeElement as Element).querySelector('#getting-started').innerHtml = markdownToHtml(result);
    });
  }
}

main() {
//var gettingStarted = require("./getting-started.md");
//  var w = window;
//  if (w && identical(w.___theme, "bs4")) {
//    Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;
//  }
  bootstrap(Demo);
}