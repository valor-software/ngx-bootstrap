/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Directive, OnInit, EventEmitter, ElementRef, DefaultValueAccessor, CORE_DIRECTIVES, NgClass, Self, NgModel, Renderer, ViewEncapsulation, ViewRef, ViewContainerRef, TemplateRef, NgFor, ComponentRef;

import 'dart:html';
import 'dart:math' as Math;
import 'package:node_shims/js.dart';
// todo: extract base functionality classes

// todo: use lodash#default for configuration

// todo: expose an option to change default configuration

// todo: solve problem with .pagination-sm>li:first-child>a and <template/> from ng-if >.<
const paginationConfig = const {
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
    properties: const [
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
    events: const [ "numPages"])
@View (template: '''
  <ul class="pagination" [ng-class]="classMap">
    <li class="pagination-first"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(1, \$event)">{{getText(\'first\')}}</a>
    </li>

    <li class="pagination-prev"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page - 1, \$event)">{{getText(\'previous\')}}</a>
      </li>

    <li *ng-for="#page of pages" [ng-class]="{active: page.active, disabled: disabled&&!page.active}" class="pagination-page"><a href (click)="selectPage(page.number, \$event)">{{page.text}}</a></li>

    <li class="pagination-next"
        [ng-class]="{disabled: noNext()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page + 1, \$event)">{{getText(\'next\')}}</a></li>

    <li class="pagination-last"
        [ng-class]="{disabled: noNext()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(totalPages, \$event)">{{getText(\'last\')}}</a></li>
  </ul>
  ''',
    directives: const [ CORE_DIRECTIVES, NgClass],
    encapsulation: ViewEncapsulation.None)
class Pagination extends DefaultValueAccessor
    implements OnInit {
  dynamic config;

  String classMap;

  num maxSize;

  bool rotate;

  dynamic boundaryLinks;

  // labels
  String firstText;

  String previousText;

  String nextText;

  String lastText;

  bool disabled;

  bool directionLinks;

  EventEmitter numPages = new EventEmitter ();

  num _itemsPerPage;

  num _totalItems;

  num _totalPages;

  get itemsPerPage {
    return this._itemsPerPage;
  }

  set itemsPerPage(num v) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  num get totalItems {
    return this._totalItems;
  }

  set totalItems(num v) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  get totalPages {
    return this._totalPages;
  }

  set totalPages(num v) {
    this._totalPages = v;
    this.numPages.next(v);
    if (this.page > v) {
      this.selectPage(v);
    }
  }

  // ??
  num page;

  List pages;

  Pagination(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
    this.config = this.config || paginationConfig;
  }

  onInit() {
    this.classMap = this.elementRef.nativeElement.getAttribute("class") || "";
    // watch for maxSize
    this.maxSize ??= paginationConfig['maxSize'];
    this.rotate ??= paginationConfig['rotate'];
    this.boundaryLinks ??= paginationConfig['boundaryLinks'];
    this.directionLinks ??= paginationConfig['directionLinks'];
    // base class
    this.page ??= 1;
    this.itemsPerPage ??= paginationConfig['itemsPerPage'];
    this.totalPages = this.calculateTotalPages();
    // this class
    this.pages = this.getPages(this.page, this.totalPages);
  }

  writeValue(num value) {
    this.page = value || 1;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  selectPage(num page, [ MouseEvent event ]) {
    if (event) {
      event.preventDefault();
    }
    if ((!this.disabled || !event) && !identical(this.page, page) && page > 0 &&
        page <= this.totalPages) {
      dynamic target = event.target;
      target.blur();
      this.writeValue(page);
      this.cd.viewToModelUpdate(page);
    }
  }

  getText(String key) {
    return this [ key + "Text" ] || paginationConfig [ key + "Text" ];
  }

  noPrevious() {
    return identical(this.page, 1);
  }

  noNext() {
    return identical(this.page, this.totalPages);
  }

  // Create page object used in template
  makePage(number, text, isActive) {
    return { "number" : number, "text" : text, "active" : isActive};
  }

  getPages(currentPage, totalPages) {
    var pages = [];
    // Default page limits
    var startPage = 1;
    var endPage = totalPages;
    var isMaxSized = maxSize != null && this.maxSize < totalPages;
    // recompute if maxSize
    if (isMaxSized) {
      if (this.rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - (this.maxSize / 2).floor(), 1);
        endPage = startPage + this.maxSize - 1;
        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - this.maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = (((currentPage / this.maxSize).ceil() - 1) * this.maxSize) + 1;
        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }
    // Add page number links
    for (var number = startPage; number <= endPage; number ++) {
      var page = this.makePage(number, number, identical(number, currentPage));
      pages.add(page);
    }
    // Add links to move between page sets
    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        var previousPageSet = this.makePage(startPage - 1, "...", false);
        unshift(pages, previousPageSet);
      }
      if (endPage < totalPages) {
        var nextPageSet = this.makePage(endPage + 1, "...", false);
        push(pages, nextPageSet);
      }
    }
    return pages;
  }

  // base class
  calculateTotalPages() {
    var totalPages = this.itemsPerPage < 1 ? 1 : (
        this.totalItems / this.itemsPerPage).ceil();
    return Math.max(or(totalPages, 0), 1);
  }
}

const pagerConfig = const {
  "itemsPerPage" : 10,
  "previousText" : "« Previous",
  "nextText" : "Next »",
  "align" : true
};

@Component (selector: "pager[ng-model], [pager][ng-model]",
    properties: const [
      "align", "totalItems", "itemsPerPage", "previousText", "nextText"])
@View (template: '''
    <ul class="pager">
      <li [ng-class]="{disabled: noPrevious(), previous: align, \'pull-left\': align}"><a href (click)="selectPage(page - 1, \$event)">{{getText(\'previous\')}}</a></li>
      <li [ng-class]="{disabled: noNext(), next: align, \'pull-right\': align}"><a href (click)="selectPage(page + 1, \$event)">{{getText(\'next\')}}</a></li>
  </ul>
  ''', directives: const [ NgClass])
class Pager extends Pagination
    implements OnInit {
  bool align = pagerConfig['align'];

  var config = pagerConfig;

  Pager(@Self () NgModel cd, Renderer renderer, ElementRef elementRef)
      : super (cd, renderer, elementRef) {
    /* super call moved to initializer */
    ;
  }
}

const List<dynamic> pagination = const [ Pagination, Pager];