import "package:angular2/angular2.dart";
import "package:ng2_strap/position.dart" show positionService;
import 'dart:async';

class TooltipOptions {
  String placement;

  String popupClass;

  bool animation;

  bool isOpen;

  var content;

  TooltipOptions({
    this.placement,
    this.popupClass,
    this.animation,
    this.isOpen,
    this.content
  });
}

@Component (selector: "n2s-tooltip-container",
    template: '''
    <div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap" >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{content}}
      </div>
    </div>''',
    directives: const [NgClass, NgStyle],
    encapsulation: ViewEncapsulation.None)
class TooltipContainer {
  ElementRef element;

  Map<String, dynamic> classMap;

  dynamic positionMap;

  String top;

  String left;

  String display;

  String content;

  String placement = "top";

  bool appendToBody = false;

  bool isOpen;

  String popupClass;

  bool animation;

  TooltipContainer(this.element, TooltipOptions options) {
    classMap = { "in" : false};
    placement = options.placement;
    popupClass = options.popupClass;
    animation = options.animation;
    isOpen = options.isOpen;
    content = options.content;
    classMap[placement] = true;
  }

  position(ElementRef hostEl) {
    display = "block";
    top = "0px";
    left = "0px";
    var p = positionService.positionElements(
        hostEl.nativeElement,
        element.nativeElement.children[0],
        placement,
        appendToBody);
    top = p.top.toString() + "px";
    left = p.left.toString() + "px";
    classMap [ "in" ] = true;
  }
}

@Directive (selector: "[tooltip]",
    inputs: const [
      "content:tooltip",
      "placement:tooltip-placement",
      "appendToBody",
      "isOpen: tooltip-is-open",
      "enable: tooltip-enable"
    ],
    host: const {
      "(mouseenter)" : "show(\$event)",
      "(mouseleave)" : "hide(\$event)",
      "(focusin)" : "show(\$event)",
      "(focusout)" : "hide(\$event)"
    })
class Tooltip {
  ElementRef element;

  DynamicComponentLoader loader;

  bool visible = false;

  String content;

  String placement = "top";

  // todo:
  bool appendToBody;

  bool isOpen;

  bool enable;

  Future<ComponentRef> tooltip;

  Tooltip(this.element, this.loader);

  // todo: filter triggers
  show(event) {
    if (visible) {
      return;
    }
    visible = true;
    var options = new TooltipOptions (content: content, placement: placement);
    var binding = Injector.resolve([bind(TooltipOptions).toValue(options)]);
    tooltip = loader.loadNextToLocation(TooltipContainer, element, binding)
        .then((ComponentRef componentRef) {
      return new Future.delayed(const Duration(milliseconds: 1), () {
        (componentRef.instance as TooltipContainer).position(element);
        return componentRef;
      });
    });
  }

  hide(event) {
    if (!visible) {
      return;
    }
    visible = false;
    tooltip.then((ComponentRef componentRef) {
      componentRef.dispose();
      return componentRef;
    });
  }
}

const List<dynamic> TOOLTIP_DIRECTIVES = const [Tooltip, TooltipContainer];