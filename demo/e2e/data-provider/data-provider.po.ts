import { $ } from 'protractor';
import { ElementFinder } from 'protractor/built/index';

const getTabHeaderAccordionPage = (tabNumber:number) => {
  return $('accordion-group:nth-child(' + tabNumber + ') .panel-heading');
};
const getTabContentAccordionPage = (tabNumber:number) => {
  return $('accordion-group:nth-child(' + tabNumber + ') .panel-body');
};

export class DataProvider {

  public static accordionTableContent: any = {
    '1stTabHeaderText': {element: (): ElementFinder => getTabHeaderAccordionPage(1), actualResult: 'Static Header, initially expanded'},
    '1stTabContentText': {element: (): ElementFinder => getTabContentAccordionPage(1), actualResult: 'This content is straight in the template.'},
    '2stTabHeaderText': {element: (): ElementFinder => getTabHeaderAccordionPage(2), actualResult: 'Dynamic Group Header - 1'},
    '2stTabContentText': {element: (): ElementFinder => getTabContentAccordionPage(2), actualResult: 'Dynamic Group Body - 1'},
    '3stTabHeaderText': {element: (): ElementFinder => getTabHeaderAccordionPage(3), actualResult: 'Dynamic Group Header - 2'},
    '3stTabContentText': {element: (): ElementFinder => getTabContentAccordionPage(3), actualResult: 'Dynamic Group Body - 2'},
    '4stTabHeaderText': {element: (): ElementFinder => getTabHeaderAccordionPage(4), actualResult: 'Dynamic Body Content'},
    '4stTabContentText1stString': {element: (): ElementFinder => $('accordion-group:nth-child(4) .panel-body>p'), actualResult: 'The body of the accordion group grows to fit the contents'},
    '4stTabContentTextAddButton': {element: (): ElementFinder => $('accordion-group:nth-child(4) .panel-body>button'), actualResult: 'Add Item'},
    '4stTabContentTextTableItem': {element: (): ElementFinder => $('accordion-group:nth-child(4) .panel-body :nth-child(4)'), actualResult: 'Item 2'},
    '5stTabHeaderText': {element: (): ElementFinder => getTabHeaderAccordionPage(5), actualResult: 'I can have markup, too!'},
    '5stTabContentText': {element: (): ElementFinder => getTabContentAccordionPage(5), actualResult: 'This is just some content to illustrate fancy headings.'}
  };

  public static alertTableContains:any = {
    'Alert Danger text': {element: (): ElementFinder => $('[ng-reflect-type="danger"]>div'), actualResult: 'Oh snap! Change a few things up and try submitting again.'},
    'Alert Success text': {element: (): ElementFinder => $('[ng-reflect-type="success"]>div:not(span):not(.close)'), actualResult: 'Well done! You successfully read this important alert message.'},
    'Alert Dismissible text': {element: (): ElementFinder => $('[dismissontimeout="3000"]'), actualResult: 'This alert will dismiss in 3s'},
    'Alert Another text': {element: (): ElementFinder => $('[ng-reflect-type="warning"]:nth-child(2n)'), actualResult: 'Another alert!'}
  };
  public static modalsTableContains:any = {
    'Modal Large button text': {element: (): ElementFinder => $('.btn:nth-child(1)'), actualResult: 'Large modal'},
    'Modal Small button text': {element: (): ElementFinder => $('.btn:nth-child(3)'), actualResult: 'Small modal'},
    'Modal Child button text': {element: (): ElementFinder => $('.btn:nth-child(5)'), actualResult: 'Open child modal'},
    'Modal Static button text': {element: (): ElementFinder => $('.btn:nth-child(7)'), actualResult: 'Static modal'}
  };
  public static buttonsTableContains:any = {
    'Buttons Example header text': {element: (): ElementFinder => $('#example>h3'), actualResult: 'Example'},
    'Buttons Single Toggle header text': {element: (): ElementFinder => $('buttons-demo>h4:nth-child(1)'), actualResult: 'Single toggle'},
    'Buttons Single Toggle button text': {element: (): ElementFinder => $('buttons-demo>.btn'), actualResult: 'Single Toggle'},
    'Buttons Checkbox Left button text': {element: (): ElementFinder => $('.btn-group [btncheckbox]:nth-child(1)'), actualResult: 'Left'},
    'Buttons Radio Header text': {element: (): ElementFinder => $('buttons-demo :nth-child(8)'), actualResult: 'Radio & Uncheckable Radio'},
    'Buttons Checkbox Middle button text': {element: (): ElementFinder => $('.btn-group [btncheckbox]:nth-child(2)'), actualResult: 'Middle'},
    'Buttons Checkbox Right button text': {element: (): ElementFinder => $('.btn-group [btncheckbox]:nth-child(3)'), actualResult: 'Right'},
    'Buttons Radio Left button text': {element: (): ElementFinder => $('.btn-group:nth-child(2n) :nth-child(1)'), actualResult: 'Left'},
    'Buttons Radio Middle button text': {element: (): ElementFinder => $('.btn-group:nth-child(2n) :nth-child(2)'), actualResult: 'Middle'},
    'Buttons Radio Right button text': {element: (): ElementFinder => $('.btn-group:nth-child(2n) :nth-child(3)'), actualResult: 'Right'},
    'Buttons Uncheckable Left button text': {element: (): ElementFinder => $('.btn-group [uncheckable]:nth-child(1)'), actualResult: 'Left'},
    'Buttons Uncheckable Middle button text': {element: (): ElementFinder => $('.btn-group [uncheckable]:nth-child(2)'), actualResult: 'Middle'},
    'Buttons Uncheckable Right button text': {element: (): ElementFinder => $('.btn-group [uncheckable]:nth-child(3)'), actualResult: 'Right'}
  };

  public static tooltipDefaultContains:any = {
    'Dynamic Tooltip header text': {element: (): ElementFinder => $('tooltip-demo>div:nth-child(1) label'), actualResult: 'Dynamic Tooltip Text'},
    'Dynamic Tooltip Popup header text': {element: (): ElementFinder => $('tooltip-demo>div:nth-child(2) label'), actualResult: 'Dynamic Tooltip Popup Text'},
    'I can even contain HTML': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(4)'), actualResult: 'I can even contain HTML. Check me out!'},
    'Or use a TemplateRef': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(5)'), actualResult: 'Or use a TemplateRef. Check me out!'},
    'Programatically show/hide tooltip': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(6)'), actualResult: 'Programatically show/hide tooltip Check me out! Show tooltip Hide tooltip'},
    'I can have a custom class': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(7)'), actualResult: 'I can have a custom class. Check me out!'},
    'And if I am in overflow': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(8)'), actualResult: 'And if I am in overflow: hidden container, then just tooltipAppendToBody me instead!'},
    'Button Show tooltip text': {element: (): ElementFinder => $('.btn.btn-primary'), actualResult: 'Show tooltip'},
    'Button Hide tooltip text': {element: (): ElementFinder => $('.btn.btn-danger'), actualResult: 'Hide tooltip'},
    'Or use custom triggers, like focus header text': {element: (): ElementFinder => $('[role="form"]>.form-group:nth-child(1) label'), actualResult: 'Or use custom triggers, like focus:'},
    'Disable tooltips conditionally header text': {element: (): ElementFinder => $('[role="form"]>.form-group:nth-child(2) label'), actualResult: 'Disable tooltips conditionally:'}
  };
  public static tooltipElementsTexts:any = {
    'Dynamic Tooltip': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(3)>a:nth-child(1)'), actualResult: 'Hello, World!'},
    'Left Tooltip': {element: (): ElementFinder => $('[tooltip="On the Left!"]'), actualResult: 'On the Left!'},
    'Right Tooltip': {element: (): ElementFinder => $('[tooltip="On the Right!"]'), actualResult: 'On the Right!'},
    'Bottom Tooltip': {element: (): ElementFinder => $('[tooltip="On the Bottom!"]'), actualResult: 'On the Bottom!'},
    'Fading Tooltip': {element: (): ElementFinder => $(`[tooltip="I don't fade. :-("]`), actualResult: `I don't fade. :-(`},
    'Show/hide Tooltip': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(6)>a'), actualResult: 'Foo'},
    'Custom class Tooltip': {element: (): ElementFinder => $('tooltip-demo>p:nth-child(7)>a'), actualResult: 'I can have a custom class applied to me!'},
    'Overflow:hidden Tooltip': {element: (): ElementFinder => $('[tooltip="That ruins the tooltip"]'), actualResult: 'That ruins the tooltip'},
    'Overflow:toBody Tooltip': {element: (): ElementFinder => $('[tooltip="So the tooltip is visible always correctly"]'), actualResult: 'So the tooltip is visible always correctly'},
    'Custom triggers Tooltip': {element: (): ElementFinder => $('[tooltip="See? Now click away..."]'), actualResult: 'See? Now click away...'},
    'Disable Tooltip': {element: (): ElementFinder => $('[tooltip="Enter something in this input field to disable this tooltip"]'), actualResult: 'Enter something in this input field to disable this tooltip'}
  };
  public static inputDifferentData:any = {
    'Text normal': { inputText: 'First or second'},
    'Text URL': { inputText: 'http://www.mysite.com:80'},
    'Text chinese': { inputText: '京位於華北平原的西北边缘，背靠燕山，'},
    'Text JS XSS': { inputText: `'-prompt()-'`},
    'Text Unicode': { inputText: 'Iñtërnâtiônàlizætiøn'}
  };
  public static carouselSlidesTexts:any = {
    '1st slide text': {element: (): ElementFinder => $('slide:nth-child(1) p'), actualResult: 'More Cats'},
    '2nd slide text': {element: (): ElementFinder => $('slide:nth-child(2) p'), actualResult: 'Extra Kittys'},
    '3rd slide text': {element: (): ElementFinder => $('slide:nth-child(3) p'), actualResult: 'Lots of Felines'},
    '4th slide text': {element: (): ElementFinder => $('slide:nth-child(4) p'), actualResult: 'Surplus Cutes'}
  };
  public static typeaheadDefaultTexts:any = {
    'Static Arrays header text': {element: (): ElementFinder => $('.container-fluid>h4:nth-child(1)'), actualResult: 'Static arrays'},
    'Static Arrays model text': {element: (): ElementFinder => $('.card:nth-child(2)'), actualResult: 'Model: ""'},
    'Custom item header text': {element: (): ElementFinder => $('.container-fluid>h4:nth-child(4)'), actualResult: 'Custom item template'},
    'Custom item modal text': {element: (): ElementFinder => $('.card:nth-child(5)'), actualResult: 'Model: ""'},
    'Asynchronous results header text': {element: (): ElementFinder => $('.container-fluid>h4:nth-child(7)'), actualResult: 'Asynchronous results'},
    'Asynchronous results modal text': {element: (): ElementFinder => $('.card:nth-child(8)'), actualResult: 'Model: ""'},
    'Typeahead inside form header text': {element: (): ElementFinder => $('.container-fluid>h4:nth-child(10)'), actualResult: 'Typeahead inside a form'},
    'Typeahead inside form modal text': {element: (): ElementFinder => $('.card:nth-child(11)'), actualResult: 'Model: null'},
    'Grouped results header text': {element: (): ElementFinder => $('.container-fluid>h4:nth-child(13)'), actualResult: 'Grouped results'},
    'Grouped results modal text': {element: (): ElementFinder => $('.card:nth-child(14)'), actualResult: 'Model: ""'}
  };
  public static typeaheadInputCityTexts:any = {
    California: { inputText: 'Cal', expectedResult: 'California'},
    Texas: { inputText: 'xa', expectedResult: 'Texas'},
    Florida: { inputText: 'rida', expectedResult: 'Florida'},
    Mississippi: { inputText: 'ssi', expectedResult: 'Mississippi'},
    'New Jersey': { inputText: 'J', expectedResult: 'New Jersey'}
  };
}
