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
}
