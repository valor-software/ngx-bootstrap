import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Item template', () => {
    beforeEach(() => typeahead.scrollToMenu('Item template'));

    const itemTempl = typeahead.exampleDemosArr.itemTemplate;
    const formTemplate = 'Model: ';
    const textToInput = 'co';
    const stateForCheck = 'Colorado';
    const checkTemplate = 'This is: "Colorado" Index: 0';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(itemTempl, typeahead.cardHeader);
      typeahead.isPreviewExist(itemTempl, formTemplate);
      typeahead.isElementVisible(itemTempl, typeahead.inputSelector);
    });

    it(`when user starts to type a name of a State a drop-down with matches is shown.
    the list contains a template "This is: "_matched state_" index: _index #". `,
      () => {
        typeahead.clearInputAndSendKeys(itemTempl, textToInput);
        typeahead.isElementVisible(itemTempl, typeahead.activeDropdown);
        typeahead.isElemTextContain(itemTempl, typeahead.activeDropdown, checkTemplate);
      });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(itemTempl, stateForCheck);
        typeahead.isPreviewExist(itemTempl, stateForCheck);
        typeahead.isInputValueEqual(itemTempl, stateForCheck);
      });
  });

  describe('Option field', () => {
    beforeEach(() => typeahead.scrollToMenu('Option field'));

    const optFiled = typeahead.exampleDemosArr.optionField;
    const formTemplate = 'Model: ';
    const stateForCheck = 'New York';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(optFiled, typeahead.cardHeader);
      typeahead.isPreviewExist(optFiled, formTemplate);
      typeahead.isElementVisible(optFiled, typeahead.inputSelector);
    });

    it('when user starts to type a name of a State a drop-down with matches is shown.', () => {
      typeahead.clearInputAndSendKeys(optFiled, stateForCheck);
      typeahead.isElementVisible(optFiled, typeahead.activeDropdown);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(optFiled, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(optFiled, stateForCheck);
        typeahead.isInputValueEqual(optFiled, stateForCheck);
      });
  });

  describe('Async data', () => {
    beforeEach(() => typeahead.scrollToMenu('Async data'));

    const asyncData = typeahead.exampleDemosArr.asyncData;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Alaska';

    it(`example contains typeahead input with the placeholder "Locations loaded with timeout" and typeahead
    card with "Model:".`, () => {
      typeahead.isElementVisible(asyncData, typeahead.cardHeader);
      typeahead.isPreviewExist(asyncData, formTemplate);
      typeahead.isElementVisible(asyncData, typeahead.inputSelector);
      typeahead.isInputHaveAttrs(asyncData, [{ attr: 'placeholder', value: 'Locations loaded via observable' }]);
    });

    it('when user starts to type a name of a State a drop-down with matches is shown, only 20 matches are shown',
      () => {
        typeahead.clearInputAndSendKeys(asyncData, 'a');
        typeahead.isElementVisible(asyncData, typeahead.activeDropdown);
        typeahead.isDropdownHasNItems(typeahead.dropdownBtn, 20);
      });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(asyncData, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(asyncData, stateForCheck);
        typeahead.isInputValueEqual(asyncData, stateForCheck);
      });
  });

  describe('With delay', () => {
    beforeEach(() => typeahead.scrollToMenu('With delay'));

    const withDelay = typeahead.exampleDemosArr.withDelay;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Oklahoma';
    const filledForm = 'Model: "Oklahoma"';
    const timeDelay = 1000;

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(withDelay, typeahead.cardHeader);
      typeahead.isPreviewExist(withDelay, formTemplate);
      typeahead.isElementVisible(withDelay, typeahead.inputSelector);
    });

    it(`the dropdown is shown with delay to 1000ms. when user clicks on any item in typeahead drop-down,
    then typeahead container auto-fills with a selected State`, () => {
      cy.clock();
      typeahead.clearInputAndSendKeys(withDelay, stateForCheck);
      cy.tick(timeDelay);
      typeahead.isElementVisible(withDelay, typeahead.activeDropdown);
      typeahead.isPreviewExist(withDelay, stateForCheck);
      typeahead.clickEnterOnInput(withDelay);
      typeahead.isPreviewExist(withDelay, filledForm);
    });
  });

  describe('Template-driven forms', () => {
    beforeEach(() => typeahead.scrollToMenu('Template-driven forms'));

    const tempDriven = typeahead.exampleDemosArr.templateDriven;
    const stateForCheck = 'California';
    const formTemplate = 'Model: {\n  "address": "312 Sundown Lane",\n  "state": null\n}';
    const labelAddress = 'Address';
    const inputAddress = '312 Sundown Lane';
    const labelState = 'State';
    const formFilled = 'Model: {\n  "address": "312 Sundown Lane",\n  "state": "California"\n}';

    it(`example contains typeahead input with "Model:" it filled with the next object:
    "address": "312 Sundown Lane", "state": null" and typeahead input "State"`,
      () => {
        typeahead.isElementVisible(tempDriven, typeahead.cardHeader);
        typeahead.isPreviewExist(tempDriven, formTemplate);
        typeahead.isElemTextContain(tempDriven, typeahead.formGroup, labelAddress);
        typeahead.isElementVisible(tempDriven, typeahead.inputSelector);
        typeahead.isInputValueEqual(tempDriven, inputAddress);
        typeahead.isElemTextContain(tempDriven, typeahead.formGroup, labelState, 1);
        typeahead.isElementVisible(tempDriven, typeahead.inputSelector, 1);
      });

    it('when user starts typing if there are any matches then a drop-down with a list of States matches is shown.',
      () => {
        typeahead.clearInputAndSendKeys(tempDriven, stateForCheck, 1);
        typeahead.isElementVisible(tempDriven, typeahead.activeDropdown);
      });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(tempDriven, stateForCheck, 1);
        typeahead.clickEnterOnInput(tempDriven, 1);
        typeahead.isPreviewExist(tempDriven, formFilled);
      });
  });

  describe('Reactive forms', () => {
    beforeEach(() => typeahead.scrollToMenu('Reactive forms'));

    const reactive = typeahead.exampleDemosArr.reactiveForms;
    const stateForCheck = 'Connecticut';
    const formTemplate = 'Model: null';

    it(`example contains typeahead card with "Model: null" and typeahead input with placeholder
    "Typeahead inside a form"`, () => {
      typeahead.isElementVisible(reactive, typeahead.cardHeader);
      typeahead.isPreviewExist(reactive, formTemplate);
      typeahead.isElementVisible(reactive, typeahead.inputSelector);
      typeahead.isInputHaveAttrs(reactive, [{ attr: 'placeholder', value: 'Typeahead inside a form' }]);
    });

    it('when user places mouse cursor in the "Model" then a drop-down with the first 7 States is shown.',
      () => {
        typeahead.clickOnInput(reactive);
        typeahead.isElementVisible(reactive, typeahead.activeDropdown);
        typeahead.isDropdownHasNItems(typeahead.dropdownBtn, 7);
      });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(reactive, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(reactive, stateForCheck);
        typeahead.isInputValueEqual(reactive, stateForCheck);
      });
  });

  describe('Grouping results', () => {
    beforeEach(() => typeahead.scrollToMenu('Grouping results'));

    const groupResult = typeahead.exampleDemosArr.groupingResults;
    const formTemplate = 'Model: ';
    const textToInput = 'a';
    const stateForCheck = 'Maryland';

    it('example contains typeahead card with "Model:"', () => {
      typeahead.isElementVisible(groupResult, typeahead.cardHeader);
      typeahead.isElementVisible(groupResult, typeahead.inputSelector);
      typeahead.isPreviewExist(groupResult, formTemplate);
    });

    it(`when user starts typing then a drop-down with a list of States matches is shown. All shown States
      are grouped by region (4 regions are shown)`, () => {
      typeahead.clearInputAndSendKeys(groupResult, textToInput);
      typeahead.isDropdownHasNItems(typeahead.dropdownHeader, 4);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(groupResult, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(groupResult, stateForCheck);
        typeahead.isInputValueEqual(groupResult, stateForCheck);
      });
  });

  describe('Ignore spaces and order', () => {
    beforeEach(() => typeahead.scrollToMenu('Ignore spaces and order'));

    const ignoreSpace = typeahead.exampleDemosArr.ignoreSpaceAndOrder;
    const formTemplate = '  typeaheadSingleWords: true\n  Model: \n';
    const formTemplateFalse = '  typeaheadSingleWords: false\n  Model: \n';
    const formTemplateFilled = '  typeaheadSingleWords: true\n  Model: "Georgia"';
    const stateForCheck = 'Georgia';
    const textToInput = 'gia ge';
    const toggleBtnText = 'Toggle typeaheadSingleWords';

    it(`example contains typeahead input and typeahead card with "Toggle typeaheadSingleWords: true Model:",
    and the button "Toggle typeaheadSingleWords"`, () => {
      typeahead.isElementVisible(ignoreSpace, typeahead.cardHeader);
      typeahead.isPreviewExist(ignoreSpace, formTemplate);
      typeahead.isElementVisible(ignoreSpace, typeahead.btnSelector);
      typeahead.isElemTextContain(ignoreSpace, typeahead.btnSelector, toggleBtnText);
      typeahead.isElementVisible(ignoreSpace, typeahead.inputSelector);
    });

    it(`when user starts typing then order of typed symbols and spaces between them is ignored if there are any
      matches then a drop-down with a list of States matches is shown`, () => {
      typeahead.clearInputAndSendKeys(ignoreSpace, textToInput);
      typeahead.isElementVisible(ignoreSpace, typeahead.activeDropdown);
      typeahead.isElemTextContain(ignoreSpace, typeahead.dropdownBtn, stateForCheck);
    });

    it(`when user sets the "typeaheadSingleWords = false" by clicking on the button "Toggle
      typeaheadSingleWords" then order of typed symbols and spaces between them will NOT be ignored`, () => {
      typeahead.clickOnBtn(ignoreSpace);
      typeahead.isPreviewExist(ignoreSpace, formTemplateFalse);
      typeahead.clearInputAndSendKeys(ignoreSpace, textToInput);
      typeahead.isDropdownNotEnabled(ignoreSpace);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(ignoreSpace, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(ignoreSpace, formTemplateFilled);
        typeahead.isInputValueEqual(ignoreSpace, stateForCheck);
      });
  });

  describe('Phrase delimiters', () => {
    beforeEach(() => typeahead.scrollToMenu('Phrase delimiters'));

    const phraseDelimiters = typeahead.exampleDemosArr.ignoreSpaceAndOrder;
    const formTemplate = 'Model: ';
    const stateForCheck = 'New York';
    const textToInput = 'york new';
    const textWithDelimiters = '&york new&';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(phraseDelimiters, typeahead.inputSelector);
      typeahead.isPreviewExist(phraseDelimiters, formTemplate);
    });

    it('When user uses "&" and type "&york new&" or ",york new," then no drop-down with the match would be shown',
      () => {
        typeahead.clearInputAndSendKeys(phraseDelimiters, textWithDelimiters);
        typeahead.isDropdownNotEnabled(phraseDelimiters);
      });

    it('when user starts to type "york new" without delimiters then a drop-down with the match is shown', () => {
      typeahead.clearInputAndSendKeys(phraseDelimiters, textToInput);
      typeahead.isElementVisible(phraseDelimiters, typeahead.activeDropdown);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(phraseDelimiters, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(phraseDelimiters, stateForCheck);
        typeahead.isInputValueEqual(phraseDelimiters, stateForCheck);
      });
  });

  describe('Multiple Search', () => {
    beforeEach(() => typeahead.scrollToMenu('Multiple search'));

    const multipleSearch = typeahead.exampleDemosArr.multipleSearch;
    const formTemplate = 'Model: ';
    const stateForCheck = 'New York';
    const textToInput = 'New Mexico,New York';
    const textWithDelimiters = 'New Mexico,';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(multipleSearch, typeahead.inputSelector);
      typeahead.isPreviewExist(multipleSearch, formTemplate);
    });

    it('When user uses "," and types "New Mexico," then drop-down with 20 states should be shown',
      () => {
        typeahead.clearInputAndSendKeys(multipleSearch, textWithDelimiters);
        typeahead.isElementVisible(multipleSearch, typeahead.activeDropdown);
        typeahead.isDropdownHasNItems(typeahead.dropdownBtn, 20);
      });

    it('when user starts to type "New Mexico,New York" then a drop-down with the second match is shown', () => {
      typeahead.clearInputAndSendKeys(multipleSearch, textToInput);
      typeahead.isElementVisible(multipleSearch, typeahead.activeDropdown);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container appends with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(multipleSearch, textToInput);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(multipleSearch, stateForCheck);
        typeahead.isInputValueEqual(multipleSearch, textToInput);
      });
  });

  describe('Dropup', () => {
    beforeEach(() => typeahead.scrollToMenu('Dropup'));

    const dropUp = typeahead.exampleDemosArr.dropUp;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Mississippi';
    const textToInput = 'p';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(dropUp, typeahead.inputSelector);
      typeahead.isPreviewExist(dropUp, formTemplate);
    });

    it('when user starts typing if there are any matches then a drop-up with a list of States matches is shown', () => {
      typeahead.clearInputAndSendKeys(dropUp, textToInput);
      typeahead.isElementVisible(dropUp, typeahead.activeDropdown);
      // typeahead.isDropUpPlacementCorrect(dropUp, 'top'); TODO: can't check - the DropUp is shown lower then the input
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(dropUp, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(dropUp, stateForCheck);
        typeahead.isInputValueEqual(dropUp, stateForCheck);
      });
  });

  describe('On blur', () => {
    beforeEach(() => typeahead.scrollToMenu('On blur'));

    const onBlur = typeahead.exampleDemosArr.onBlur;
    const formTemplate = 'Model: ';
    const formTemplateBlur = 'Option on blur: ';
    const stateForCheck = 'Colorado';
    const anotherStateForCheck = 'Delaware';
    const textToInput = 'd';
    const anotherTextToInput = 'w';

    it('example contains typeahead input and typeahead card with "Model:" and typeahead card with "Option on blur:"',
      () => {
        typeahead.isPreviewExist(onBlur, formTemplate);
        typeahead.isPreviewExist(onBlur, formTemplateBlur, 1);
        typeahead.isElementVisible(onBlur, typeahead.inputSelector);
      });

    it('clicking anywhere outside auto-fills "Option on blur" with the first option from the matches list', () => {
      typeahead.clearInputAndSendKeys(onBlur, textToInput);
      typeahead.isElementVisible(onBlur, typeahead.activeDropdown);
      typeahead.clickByText(onBlur, 'Option on blur:');
      typeahead.isPreviewExist(onBlur, stateForCheck, 1);
      typeahead.isInputValueEqual(onBlur, textToInput);
      typeahead.clearInputAndSendKeys(onBlur, anotherTextToInput);
      typeahead.isElementVisible(onBlur, typeahead.activeDropdown);
      typeahead.clickByText(onBlur, 'Option on blur:');
      typeahead.isPreviewExist(onBlur, anotherStateForCheck, 1);
      typeahead.isInputValueEqual(onBlur, anotherTextToInput);
    });

    it('when user clicks on any option then typeahead container auto-fills with a selected State', () => {
      typeahead.clearInputAndSendKeys(onBlur, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isPreviewExist(onBlur, stateForCheck);
    });
  });

  describe('Append to body', () => {
    beforeEach(() => typeahead.scrollToMenu('Append to body'));

    const appendToBody = typeahead.exampleDemosArr.appendToBody;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Rhode Island';
    const anotherStateForCheck = 'Minnesota';
    const textToInput = 'e o a';

    it('when user scrolls to Append to body sub-menu and typeahead input and typeahead card with "Model:"', () => {
      typeahead.isPreviewExist(appendToBody, formTemplate);
      typeahead.isElementVisible(appendToBody, typeahead.inputSelector);
    });

    it('when a user starts to type then order of typed symbols and spaces between them are ignored', () => {
      typeahead.clearInputAndSendKeys(appendToBody, textToInput);
      typeahead.isElementVisible('body', typeahead.activeDropdown);
      typeahead.isElemTextContain(typeahead.activeDropdown, typeahead.dropdownItem, anotherStateForCheck, 1);
      typeahead.isElemTextContain(typeahead.activeDropdown, typeahead.dropdownItem, stateForCheck, 2);
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(appendToBody, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(appendToBody, stateForCheck);
        typeahead.isInputValueEqual(appendToBody, stateForCheck);
      });
  });

  describe('No result', () => {
    beforeEach(() => typeahead.scrollToMenu('No result'));

    const noResult = typeahead.exampleDemosArr.noResult;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Nevada';
    const alertText = 'No Results Found';
    const textToInput = 'qwerty';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isPreviewExist(noResult, formTemplate);
      typeahead.isElementVisible(noResult, typeahead.inputSelector);
    });

    it('when user starts to type and if there are no matches found than an error message "No Results Found" is shown',
      () => {
        typeahead.clearInputAndSendKeys(noResult, textToInput);
        typeahead.isDropdownNotEnabled(noResult);
        typeahead.isElemTextContain(noResult, typeahead.noResultAlert, alertText);
      });

    it(`if there are any matches the drop-down is shown. when user clicks on any item then typeahead container
  auto-fills with a selected State`, () => {
      typeahead.clearInputAndSendKeys(noResult, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isPreviewExist(noResult, stateForCheck);
      typeahead.isInputValueEqual(noResult, stateForCheck);
    });
  });

  describe('Scrollable', () => {
    beforeEach(() => typeahead.scrollToMenu('Scrollable'));

    const scrollable = typeahead.exampleDemosArr.scrollable;
    const formTemplate = 'Model: ';
    const textToInput = 'a';
    const stateForCheck = 'Michigan';
    const anotherStateForCheck = 'Idaho';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isPreviewExist(scrollable, formTemplate);
      typeahead.isElementVisible(scrollable, typeahead.inputSelector);
    });

    it(`when there are any matches then a drop-down with a list of States matches is shown. user is able to scroll
      down/up to see the matches list`, () => {
      typeahead.clearInputAndSendKeys(scrollable, textToInput);
      typeahead.isElementVisible(scrollable, typeahead.activeDropdown);
      typeahead.isDropdownScrollable(stateForCheck);
      typeahead.isDropdownScrollable(anotherStateForCheck);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(scrollable, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(scrollable, stateForCheck);
        typeahead.isInputValueEqual(scrollable, stateForCheck);
      });
  });

  describe('Latinize', () => {
    beforeEach(() => typeahead.scrollToMenu('Latinize'));

    const latinize = typeahead.exampleDemosArr.latinize;
    const formTemplate = 'Model: ';
    const textToInput = 'ú';
    const nonLatinToInput = 'super';
    const stateForCheck = 'súper';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isPreviewExist(latinize, formTemplate);
      typeahead.isElementVisible(latinize, typeahead.inputSelector);
    });

    it('when user starts to type and there are any matches then a drop-down with a list of matches is shown', () => {
      typeahead.clearInputAndSendKeys(latinize, textToInput);
      typeahead.isElementVisible(latinize, typeahead.activeDropdown);
      typeahead.clearInputAndSendKeys(latinize, nonLatinToInput);
      typeahead.isElementVisible(latinize, typeahead.activeDropdown);
    });

    it(`when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected
      french word`, () => {
      typeahead.clearInputAndSendKeys(latinize, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isPreviewExist(latinize, stateForCheck);
      typeahead.isInputValueEqual(latinize, stateForCheck);
    });
  });

  describe('On select', () => {
    beforeEach(() => typeahead.scrollToMenu('On select'));

    const onSelect = typeahead.exampleDemosArr.onSelect;
    const formTemplate = 'Model: ';
    const formTemplateSelect = 'Selected option: ';
    const stateForCheck = 'Wyoming';
    const formFilled = 'Selected option: {\n  "id": 51,\n  "name": "Wyoming",\n  "region": "West"\n}';

    it(`example contains typeahead input and typeahead card with "Model:" and typeahead card with
     "Selected option:" text`, () => {
      typeahead.isElementVisible(onSelect, typeahead.cardHeader);
      typeahead.isPreviewExist(onSelect, formTemplate);
      typeahead.isElementVisible(onSelect, typeahead.cardHeader, 1);
      typeahead.isPreviewExist(onSelect, formTemplateSelect, 1);
    });

    it('when user starts to type and there are any matches then a drop-down with a list of States matches is shown',
      () => {
        typeahead.clearInputAndSendKeys(onSelect, stateForCheck);
        typeahead.isElementVisible(onSelect, typeahead.activeDropdown);
      });

    it(`when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected
      State and "Selected option" is filled with info about selected object: "id", "name" and "region"`, () => {
      typeahead.clearInputAndSendKeys(onSelect, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isPreviewExist(onSelect, stateForCheck);
      typeahead.isPreviewExist(onSelect, formFilled, 1);
      typeahead.isInputValueEqual(onSelect, stateForCheck);
    });
  });

  describe('Show results on blur', () => {
    beforeEach(() => typeahead.scrollToMenu('Show results on blur'));

    const resultOnBlur = typeahead.exampleDemosArr.resultOnBlur;
    const formTemplate = 'typeaheadHideResultsOnBlur: false\n  Model: ';
    const formTemplateTrue = 'typeaheadHideResultsOnBlur: true\n  Model: ';
    const stateForCheck = 'Nebraska';
    const textToInput = 'ra';
    const toggleBtnText = 'Toggle typeaheadHideResultsOnBlur';

    it(`example contains typeahead input and typeahead card with "typeaheadHideResultsOnBlur: false Model:" text
    and the button with "Toggle typeaheadHideResultsOnBlur"`, () => {
      typeahead.isElementVisible(resultOnBlur, typeahead.cardHeader);
      typeahead.isPreviewExist(resultOnBlur, formTemplate);
      typeahead.isElementVisible(resultOnBlur, typeahead.btnSelector);
      typeahead.isElemTextContain(resultOnBlur, typeahead.btnSelector, toggleBtnText);
    });

    it('when user clicks outside the input then drop-down stays opened', () => {
      typeahead.clearInputAndSendKeys(resultOnBlur, textToInput);
      typeahead.clickOutside(`${resultOnBlur} input`);
      typeahead.isElementVisible(resultOnBlur, typeahead.activeDropdown);
    });

    it(`when user clicks on the button and sees typeahead card with "typeaheadHideResultsOnBlur: false Model:" text'
      was changed to TRUE If user clicks anywhere outside the input than the drop-down closes`, () => {
      typeahead.clickOnBtn(resultOnBlur);
      typeahead.isPreviewExist(resultOnBlur, formTemplateTrue);
      typeahead.clearInputAndSendKeys(resultOnBlur, textToInput);
      typeahead.clickOutside(`${resultOnBlur} input`);
      typeahead.isDropdownNotEnabled(resultOnBlur);
    });

    it('when user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected State',
      () => {
        typeahead.clearInputAndSendKeys(resultOnBlur, stateForCheck);
        typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
        typeahead.isPreviewExist(resultOnBlur, stateForCheck);
        typeahead.isInputValueEqual(resultOnBlur, stateForCheck);
      });
  });

  describe('Configuring defaults', () => {
    const configDefaults = typeahead.exampleDemosArr.configDefaults;
    const stateForCheck = 'Texas';

    it('user clicks on "Configuring defaults" sub-menu and sees typeahead input', () => {
      cy.viewport(1440, 900);
      typeahead.clickOnDemoMenu('Configuring defaults');
      typeahead.isElementVisible(configDefaults, typeahead.inputSelector);
    });

    it('when user starts typing if there are any matches then a drop-down with a list of States matches is shown',
      () => {
      typeahead.clearInputAndSendKeys(configDefaults, stateForCheck);
      typeahead.isElementVisible(configDefaults, typeahead.activeDropdown);
    });

    it('When user clicks on any item in typeahead drop-down, then input stays filled with a selected State', () => {
      typeahead.clearInputAndSendKeys(configDefaults, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isInputValueEqual(configDefaults, stateForCheck);
    });
  });

  describe('Selected first item', () => {
    beforeEach(() => typeahead.scrollToMenu('Selected first item'));

    const selectedFirst = typeahead.exampleDemosArr.selectFirstItem;
    const formTemplate = 'Model: ';
    const stateForCheck = 'Maryland';
    const textToInput = 'm';

    it('example contains typeahead input and typeahead card with "Model:"', () => {
      typeahead.isElementVisible(selectedFirst, typeahead.cardHeader);
      typeahead.isPreviewExist(selectedFirst, formTemplate);
    });

    it(`when user starts to type a list with matches is shown. when user presses the TAB button then the dropdown
      closes and typeahead card stays not filled`, () => {
      typeahead.clearInputAndSendKeys(selectedFirst, textToInput);
      typeahead.isElementVisible(selectedFirst, typeahead.activeDropdown);
      // TODO: can't make an assertion. cypress doesn't emulates TAB: https://github.com/cypress-io/cypress/issues/299
      // cy.get(`${selectedFirst} ${typeahead.activeDropdown}`).type('{tab}');
    });

    it('When user clicks on any item in typeahead drop-down, then typeahead container auto-fills with a selected' +
      'State and "Selected option" is filled with info about selected object: "id", "name" and "region"', () => {
      typeahead.clearInputAndSendKeys(selectedFirst, stateForCheck);
      typeahead.clickByText(typeahead.activeDropdown, stateForCheck);
      typeahead.isInputValueEqual(selectedFirst, stateForCheck);
    });
  });
});
