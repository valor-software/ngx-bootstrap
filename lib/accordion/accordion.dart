import "package:angular2/angular2.dart";
import 'package:node_shims/js.dart';
import 'dart:html';
import "package:ng2-strap/collapse/collapse.dart";

// todo: support template url
@Component (selector: "accordion, [accordion]",
    inputs: const [ "templateUrl", "closeOthers"],
    host: const { "[class.panel-group]" : "true"})
@View (template: '''<ng-content></ng-content>''')
class Accordion {
  String templateUrl;

  bool closeOthers;

  List<AccordionGroup> groups = [];

  closeOtherGroups(AccordionGroup openGroup) {
    if (!closeOthers) {
      return;
    }
    groups.forEach((AccordionGroup group) {
      if (!identical(group, openGroup)) {
        group.isOpen = false;
      }
    });
  }

  addGroup(AccordionGroup group) {
    push(groups, group);
  }

  removeGroup(AccordionGroup group) {
    var index = groups.indexOf(group);
    if (!identical(index, -1)) {
      slice(groups, index, 1);
    }
  }
}

@Directive (selector: "accordion-transclude, [accordion-transclude]",
    inputs: const [ "accordionTransclude"])
class AccordionTransclude implements OnInit {
  ViewContainerRef viewRef;

  TemplateRef accordionTransclude;

  AccordionTransclude(@Inject(ViewContainerRef) this .viewRef) {}

  onInit() {
    if (truthy(accordionTransclude)) {
      viewRef.createEmbeddedView(accordionTransclude);
    }
  }
}
// todo: support template url

// todo: support custom `open class`
@Component(selector: "accordion-group, [accordion-group]",
    inputs: const [
      "templateUrl", "heading", "isOpen", "isDisabled", "panelClass"],
    host: const { "[class.panel-open]" : "isOpen"},
    template: '''
  <div class="panel" [ng-class]="panelClass">
    <div class="panel-heading" (click)="toggleOpen(\$event)">
      <h4 class="panel-title">
        <a href tabindex="0" class="accordion-toggle">
          <span [ng-class]="{\'text-muted\': isDisabled}"
            [accordion-transclude]="headingTemplate">{{heading}}</span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse" [collapse]="!isOpen">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  ''', directives: const [Collapse, AccordionTransclude, NgClass])
class AccordionGroup
    implements OnInit, OnDestroy {
  Accordion accordion;

  String templateUrl;

  String panelClass;

  String heading;

  bool _isOpen;

  bool isDisabled = false;

  TemplateRef headingTemplate;

  AccordionGroup(this.accordion);

  onInit() {
    panelClass = or(panelClass, "panel-default");
    accordion.addGroup(this);
    if (isOpen == null) isOpen = false;
  }

  onDestroy() {
    accordion.removeGroup(this);
  }

  toggleOpen(MouseEvent event) {
    event.preventDefault();
    if (!isDisabled) {
      isOpen = !isOpen;
    }
  }

  bool get isOpen => _isOpen;

  set isOpen(bool value) {
    _isOpen = value;
    if (truthy(value)) {
      accordion.closeOtherGroups(this);
    }
  }
}

@Directive (selector: "accordion-heading, [accordion-heading]")
class AccordionHeading {
  AccordionGroup group;

  TemplateRef templateRef;

  AccordionHeading(this.group, this.templateRef) {
    group.headingTemplate = templateRef;
  }
}

const List<dynamic> ACCORDION_DIRECTIVES = const [
  Accordion, AccordionGroup, AccordionHeading];