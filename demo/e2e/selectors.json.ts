import {$} from 'protractor'

export let tooltipEl = {
  'buttonSimpleDemo': $('demo-tooltip-basic>.btn.btn-primary'),
  'tooltipElement': $('bs-tooltip-container'),
  'buttonFourDirectionsLeft': $('demo-tooltip-four-directions>button:nth-of-type(1)'),
  'buttonFourDirectionsTop': $('demo-tooltip-four-directions>button:nth-of-type(2)'),
  'buttonFourDirectionsBottom': $('demo-tooltip-four-directions>button:nth-of-type(3)'),
  'buttonFourDirectionsRight': $('demo-tooltip-four-directions>button:nth-of-type(4)'),
  'buttonDismissible': $('demo-tooltip-dismiss>button'),
  'buttonSimpleBinding': $('demo-tooltip-dynamic>button:nth-of-type(1)'),
  'buttonTemplateRefBinding': $('demo-tooltip-dynamic>button:nth-of-type(2)'),
  'buttonDynamicHTML': $('demo-tooltip-dynamic-html>button'),
  'buttonDefaultTooltip': $('.card-block.panel-body>.btn.btn-danger'),
  'buttonAppendedToBody': $('.card-block.panel-body>button:last-child'),
  'buttonPreconfiguredTooltip': $('demo-tooltip-config>button:first-child'),
  'buttonCustomTriggers': $('demo-tooltip-triggers-custom'),
  'buttonManualTriggeringShow': $('demo-tooltip-triggers-manual>button:nth-of-type(1)'),
  'buttonManualTriggeringHide': $('demo-tooltip-triggers-manual>button:nth-of-type(2)'),
  'buttonComponentLevelStyling': $('demo-tooltip-styling-local>button')
};
export let typeheadEl = {
  'usageLink': $('.item>ul>li:nth-of-type(3)>a'),
  'inputStatic': $('.section.bd-example>demo-typeahead-static>input'),
  'modelStatic': $('.section.bd-example>demo-typeahead-static>pre:nth-of-type(1)'),
  'inputTemplate': $('demo-typeahead-item-template>input'),
  'modelTemplate': $('demo-typeahead-item-template>pre:nth-of-type(1)'),
  'inputOption': $('demo-typeahead-field>input'),
  'modelOption': $('demo-typeahead-field>pre:nth-of-type(1)'),
  'inputAsynchronous': $('demo-typeahead-async>input'),
  'modelAsynchronous': $('demo-typeahead-async>pre:nth-of-type(1)'),
  'inputReactiveForms': $('input[formcontrolname="state"]'),
  'modelReactiveForms': $('demo-typeahead-forms>pre:nth-of-type(1)'),
  'inputGroupingResults': $('demo-typeahead-grouping>input'),
  'modelGroupingResults': $('demo-typeahead-grouping>pre:nth-of-type(1)'),
  'staticArrayAlabama': $('.dropdown-menu>li:nth-child(1)'),
  'errorMessageNoResultsFound': $('.section.bd-example>demo-typeahead-async>div'),
  'dropdownMenu': $('.dropdown-menu'),
  'dropdownHeader': $('.dropdown-header')

};
