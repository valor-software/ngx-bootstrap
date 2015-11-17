import "package:angular2/angular2.dart";
import 'dart:html';
import 'dart:math';
import 'package:node_shims/js.dart';
// todo: extract base functionality classes

// todo: expose an option to change default configuration

// todo: solve problem with .pagination-sm>li:first-child>a and <template/> from ng-if >.<
const _PAGINATION_CONFIG = const {
  "maxSize" : null,
  "itemsPerPage" : 10,
  "boundaryLinks" : false,
  "directionLinks" : true,
  "firstText" : "First",
  "previousText" : "Previous",
  "nextText" : "Next",
  "lastText" : "Last",
  "rotate" : true
};

@Component (selector: "pagination[ng-model], [pagination][ng-model]",
    inputs: const [
      "rotate",
      "disabled",
      "totalItems",
      "itemsPerPage",
      "maxSize",
      "boundaryLinks",
      "directionLinks",
      "firstText",
      "previousText",
      "nextText",
      "lastText"
    ],
    outputs: const ["numPages"])
@View (template: '''
  <ul class="pagination" [ng-class]="classMap">
    <li class="pagination-first"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(1, \$event)">{{firstText}}</a>
    </li>

    <li class="pagination-prev"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page - 1, \$event)">{{previousText}}</a>
      </li>

    <li *ng-for="#page of pages" [ng-class]="{active: page['active'], disabled: disabled && !page['active']}" class="pagination-page">
      <a href (click)="selectPage(page['number'], \$event)">{{page['text']}}</a>
    </li>

    <li class="pagination-next"
        [ng-class]="{disabled: noNext()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page + 1, \$event)">{{nextText}}</a></li>

    <li class="pagination-last"
        [ng-class]="{disabled: noNext()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(totalPages, \$event)">{{lastText}}</a></li>
  </ul>
  ''',
    directives: const [ CORE_DIRECTIVES, NgClass],
    encapsulation: ViewEncapsulation.None)
class Pagination extends DefaultValueAccessor implements OnInit {
  Pagination(this.ngModel, Renderer renderer, ElementRef elementRef)
      : super (renderer, elementRef) {
    this.elementRef = elementRef;
    ngModel.valueAccessor = this;
  }

  NgModel ngModel;

  Map config;

  String classMap;

  num maxSize;

  bool rotate = true;

  dynamic boundaryLinks = false;

  // labels
  String firstText = "First";

  String previousText = "Previous";

  String nextText = "Next";

  String lastText = "Last";

  bool disabled = false;

  bool directionLinks = true;

  EventEmitter numPages = new EventEmitter ();

  int _itemsPerPage = 10;

  int _totalItems = 10;

  int _totalPages = 10;

  get itemsPerPage => _itemsPerPage;

  set itemsPerPage(int v) {
    _itemsPerPage = v;
    totalPages = calculateTotalPages();
  }

  int get totalItems => _totalItems;

  set totalItems(int v) {
    _totalItems = v;
    totalPages = calculateTotalPages();
  }

  get totalPages {
    return _totalPages;
  }

  set totalPages(int v) {
    _totalPages = v;
    numPages.add(v);
    if (page > v) {
      selectPage(v);
    }
  }

  // ??
  int page = 1;
//  int get page => _page;
//  set page(int page) {
//    _page = page ?? 1;
//    pages = getPages(_page, totalPages);
//    pageEmitter.add(_page);
//  }

  List<Map> pages = [];

  ElementRef elementRef;

  onInit() {
    classMap = elementRef.nativeElement.getAttribute("class") ?? "";
    totalPages = calculateTotalPages();
    pages = getPages(page, totalPages);
  }

  writeValue(num value) {
    page = value ?? 1;
    pages = getPages(page, totalPages);
  }

  selectPage(num _page, [MouseEvent event]) {
    if (event != null) {
      event.preventDefault();
    }
    if ((!disabled || event == null) && this.page != _page && _page > 0 &&
        _page <= totalPages) {
      dynamic target = event.target;
      target.blur();
      page = _page;
      pages = getPages(_page, totalPages);
      ngModel.viewToModelUpdate(_page);
    }
  }

  noPrevious() => page <= 1;

  noNext() => page >= totalPages;

  // Create page object used in template
  makePage(number, text, isActive) {
    return { "number" : number, "text" : text, "active" : isActive};
  }

  getPages(currentPage, totalPages) {
    var pages = [];
    // Default page limits
    var startPage = 1;
    var endPage = totalPages;
    var isMaxSized = maxSize != null && maxSize < totalPages;
    // recompute if maxSize
    if (isMaxSized) {
      if (rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = max(currentPage - (maxSize / 2).floor(), 1);
        endPage = startPage + maxSize - 1;
        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (((currentPage / maxSize).ceil() - 1) * maxSize) + 1;
        // Adjust last page if limit is exceeded
        endPage = min(startPage + maxSize - 1, totalPages);
      }
    }
    // Add page number links
    for (var number = startPage; number <= endPage; number ++) {
      var page = makePage(number, number, number == currentPage);
      pages.add(page);
    }
    // Add links to move between page sets
    if (isMaxSized && !rotate) {
      if (startPage > 1) {
        var previousPageSet = makePage(startPage - 1, "...", false);
        unshift(pages, previousPageSet);
      }
      if (endPage < totalPages) {
        var nextPageSet = makePage(endPage + 1, "...", false);
        push(pages, nextPageSet);
      }
    }
    return pages;
  }

  // base class
  calculateTotalPages() {
    var totalPages = itemsPerPage < 1 ? 1 : (
        totalItems / itemsPerPage).ceil();
    return max(totalPages ?? 0, 1);
  }
}

@Component (selector: "pager[ng-model], [pager][ng-model]",
    inputs: const [
      "align", "totalItems", "itemsPerPage", "previousText", "nextText"])
@View (template: '''
<ul class="pager">
  <li [ng-class]="{disabled: noPrevious(), previous: align, \'pull-left\': align}"><a href (click)="selectPage(page - 1, \$event)">{{previousText}}</a></li>
  <li [ng-class]="{disabled: noNext(), next: align, \'pull-right\': align}"><a href (click)="selectPage(page + 1, \$event)">{{nextText}}</a></li>
</ul>
''', directives: const [ NgClass])
class Pager extends Pagination
    implements OnInit {
  bool align = true;

  Pager(@Self() NgModel ngModel, Renderer renderer, ElementRef elementRef)
      : super (ngModel, renderer, elementRef) {
    _itemsPerPage = 10;
    previousText = "« Previous";
    nextText = "Next »";
    align = true;
  }
}

const PAGINATION_DIRECTIVES = const [ Pagination, Pager];