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
}
