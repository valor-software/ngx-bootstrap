/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES;
import "../../../lib/index.dart" show pagination;

// webpack html imports
var template = require("./pagination-demo.html");

@Component(selector: "pagination-demo")
@View(
    template: template,
    directives: const [pagination, FORM_DIRECTIVES, CORE_DIRECTIVES])
class PaginationDemo {
  num totalItems = 64;
  num currentPage = 4;
  num maxSize = 5;
  num bigTotalItems = 175;
  num bigCurrentPage = 1;
  void setPage(num pageNo) {
    this.currentPage = pageNo;
  }

  void pageChanged() {
    console.log("Page changed to: " + this.currentPage);
  }
}
