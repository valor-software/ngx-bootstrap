/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart" show ElementRef;

abstract class DropdownMenuInterface {
  ElementRef el;

  String templateUrl;
}

abstract class DropdownToggleInterface {
  ElementRef el;
}