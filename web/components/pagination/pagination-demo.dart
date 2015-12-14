import "package:angular2/angular2.dart";
import "package:ng2_strap/pagination/pagination.dart";

@Component(selector: "pagination-demo")
@View(
    templateUrl: "pagination-demo.html",
    directives: const [PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES])
class PaginationDemo {
  int totalItems = 64;
  int currentPage = 4;
  int maxSize = 5;
  int bigTotalItems = 175;
  int bigCurrentPage = 1;
  int smallnumPages = 3;
  int numPages = 4;
  void setPage(int pageNo) {
    currentPage = pageNo;
  }

  void pageChanged() {
    print("Page changed to: $currentPage");
  }
}
