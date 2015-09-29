/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, Component, View, OnInit, EventEmitter, ElementRef, NgClass, NgStyle, ViewRef, ViewContainerRef, TemplateRef, DynamicComponentLoader, ComponentRef, ViewEncapsulation;
import "package:angular2/di.dart"
    show bind, Injectable, ResolvedBinding, Injector;
import "../position.dart" show positionService;

class TooltipOptions {
  String placement;

  String popupClass;

  bool animation;

  bool isOpen;

  TooltipOptions(Object options) {
    Object.assign(this, options);
  }
}

@Component (selector: "tooltip-container")
@View (template: '''
    <div class="tooltip" role="tooltip"
     [ng-style]="{top: top, left: left, display: display}"
     [ng-class]="classMap" >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{content}}
      </div>
    </div>''',
    directives: const [ NgClass, NgStyle],
    encapsulation: ViewEncapsulation.None)
class TooltipContainer {
  ElementRef element;

  Object classMap;

  dynamic positionMap;

  String top;

  String left;

  String display;

  String content;

  String placement;

  bool appendToBody;

  bool isOpen;

  TooltipContainer(this .element, TooltipOptions options) {
    Object.assign(this, options);
    this.classMap = { "in" : false};
    this.classMap [ options.placement ] = true;
  }

  position(ElementRef hostEl) {
    this.display = "block";
    this.top = "0px";
    this.left = "0px";
    var p = positionService.positionElements(
        hostEl.nativeElement, this.element.nativeElement.children [ 0 ],
        this.placement, this.appendToBody);
    this.top = p.top + "px";
    this.left = p.left + "px";
    this.classMap [ "in" ] = true;
  }
}

@Directive (selector: "[tooltip]",
    properties: const [
      "content:tooltip",
      "placement:tooltip-placement",
      "appendToBody",
      "isOpen: tooltip-is-open",
      "enable: tooltip-enable"
    ],
    host: const {
      "(mouseenter)" : "show(\$event, $targe)",
      "(mouseleave)" : "hide(\$event, $targe)",
      "(focusin)" : "show(\$event, $targe)",
      "(focusout)" : "hide(\$event, $targe)"
    })
class Tooltip implements OnInit {
  ElementRef element;

  DynamicComponentLoader loader;

  bool visible = false;

  String content;

  String placement = "top";

  // todo:
  bool appendToBody;

  bool isOpen;

  bool enable;

  Promise <ComponentRef> tooltip;

  Tooltip(this .element, this .loader) {}

  onInit() {}

  // todo: filter triggers
  show(event, target) {
    if (this.visible) {
      return;
    }
    this.visible = true;
    var options = new TooltipOptions (
        content: this.content, placement: this.placement);
    var binding = Injector.resolve([ bind(TooltipOptions).toValue(options)]);
    this.tooltip =
        this.loader.loadNextToLocation(TooltipContainer, this.element, binding)
            .then((ComponentRef componentRef) {
          componentRef.instance.position(this.element);
          return componentRef;
        });
  }

  hide(event, target) {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.then((ComponentRef componentRef) {
      componentRef.dispose();
      return componentRef;
    });
  }
}

const List<dynamic> tooltip = [ Tooltip, TooltipContainer];