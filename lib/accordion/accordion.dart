import "package:angular2/angular2.dart";
import 'package:node_shims/js.dart';
import 'dart:html';
import "package:ng2_strap/collapse/collapse.dart";

// todo: support template url
@Component (selector: "n2s-accordion",
    inputs: const [ "templateUrl", "closeOthers"],
    host: const { "[class.panel-group]" : "true"},
    template: '''<ng-content></ng-content>''')
class Accordion {
  String templateUrl;

  bool closeOthers;

  List<AccordionPanel> groups = [];

  closeOtherGroups(AccordionPanel openGroup) {
    if (!closeOthers) {
      return;
    }
    groups.forEach((AccordionPanel group) {
      if (!identical(group, openGroup)) {
        group.isOpen = false;
      }
    });
  }

  addGroup(AccordionPanel group) {
    push(groups, group);
  }

  removeGroup(AccordionPanel group) {
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

  ngOnInit() {
    if (truthy(accordionTransclude)) {
      viewRef.createEmbeddedView(accordionTransclude);
    }
  }
}
// todo: support template url

// todo: support custom `open class`
@Component(selector: "n2s-accordion-panel",
    inputs: const ["heading", "isOpen", "isDisabled", "panelClass"],
    host: const { "[class.panel-open]" : "isOpen"},
    template: '''
  <div class="panel" [ngClass]="panelClass">
    <div class="panel-heading" (click)="toggleOpen(\$event)">
      <h4 class="panel-title">
        <a href tabindex="0" class="accordion-toggle">
          <span [ngClass]="{\'text-muted\': isDisabled}">
            {{heading}}
            <ng-content select="n2s-accordion-heading"></ng-content>
          </span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse" [collapse]="!isOpen">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  ''', directives: const [Collapse, NgClass])
class AccordionPanel
    implements OnInit, OnDestroy {
  Accordion accordion;

  String templateUrl;

  String panelClass;

  String heading;

  bool _isOpen;

  bool isDisabled = false;

  TemplateRef headingTemplate;

  AccordionPanel(this.accordion);

  ngOnInit() {
    panelClass = or(panelClass, "panel-default");
    accordion.addGroup(this);
    if (isOpen == null) isOpen = false;
  }

  ngOnDestroy() {
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

//@Directive (selector: "accordion-heading, [accordion-heading]")
//class AccordionHeading {
//  AccordionPanel panel;
//
//  TemplateRef templateRef;
//
//  AccordionHeading(this.templateRef) {
//    panel.headingTemplate = templateRef;
//  }
//}

const List<dynamic> ACCORDION_DIRECTIVES = const [Accordion, AccordionPanel];