/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Component, View, Directive, OnInit, OnDestroy, NgClass, ViewContainerRef, TemplateRef, Inject;

// todo: support template url
@Component (selector: "accordion, [accordion]",
    properties: const [ "templateUrl", "closeOthers"],
    host: const { "[class.panel-group]" : "true"})
@View (template: '''<ng-content></ng-content>''')
class Accordion {
  String templateUrl;

  bool closeOthers;

  List<AccordionGroup> groups = [];

  Accordion() {}

  closeOtherGroups(AccordionGroup openGroup) {
    if (!this.closeOthers) {
      return;
    }
    this.groups.forEach((AccordionGroup group) {
      if (!identical(group, openGroup)) {
        group.isOpen = false;
      }
    });
  }

  addGroup(AccordionGroup group) {
    this.groups.push(group);
  }

  removeGroup(AccordionGroup group) {
    var index = this.groups.indexOf(group);
    if (!identical(index, -1)) {
      this.groups.slice(index, 1);
    }
  }
}

@Directive (selector: "accordion-transclude, [accordion-transclude]",
    properties: const [ "accordionTransclude"])
class AccordionTransclude implements OnInit {
  ViewContainerRef viewRef;

  TemplateRef accordionTransclude;

  AccordionTransclude(@Inject (ViewContainerRef) this .viewRef) {}

  onInit() {
    if (this.accordionTransclude) {
      this.viewRef.createEmbeddedView(this.accordionTransclude);
    }
  }
}
import "../collapse/collapse.dart" show Collapse;
// todo: support template url

// todo: support custom `open class`
@Component (selector: "accordion-group, [accordion-group]",
    properties: const [
      "templateUrl", "heading", "isOpen", "isDisabled", "panelClass"],
    host: const { "[class.panel-open]" : "isOpen"})
@View (template: '''
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
  ''', directives: const [ Collapse, AccordionTransclude, NgClass])
class AccordionGroup
    implements OnInit, OnDestroy {
  Accordion accordion;

  String templateUrl;

  String panelClass;

  bool _isOpen;

  bool isDisabled;

  TemplateRef headingTemplate;

  AccordionGroup(this .accordion) {}

  onInit() {
    this.panelClass = this.panelClass || "panel-default";
    this.accordion.addGroup(this);
  }

  onDestroy() {
    this.accordion.removeGroup(this);
  }

  toggleOpen(MouseEvent event) {
    event.preventDefault();
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

  bool get isOpen {
    return this._isOpen;
  }

  set isOpen(bool value) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOtherGroups(this);
    }
  }
}

@Directive (selector: "accordion-heading, [accordion-heading]")
class AccordionHeading {
  AccordionGroup group;

  TemplateRef templateRef;

  AccordionHeading(this .group, this .templateRef) {
    group.headingTemplate = templateRef;
  }
}

const List<dynamic> accordion = const [ Accordion, AccordionGroup, AccordionHeading];