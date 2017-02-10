import {$} from 'protractor'

export let tooltipEl = {
  'buttonSimpleDemo': $(`demo-tooltip-basic>.btn.btn-primary`),
  'tooltipElement': $(`bs-tooltip-container`),
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
