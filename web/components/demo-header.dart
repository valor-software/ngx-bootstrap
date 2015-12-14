import "package:angular2/angular2.dart";
import "package:ng2_strap/index.dart";

@Component(
    selector: "demo-header",
    template: '''
    <header class="navbar navbar-default navbar-fixed-top navbar-inner bg-faded">
    <div class="container">
      <div class="navbar-header hidden-md-up">
        <button type="button" class="navbar-toggle navbar-toggler pull-right" (click)="isCollapsed = !isCollapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand visible-xs" href="{{prefix}}#">ng2-bootstrap</a>
      </div>
      <nav class="hidden-xs hidden-xs-down">
        <ul class="nav navbar-nav">
          <li class="nav-item"><a href="{{prefix}}#top" role="button" class="navbar-brand">ng2-bootstrap</a></li>
          <li class="nav-item dropdown" dropdown>
            <a role="button" class="nav-link dropdown-toggle" dropdown-toggle>Directives <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li *ngFor="#comp of components"><a class="dropdown-item" href="{{prefix}}#{{comp.toLowerCase()}}">{{comp}}</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#getting-started">Getting started</a></li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#migration">Migration</a></li>
        </ul>
      </nav>
      <nav class="visible-xs hidden-md-up">
        <ul class="nav nav-pills nav-stacked scrollable-menu" [collapse]="!isCollapsed" (click)="isCollapsed = !isCollapsed; true">
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#getting-started">Getting started</a></li>
          <li class="nav-item"><a class="nav-link" href="{{prefix}}#migration">Migration</a></li>
          <li *ngFor="#comp of components" class="nav-item"><a class="dropdown-item nav-link" href="{{prefix}}#{{comp.toLowerCase()}}">{{comp}}</a></li>
        </ul>
      </nav>
    </div>
  </header>''',
    directives: const [ NgFor, Collapse, DROPDOWN_DIRECTIVES])
class DemoHeader {
  List<String> components = [
    "Accordion",
    "Alert",
    "Buttons",
    "Carousel",
    "Collapse",
    "Datepicker",
    "Dropdowns",
    "Pagination",
    "Progressbar",
    "Rating",
    "Tabs",
    "Timepicker",
    "Tooltip",
    "Typeahead"
  ];

  String prefix;

  bool isCollapsed = true;

  DemoHeader() {
    this.prefix =  "";
  }
}